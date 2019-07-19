const fs = require('fs')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const version = '0.0.1'

const config = JSON.parse(fs.readFileSync('./config.json'))
const apis = {
  discovery: require('./apis/discovery'),
  details: require('./apis/details'),
  search: require('./apis/search'),
  flagging: require('./apis/flagging')
}
const app = express()

app.use(cors())
app.get('/discovery/top', apis.discovery.getChunkByViews)
app.get('/discovery/tags', apis.discovery.getAllTags)
app.get('/details/video', apis.details.getVideoById)
app.get('/search', apis.search.performSearch)
app.post('/flag', apis.flagging.flag)

app.get('/', (req, res) => req.json({
  success: true,
  description: 'Atlanta content server',
  version,
  port: config.port
}))

mongoose.connect(config.mongoURL, {
  useNewUrlParser: true
}, () => {
  app.listen(config.port, () =>
    console.log(`atlanta-server up on ${config.port}`)
  )
})
