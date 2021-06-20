const db = require('../db')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt

module.exports = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization) {
    res.status(400).send('JWT not provided')

    return
  }

  const secret = 'B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP'

  try {
    const { id } = jwt.verify(authorization, secret)

    db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
      if (error) {
        throw error
      }

      if (results.length === 0) {
        res.status(401).send('You don\'t have enough privilegies to access this resource')
      } else {
        next()
      }
    })
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(400).send('Invalid JWT provided')
    } else {
      res.status(401).send('Unknown error trying to verify the provided JWT')
    }
  }
}