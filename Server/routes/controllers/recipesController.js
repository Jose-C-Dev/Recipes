const router = require('express').Router()
const { validate } = require('indicative/validator')
const Recipes = require('../services/recipes')

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

router.get('/ingredient/:name', (req, res) => {
  const { name } = req.params

  Recipes.getAllRecipesByIngredient(name).then((recipes) => {
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
    UseruserId: 'required|integer',
    name: 'required',
    image: 'blob',
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