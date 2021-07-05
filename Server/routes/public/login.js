const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../../db')

module.exports = (req, res) => {
  console.log("ola")
  validate(req.body, {
    username: 'required|email',
    password: 'required'
  }).then((value) => {
    console.log(value)
    
    db().query('SELECT * FROM users WHERE email = ?', [value.username], (error, results) => {
      console.log(value)
      console.log(results)
      console.log(db)
      if (results.length === 0) {
        res.status(400).send('Cannot find any account that matches the given username and password')
      } else {
        bcrypt.compare(value.password, results[0].password)
          .then((match) => {
            if (match) {
              const secret = 'B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP'
              /* const data = { id: results[0].id } */
              const data = { id: results[0].userId, role: results[0].admin ? 'admin' : 'user' }
              console.log(data)
              console.log(results)

              delete results[0].password

              const authToken = jwt.sign(data, secret)
              
              res.send({
                user: results[0],
                token: authToken
              })
            } else {
              res.status(400).send('Cannot find any account that matches the given username and password')
            }
          }).catch((error) => { throw error })
      }
    })
  }).catch((error) => res.status(400).send(error))
}

//const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");