const fs = require('fs')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const FFmpeg = require('fluent-ffmpeg')
const AWS = require('aws-sdk')
const Video = require('./models/video')
const version = '0.0.1'
const bodyParser = require('body-parser')

const config = JSON.parse(fs.readFileSync('./config.json'))
AWS.config.loadFromPath('./config.json')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(fileUpload({
  limits: {
    fileSize: config.maxUploadMB * 1024 * 1024
  },
  useTempFiles: true,
  tempFileDir: './temp',
  createParentPath: true
}))

function cleanUpTemps (req) {
  if (!req.files.video) return

  let videoPath = req.files.video.tempFilePath
  let thumbPath = `./thumbs/${path.basename(videoPath)}.png`

  for (let p of [videoPath, thumbPath]) {
    if (fs.existsSync(p)) fs.unlink(p, () => console.log('Cleaned up file after upload'))
  }
}

function failUpload (req, res, err) {
  if (err) console.log(err)
  cleanUpTemps(req)
  res.json({
    success: false
  })
}

function uploadToS3 (req, res, vD) {
  let videoPath = req.files.video.tempFilePath
  let extension = path.extname(req.files.video.name)
  let thumbPath = `./thumbs/${path.basename(videoPath)}.png`

  // Upload to S3 bucket
  let bucket = new AWS.S3({
    params: {
      Bucket: config.s3BucketName
    }
  })
  bucket.upload({
    Key: `${vD._id}${extension}`,
    Body: fs.createReadStream(videoPath)
  }, (err1, data1) => {
    if (err1) return failUpload(req, res, err1)

    bucket.upload({
      Key: `${vD._id}.png`,
      Body: fs.createReadStream(thumbPath)
    }, (err2, data2) => {
      if (err2) return failUpload(req, res, err2)

      vD.videoURL = data1.Location
      vD.thumbnailURL = data2.Location
      vD.save((err3) => {
        if (err3) return failUpload(req, res, err3)
        cleanUpTemps(req)

        res.json({
          success: true,
          videoId: vD._id
        })
      })
    })
  })
}

function addToDB (req, res) {
  let tStr = req.body.tags || ''
  let vD = new Video({
    title: req.body.title || 'Unnamed video',
    description: req.body.description || '',
    tags: tStr.split(','),
    videoMimeType: req.files.video.mimetype || 'video/mp4'
  })

  uploadToS3(req, res, vD)
}

app.get('/', (req, res) => res.json({
  success: true,
  description: 'Atlanta uploader server',
  version,
  port: config.port
}))

app.post('/upload', (req, res) => {
  // Preliminary fail conditions
  console.log(req.files)
  if (!(
    Object.keys(req.files).includes('video') &&
    req.files.video.truncated === false &&
    config.acceptedMimeTypes.includes(req.files.video.mimetype)
  )) {
    return failUpload(req, res)
  }

  let v = req.files.video
  /* Generate thumbnail */
  let mpegError = false
  new FFmpeg(v.tempFilePath)
    .on('error', (err) => {
      mpegError = true
      failUpload(req, res, err)
    })
    .on('end', () => {
      if (!mpegError) addToDB(req, res)
    })
    .takeScreenshots({
      count: 1,
      timemarks: [ '25%' ],
      size: '750x?',
      filename: '%f',
      folder: './thumbs'
    })
})

mongoose.connect(config.mongoURL, {
  useNewUrlParser: true
}, () => {
  app.listen(config.port, () =>
    console.log(`atlanta-uploader up on ${config.port}`)
  )
})
