const router = require('express').Router()
const { validate } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
const Users = require('../services/users')
const bcrypt = require('bcrypt')
const Recipes = require('../services/recipes')

function removePasswordProperty(object) {
  delete object.password
}

router.get('/', (req, res) => {
  const { page, limit } = req.query

  db.query('SELECT COUNT(*) FROM users', (error, results) => {
    if (error) {
      throw error
    }

    const count = results[0]['COUNT(*)']

    const _limit = Number(limit) || 20
    const _page = Number(page) || 1

    const offset = (_page - 1) * _limit

    db.query('SELECT * FROM users LIMIT ?, ?', [offset, _limit], (error, results, _) => {
      if (error) {
        throw error
      }

      const pages = Math.ceil(count / _limit)

      res.send({
        code: 200,
        meta: {
          pagination: {
            total: count,
            pages: pages,
            page: _page,
          }
        },
        data: results,
      })
    })
  })
})

router.get('/search', (req, res) => {
  const { name } = req.query

  db.query(`SELECT * FROM users WHERE name LIKE "%${name}%";`, [name], (error, results) => {
    if (error) {
      throw error
    }

    res.send(results)
  })
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
    if (error) {
      throw error
    }

    removePasswordProperty(results[0])

    res.send({
      code: 200,
      meta: null,
      data: results[0]
    })
  })
})

router.post('/', (req, res) => {
  const user = req.body

  validate(user, {
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

router.put('/:id', (req, res) => {
  const { id } = req.params

  const user = req.body

  validate(user, {
    email: 'email',
    admin: 'boolean',
    password: 'min:6',
    passwordSame: 'requiredIf:password|same:password'
  }).then(async (value) => {
    sanitize(value, {
      email: 'trim|lowerCase',
      password: 'trim'
    })

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10)

      delete value.passwordSame
    }

    db.query('UPDATE users SET ? WHERE userId = ?', [value, id], (error, results, _) => {
      if (error) {
        throw error
      }

      const gettedUser = User.getUser(id)

      removePasswordProperty(gettedUser)

      res.send({
        code: 200,
        meta: null,
        data: gettedUser
      })
    })
  })
    .catch((error) => {
      res.status(400).send(error)
    })
})

router.patch('/:id/visible', (req, res) => {
  const { id } = req.params

  const { visible } = req.body

  const status = visible ? 1 : 0

  db.query('UPDATE recipes SET visible = ? WHERE recipeId = ?', [status, id], (error, results, _) => {
    if (error) {
      throw error
    }

    res.send(isVisible)
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM users WHERE userId = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }

    const [user] = results

    db.query('DELETE FROM users WHERE userId = ?', [id], (error, _, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: user
      })
    })
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  Recipes.deleteRecipes(id).then(() => {
    res.send({
      code: 200
    })
  }).catch((error) => {
    res.status(500).send(error)
  })
})

router.get('/:id/recipes', (req, res) => {
  const { id } = req.params

  Recipes.getRecipesByUserId(id).then((recipes) => {
    
    if (recipes.length == 0) {
      code = 204
    } else {
      code = 200
    }
    res.send({
      code: code,
      data: recipes
    })
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error)
  })
})

router.post('/', (req, res) => {
  const recipe = req.body

  validate(recipe, {
    UseruserId: 'required',
    name: 'required'
  }).then((value) => {

    Recipes.addRecipe(value).then(() => {

        res.send({
          code: 200
        })
      }).catch((error) => {
        res.status(500).send(error)
      })
  }).catch((error) => {
    res.status(400).send(error)
  })
})

module.exports = router