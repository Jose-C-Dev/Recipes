const db = require('../../db')


module.exports = {
// Futuro uso
  getAllRecipes(page, limit) {
    offset, total, pageCount = this.getPageCount(page, limit)
    recipes = this.getRecipes(offset, limit)

    return recipes, total, pageCount
  },

  getPageCount(page, limit) {
    var offset = 0;
    var total = 0;
    var pageCount = 0;

    db.query('SELECT COUNT(recipeId) FROM recipes', (error, countResults, _) => {
      if (error) {
        throw error
      }

      offset = (page - 1) * limit
      total = countResults[0]['COUNT(recipeId)']
      pageCount = Math.ceil(total / limit)
    })
    return offset, total, pageCount
  },

  getRecipes(offset, limit) {
    var recipes = [];

    db.query('SELECT * FROM recipes LIMIT ?, ?', [offset, limit], (error, results, _) => {
      if (error) {
        throw error
      }
      recipes = results
    })
    return recipes
  },
// Testes
  async getAltRecipes() {
    const result = await db().promise().query('SELECT * FROM recipes')
    if (result[0].length < 1) {
      throw new Error('Couldnt retrieve recipes')
    }
    return result[0]
  },
// Delete da receita de um user
  async deleteRecipes(id) {
    const deleted = await db().promise().query('DELETE FROM ingredient_recipe WHERE recipeRecipeId = ?', [id])
    if (deleted[0].affectedRows == 0) {
      throw new Error("Couldnt delete")
    } else {
        await db().promise().query('DELETE FROM recipes WHERE recipeId = ?', [id])
      }
    return deleted[0].affectedRows
  },
// Procurar receitas por nome de ingrediente
  async searchIngredientIdByName(ingredientName) {
    const IngredientsByName = await db().promise().query('SELECT ingredientId FROM ingredients WHERE name = ?', [ingredientName.toLowerCase()])
    if (IngredientsByName[0].length == 0) {
      throw new Error('No ingredients were found with that name')
    }
    return IngredientsByName[0]
  },
// Procurar ingredientes se existem, se nao cria.
  async searchOrCreateIngredientByName(ingredientName) {
    const IngredientsByNameReturned = await db().promise().query('SELECT ingredientId FROM ingredients WHERE name = ?', [ingredientName.toLowerCase()])
    if (IngredientsByNameReturned[0].length == 0) {
      const createIngredientQuery = `INSERT INTO ingredients (name) VALUES ('${ingredientName.toLowerCase()}')`
      const IngredientsByNameCreated = await db().promise().query(createIngredientQuery)
      return IngredientsByNameCreated[0].insertId
    }
    else {
      return IngredientsByNameReturned[0][0].ingredientId
    }
  },
// Procurar ingredientes
  async searchRecipeIdByIngredientId(ingredientID) {
    const recipesByIng = await db().promise().query('SELECT * FROM recipes WHERE recipeId IN (SELECT recipeRecipeId FROM ingredient_recipe WHERE ingredientIngredientId = ?) AND approval = 1 AND visible = 1', [ingredientID])
    if (recipesByIng.length == 0) {
      throw new Error('No recipes were found for that ingredient')
    }
    await this.fillRecipeIngredients(recipesByIng[0])
    return recipesByIng[0]
  },


  // PESQUISA DE RECEITAS POR INGREDIENTES:

  //1.- Obter Info da receita:
  async returnRecipeById(recipeID) {
    const selectedRecipes = await db().promise().query('SELECT * FROM recipes WHERE recipeId = ? AND visible = 1', [recipeID])
    if (selectedRecipes.length == 0) {
      throw new Error('No recipes were found with that ID')
    }
    return selectedRecipes[0]
  },

  //2.- Obter Lista de Ingredientes da receita:
  async getAllIngredientIdsFromRecipe(recipeID) {
    const ingredientIdsFromRecipe = await db().promise().query('SELECT ingredientIngredientId FROM ingredient_recipe WHERE recipeRecipeId = ?', [recipeID])
    if (ingredientIdsFromRecipe.length == 0) {
      throw new Error('No ingredients were found for that recipe')
    }
    return ingredientIdsFromRecipe
  },

  async getAllIngredientsByRecipeId(recipeID) {
    const ingredientIdsFromRecipe = await db().promise().query('SELECT i.* FROM recipes_app.ingredient_recipe ir JOIN recipes_app.ingredients i on (ir.ingredientIngredientId = i.ingredientId) WHERE recipeRecipeId = ?', [recipeID])
    if (ingredientIdsFromRecipe.length == 0) {
      throw new Error('No ingredients were found for that recipe')
    }
    return ingredientIdsFromRecipe
  },

  async getIngredientById(ingredientID) {
    const ingredient = await db().promise().query('SELECT FROM ingredient WHERE ingredientId = ?', [ingredientID])
    if (ingredient.length == 0) {
      throw new Error('No ingredients were found with that ID')
    }
    return ingredient
  },

  async getIngredientNameById(ingredientID) {
    const ingredient = await db().promise().query('SELECT name FROM ingredients WHERE ingredientId = ?', [ingredientID])
    if (ingredient.length == 0) {
      throw new Error('No ingredients were found with that ID')
    }
    return ingredient
  },

  //3.- Obter Steps da receita:
  async getStepByRecipeId(recipeID) {
    const stepsFromRecipe = await db().promise().query('SELECT FROM steps WHERE ReciperecipeId = ?', [recipeID])
    if (stepsFromRecipe.length == 0) {
      throw new Error('No steps were found for that recipe')
    }
    return stepsFromRecipe
  },

  // Aprovar receitas (Admin):
  
  //1.- Obter receitas nao aprovadas:
  async getRecipesNotApproved() {

    const recipesNotApproved = await db().promise().query(`SELECT * FROM recipes_app.recipes where approval = 0`)
    await this.fillRecipeIngredients(recipesNotApproved[0])

    return recipesNotApproved[0]
  },

  async fillRecipeIngredients(recipes) {
      for (let index = 0; index < recipes.length; index++) {
        const ingredientsList = await this.getAllIngredientsByRecipeId(recipes[index].recipeId)
        recipes[index]['ingredients'] = ingredientsList[0]
      }
  },

  //2.- Aprovar receita e aplicar o admin que aprovou mais a data e hora de quando foi aprovada:
  async changeApprovalById(id, value) {
    const changedApproval = await db().promise().query(`UPDATE recipes SET approval = ${value.approval}, aprovedBy = ${value.userId}, dateOfApproval = now() WHERE recipeId = ${id}`)
    return changedApproval[0].affectedRows
  },

  // Listar receitas de um user:

  //1.- Obter receitas de um user:
  async getRecipesByUserId(id) {
    const getUserRecipes = await db().promise().query('SELECT * FROM recipes WHERE UseruserId = ?', [id])
    await this.fillRecipeIngredients(getUserRecipes[0])
    return getUserRecipes[0]
  },

  // Adicionar receita:

  async createRecipe(name, image, steps, userId) {
    if (image === null){    
      var createRecipeQuery = `INSERT INTO recipes (name, steps, UseruserId) VALUES ('${name}', '${steps}', '${userId}')`;
    }
    else {
      var createRecipeQuery = `INSERT INTO recipes (name, image, steps, UseruserId) VALUES ('${name}', '${image}', '${steps}', '${userId}')`;
    }
    const addedRecipe = await db().promise().query(createRecipeQuery)
    return addedRecipe[0].insertId
  },

  async addRecipe(value){
    const addedRecipe = await this.createRecipe(value.name, value.file, value.steps, value.UseruserId)
    var ingredientsObject = JSON.parse(value.ingredients)
    ingredientsObject.forEach(async element => {
      const searchedIngredient = await this.searchOrCreateIngredientByName(element.name)
      if (searchedIngredient !== null){
        var createIngredientRecipeRelationshipQuery = `INSERT INTO ingredient_recipe (ingredientIngredientId, recipeRecipeId, quantity, unity) VALUES ('${searchedIngredient}', '${addedRecipe}', '${element.quantity}', '${element.unity}')`
        const addedIngredient = await db().promise().query(createIngredientRecipeRelationshipQuery)
      }
    })
  },
// Tornar Visivel ou n??o a receita de um user
  async changeVisibilityFromRecipe(recipeID, visible) {
    const selectedRecipes = await db().promise().query('UPDATE recipes SET visible = ? WHERE recipeId = ?', [visible, recipeID])
    if (selectedRecipes[0].affectedRows == 0) {
      throw new Error('No recipes were found with that ID')
    }
    return selectedRecipes
  },
// Procurar receitas por nome de ingrediente
  async getAllRecipesByIngredient(name) {
    const ingredientId = await this.searchIngredientIdByName(name)
    const recipesWithIngredient = await this.searchRecipeIdByIngredientId(ingredientId[0].ingredientId)
    return recipesWithIngredient
  }
}