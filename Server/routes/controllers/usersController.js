const router = require('express').Router()
const { validate } = require('indicative/validator')
const Recipes = require('../services/recipes')

var multer  = require('multer')
var fs  = require('fs')
var path  = require('path')
var upload = multer({ dest: 'uploads/images' })

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
  console.log("Aquiaaaaaa", req.body)
  console.log("Aquibbbbbbb", req)
  const { file, recipe } = req.body
  const { filename, destination, originalname } = req.file

  const ext = path.extname(originalname);
  const source_file = `${destination}/${filename}`;
  const target_file = `${destination}/${filename}${ext}`;

  console.log(source_file + ' - ' + target_file)

  fs.renameSync(source_file, target_file)

  console.log("Aquiiii", file)

  console.log("Aqui", req.body)

  validate(recipe, {
    name: 'required',
    steps: 'required'
  }).then((value) => {
    console.log("Aqui2", value)

    value.file = `${destination}${filename}${ext}`;

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