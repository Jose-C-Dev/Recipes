const auth = require('../middlewares/auth')

const usersRouter = require('./controllers/usersController')
const recipesRouter = require('./controllers/recipesController')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/users', auth, usersRouter)
    /* app.use('/users', usersRouter) */
    /* app.use('/recipes', auth, recipesRouter) */
    app.use('/recipes', recipesRouter)
    
    app.post('/login', login)
  }
}