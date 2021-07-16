const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../../db')
// Validacao dos dados que sao inseridos na realizacao de um login e devolve informacao de um user e a respetiva token com a role do user 
module.exports = (req, res) => {
  validate(req.body, {
    username: 'required|email',
    password: 'required'
  }).then((value) => {
    
    db().query('SELECT * FROM users WHERE email = ?', [value.username], (error, results) => {
      if (results.length === 0) {
        res.status(400).send('Email or Password are incorrect!')
      } else {
        bcrypt.compare(value.password, results[0].password)
          .then((match) => {
            if (match) {
              const secret = 'B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP'

              const data = { id: results[0].userId, role: results[0].admin ? 'admin' : 'user' }

              delete results[0].password

              const authToken = jwt.sign(data, secret)
              
              res.send({
                user: results[0],
                token: authToken
              })
            } else {
              res.status(400).send('Email or Password are incorrect!')
            }
          }).catch((error) => { throw error })
      }
    })
  }).catch((error) => res.status(400).send(error))
}