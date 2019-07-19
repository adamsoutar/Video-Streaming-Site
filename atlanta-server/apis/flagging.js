const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'))

const Video = require('../models/video')

function handleErr (res, err) {
  if (err) console.error(`Internal/DB error:\n${err}`)
  res.json({
    success: false
  })
}

module.exports.flag = (req, res) => {
  if (!req.query.videoId || config.ignoreFlagRequests) return handleErr(res)

  Video.findOne({ _id: req.query.videoId }).exec((err, video) => {
    if (err || video == null) return handleErr(res, err)

    video.flags++
    video.save((err) => {
      if (err) return handleErr(res, err)
      res.json({
        success: true
      })
    })
  })
}
