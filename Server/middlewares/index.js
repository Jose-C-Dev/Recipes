const bodyParser = require('body-parser')

const sqlInjection = require('./sql_injection')
const xss = require('./xss')

const middlewares = [
  bodyParser.json(),
  sqlInjection,
  xss,
]

module.exports = {
  register(app) {
    for (const middleware of middlewares) {
      app.use(middleware)
    }
  }
}