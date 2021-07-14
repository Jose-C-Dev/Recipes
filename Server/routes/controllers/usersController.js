const router = require('express').Router()
const { validate } = require('indicative/validator')
const Recipes = require('../services/recipes')
const db = require('../../db')

var multer  = require('multer')
var fs  = require('fs')
var path  = require('path')
var upload = multer({ dest: 'uploads/images' })

router.patch('/:id/visible', (req, res) => {
  const { id } = req.params

  const visible  = req.body.visible

  const status = (visible === 0 ? 1 : 0)

  Recipes.changeVisibilityFromRecipe(id, status).then(() => {
    res.send({
      code: 200
    })
  }).catch((error) => {
    res.status(500).send(error)
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

router.post('/recipes', upload.single('file'), (req, res) => {
  const recipe = req.body
  const { filename, destination, originalname } = req.file

  const ext = path.extname(originalname)
  const source_file = `${destination}/${filename}`
  const target_file = `${destination}/${filename}${ext}`

  fs.renameSync(source_file, target_file)

  validate(recipe, {
    name: 'required',
    steps: 'required'
  }).then((value) => {

    value.file = `${filename}${ext}`;

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