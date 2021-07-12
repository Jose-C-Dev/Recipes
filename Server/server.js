const express = require('express')
const path = require('path')
const cors = require('cors')
const server = express()
server.use('/uploads/images', express.static(path.join('uploads', 'images')))
server.use(cors())
const EXPRESS_PORT = 3000

module.exports = {
  bootstrap: (callback) => {
    server.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
      
      if (callback) {
        callback(server)
      }
    })
  }
}