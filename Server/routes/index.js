const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const usersRouter = require('./controllers/usersController')
const recipesRouter = require('./controllers/recipesController')
const adminRouter = require('./controllers/adminController')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/users', usersRouter)
    app.use('/admin',/* [auth, admin], */ adminRouter)
    /* app.use('/users', usersRouter) */
    /* app.use('/recipes', auth, recipesRouter) */
    app.use('/recipes', recipesRouter)
    
    app.post('/login', login)
  }
}