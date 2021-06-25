const db = require('../../db')


module.exports = {

  getAllRecipes(page, limit){
    offset, total, pageCount = this.getPageCount(page, limit)
    recipes = this.getRecipes(offset, limit)

    return recipes, total, pageCount 
  },

  getPageCount(page, limit) {
    var offset = 0;
    var total = 0;
    var pageCount = 0;

    db.query('SELECT COUNT(id) FROM recipes', (error, countResults, _) => {
      if (error) {
        throw error
      }
  
      offset = (page - 1) * limit
      total = countResults[0]['COUNT(id)']
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

  /* getAltRecipes() {
    var recipes = []
    db.query('SELECT * FROM recipes', (error, results, _) => {
      if (error) {
        throw error
      }
      console.log(results)
    })
    return recipes
  } */

  /* getAltRecipes() {
    return db.query('SELECT * FROM recipes',
      function (error, results) {
        if (error) throw error;
        return results
    })
  } */


  /* async getAltRecipes () {
    const result = await db.promise().query('SELECT * FROM recipes');
    if (result[0].length < 1) {
      throw new Error('Post with this id was not found');
    }
    return result[0];
  } */

  async getAltRecipes () {
    const result = await db().promise().query('SELECT * FROM recipes');
    if (result[0].length < 1) {
      throw new Error('Couldnt retrieve recipes');
    }
    return result[0];
  },

  async deleteRecipes (id) {
    const deleted = await db().promise().query('DELETE FROM recipes WHERE recipeId = ?', [id])
    if (deleted[0].ResultSetHeader.affectedRows !== 1) {
      throw new Error("Couldnt delete")
    }
  },

  async searchIngredientIdByName(ingredientName) {
    const IngredientsByName = await db().promise().query('SELECT ingredientId FROM ingredient WHERE name = ?', [ingredientName])
    if (IngredientsByName.length == 0) {
      throw new Error('No ingredients were found with that name')
    }
    return IngredientsByName[0]
  },

  async searchRecipeIdByIngredientId (ingredientID) {
    const recipesByIng = await db().promise().query('SELECT recipeRecipeId FROM ingredient_recipe WHERE ingredientIngredientId = ?', [ingredientID])
    if (recipesByIng.length == 0) {
      throw new Error('No recipes were found for that ingredient')
    }
    return recipesByIng[0]
  },


// PESQUISA DE RECEITAS POR INGREDIENTES:

//1.- Obter Info da receita:
  async returnRecipeById (recipeID) {
    const selectedRecipes = await db().promise().query('SELECT FROM recipes WHERE recipeId = ?', [recipeID])
    if (selectRecipe.length == 0) {
      throw new Error('No recipes were found with that ID')
    }
    return selectedRecipes
  },

//2.- Obter Lista de Ingredientes da receita:
  async getAllIngredientIdsFromRecipe (recipeID) {
    const ingredientIdsFromRecipe = await db().promise().query('SELECT ingredientIngredientID FROM ingredient_recipe WHERE recipeId = ?', [recipeID])
    if (ingredientsFromRecipe.length == 0) {
      throw new Error('No ingredients were found for that recipe')
    }
    return ingredientIdsFromRecipe
  },

  async getIngredientById (ingredientID) {
    const ingredient = await db().promise().query('SELECT FROM ingredient WHERE ingredientId = ?', [ingredientID])
    if (ingredient.length == 0) {
      throw new Error('No ingredients were found with that ID')
    }
    return ingredient
  },

//3.- Obter Steps da receita:
  async getStepByRecipeId (recipeID) {
    const stepsFromRecipe = await db().promise().query('SELECT FROM steps WHERE ReciperecipeId = ?', [recipeID])
    if (stepsFromRecipe.length == 0) {
      throw new Error('No steps were found for that recipe')
    }
    return stepsFromRecipe
  }
}