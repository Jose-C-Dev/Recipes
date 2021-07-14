const router = require('express').Router()
const { validate } = require('indicative/validator')
const Recipes = require('../services/recipes')

router.get('/', (req, res) => {

  Recipes.getRecipesNotApproved().then((recipes) => {
    
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

router.patch('/:id/approval', (req, res) => {
  const { id } = req.params
  const data = req.body

  validate(data, {
    userId: 'required',
    approval: 'required|boolean'
  }).then((value) => {
    Recipes.changeApprovalById(id, value).then(() => {
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