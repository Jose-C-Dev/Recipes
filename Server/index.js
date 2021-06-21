const server = require('./server')
const middlewares = require('./middlewares')
const routes = require('./routes')

server.bootstrap((appServer) => {
  middlewares.register(appServer)
  routes.register(appServer)
})