const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const fileUpload = require('../middlewares/file_upload')

const usersRouter = require('./controllers/usersController')
const recipesRouter = require('./controllers/recipesController')
const adminRouter = require('./controllers/adminController')

const login = require('./public/login')
const createUser = require('./public/createUser')

module.exports = {
  register(app) {
    app.use('/users', [auth, fileUpload.single('image')], usersRouter)
    app.use('/admin', admin, adminRouter)
    app.use('/recipes', recipesRouter)
    app.use('/createuser', createUser)
    app.post('/login', login)
  }
}