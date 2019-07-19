const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  uploaded: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  videoURL: {
    type: String,
    required: true,
    trim: true
  },
  videoMimeType: {
    type: String,
    required: true,
    default: 'video/mp4'
  },
  thumbnailURL: {
    type: String,
    required: true,
    trim: true
  },
  views: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema)
