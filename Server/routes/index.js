const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const usersRouter = require('./controllers/usersController')
const recipesRouter = require('./controllers/recipesController')
const adminRouter = require('./controllers/adminController')

const login = require('./public/login')
const createUser = require('./public/createUser')

module.exports = {
  register(app) {
    app.use('/users', auth, usersRouter) // Rota para users
    app.use('/admin', admin, adminRouter) // Rota para admins
    app.use('/recipes', recipesRouter) // Rota para visitantes
    app.use('/createuser', createUser) // Rota para criar uma nova conta de user
    app.post('/login', login) // Rota realizar o login
  }
}