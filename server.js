const http = require('http')
const app = require('./app')

const port = Number(process.env.PORT || 4848)

const server = http.createServer(app)

server.listen(port)

