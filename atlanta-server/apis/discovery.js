const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'))

const Video = require('../models/video')

function handleErr (res, err) {
  if (err) console.error(`Internal/DB error:\n${err}`)
  res.json({
    success: false
  })
}

module.exports.getAllTags = (req, res) => {
  Video.aggregate([
    { $project: {
      a: '$tags'
    } },
    { $unwind: '$a' },
    { $group: {
      _id: 'a',
      items: { $addToSet: '$a' }
    } }
  ]).exec((err, result) => {
    if (err) return handleErr(res, err)

    let tags = result[0]['items']
    tags.sort()

    res.json({
      success: true,
      tags: tags
    })
  })
}

module.exports.getChunkByViews = (req, res) => {
  let skip = parseInt(req.query.offset) || 0
  let chunkSize = parseInt(req.query.limit) || config.apiMaxChunkSize

  if (chunkSize > config.apiMaxChunkSize || chunkSize < 1) {
    chunkSize = config.apiMaxChunkSize
  }

  if (isNaN(chunkSize) || isNaN(skip)) {
    // Invalid params
    return handleErr(res)
  }

  Video.find({}).sort({ views: -1 }).skip(skip).limit(chunkSize)
    .exec((err, videos) => {
      if (err) return handleErr(res, err)
      res.json({
        success: true,
        results: videos
      })
    })
}
