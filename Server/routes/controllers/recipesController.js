const router = require('express').Router()
// const { validate } = require('indicative/validator') para uso no futuro
const Recipes = require('../services/recipes')

// Testes
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
// Procurar receitas por nome de ingrediente
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

module.exports = router