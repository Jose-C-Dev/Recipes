const router = require('express').Router()
const { validate } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
const Users = require('../services/users')
const bcrypt = require('bcrypt')


router.post('/', (req, res) => {
  const userForm = req.body

  validate(userForm, {
    name: 'required',
    email: 'required|email',
    password: 'required|min:6',
    passwordSame: 'required|same:password'
  }).then((value) => {
    sanitize(value, {
      email: 'trim|lowerCase',
      password: 'trim'
    })

    delete value.passwordSame

    bcrypt.hash(value.password, 10).then((hash) => {
      value.password = hash

      Users.createUser(value).then(() => {

        res.send({
          code: 200
        })
      }).catch((error) => {
          res.status(500).send(error)
      })
    }).catch((error) => { throw error })


  }).catch((error) => {
    res.status(400).send(error)
  })
})

module.exports = router