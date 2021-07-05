const db = require('../db')
const jwt = require('jsonwebtoken')
const router = require('../routes/controllers/usersController')
const { JsonWebTokenError } = jwt

module.exports = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization) {
    res.status(400).send('JWT not provided')

    return
  }

  const secret = 'B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP'

  try {
    const { role } = jwt.verify(authorization, secret)
    console.log(jwt.verify(authorization, secret))
    
    if(role == "admin") {
      next()
    } else {
      res.status(400).send('You don\'t have enough privilegies to access this resource')
    }

  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(400).send('Invalid JWT provided')
    } else {
      res.status(401).send('Unknown error trying to verify the provided JWT')
    }
  }
}