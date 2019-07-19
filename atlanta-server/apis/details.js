const Video = require('../models/video')

function handleErr (res, err) {
  if (err) console.error(`Internal/DB error:\n${err}`)
  res.json({
    success: false
  })
}

module.exports.getVideoById = (req, res) => {
  if (!req.query.id) return handleErr(res)

  Video
    .find({ _id: req.query.id })
    .exec((err, docs) => {
      if (err || docs.length !== 1) return handleErr(res, err)

      docs[0].views++

      // Get 4 suggested videos
      Video
        .aggregate([
          {
            '$match': {
              tags: { '$in': docs[0].tags },
              _id: { '$ne': docs[0]._id }
            }
          },
          { '$project': {
            tags: 1,
            title: 1,
            thumbnailURL: 1,
            views: 1,
            order: {
              '$size': {
                '$setIntersection': [ docs[0].tags, '$tags' ]
              }
            }
          } },
          { '$sort': { order: -1 } }
        ])
        .limit(4)
        .exec((err2, suggestions) => {
          if (err2) return handleErr(res, err2)

          // Send API result
          res.json({
            success: true,
            video: docs[0],
            suggestions: suggestions
          })
        })

      // Increment views counter
      docs[0].save()
    })
}
