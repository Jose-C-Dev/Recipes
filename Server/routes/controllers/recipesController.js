const router = require('express').Router()
const { validate } = require('indicative/validator')
const Recipes = require('../services/recipes')


/* router.get('/', (req, res) => {
  const { limit, page } = req.query

  const _limit = +limit || 20
  const _page = +page || 1

  recipes, total, pageCount = Recipes.getAllRecipes(_page, _limit)

  res.send({
    code: 200,
    meta: {
      pagination: {
        total: total,
        pages: pageCount,
        page: _page,
        limit: _limit
      }
    },
    data: recipes
  })
}) */

router.get('/', (req, res) => {

  Recipes.getAltRecipes().then((recipes) => {
    res.send({
      code: 200,
      data: recipes
    })
  }).catch((error) => {
    res.status(500).send(error)
  })
})


router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query(`SELECT * FROM recipes WHERE recipeId = ${id}`, (error, results) => {
    if (error) {
      throw error
    }

    res.send({
      code: 200,
      meta: null,
      data: results[0]
    })
  })
})

router.post('/', (req, res) => {
  const todo = req.body

  validate(todo, {
    name: 'required',
    UseruserId: 'required|integer',
    visible: 'boolean',
  }).then((value) => {
    db.query('INSERT INTO recipes SET ?', [value], (error, results, _) => {
      if (error) {
        throw error
      }

      const { insertId } = results

      db.query('SELECT * FROM recipes WHERE recipeId = ? LIMIT 1', [insertId], (error, results, _) => {
        if (error) {
          throw error
        }

        res.send({
          code: 200,
          meta: null,
          data: results[0]
        })
      })
    })
  }).catch((error) => {
    res.status(400).send(error)
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const todo = req.body

  validate(todo, {
    completed: 'boolean',
  }).then((value) => {
    db.query('UPDATE todos SET ? WHERE id = ?', [value, id], (error, results, _) => {
      if (error) {
        throw error
      }

      db.query('SELECT * FROM todos WHERE id = ? LIMIT 1', [id], (error, results, _) => {
        if (error) {
          throw error
        }

        res.send({
          code: 200,
          meta: null,
          data: results[0]
        })
      })
    })
  }).catch((error) => {
    res.status(400).send(error)
  })
})

router.patch('/:id/approval', (req, res) => {
  const { id } = req.params

  const data = req.body

  validate(data, {
    completed: 'boolean',
  }).then((value) => {
    db.query(`UPDATE recipes SET approval = ${value.approval} WHERE id = ${id}`, (error, results, _) => {
      if (error) {
        throw error
      }

      res.send(value.approval)
    })
  }).catch((error) => {
    res.status(400).send(error)
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

module.exports = router  