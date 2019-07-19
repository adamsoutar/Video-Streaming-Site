const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'))

const Video = require('../models/video')

function handleErr (res, err) {
  if (err) console.error(`Internal/DB error:\n${err}`)
  res.json({
    success: false
  })
}

module.exports.performSearch = (req, res) => {
  let term = req.query.term
  let skip = parseInt(req.query.offset) || 0
  let chunkSize = parseInt(req.query.limit) || config.apiMaxChunkSize

  if (chunkSize > config.apiMaxChunkSize || chunkSize < 1) {
    chunkSize = config.apiMaxChunkSize
  }

  if (isNaN(chunkSize) || isNaN(skip) || term === '') {
    // Invalid params
    return handleErr(res)
  }

  Video
    .find(
      { $text: { $search: term } },
      { score: { $meta: 'textScore' } }
    )
    .sort(
      { score: { $meta: 'textScore' } }
    )
    .exec((err, docs) => {
      if (err) return handleErr(res, err)

      res.json({
        success: true,
        results: docs
      })
    })
}
