const db = require('../../db')


module.exports = {

  getAllRecipes(page, limit) {
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

  async getAltRecipes() {
    const result = await db().promise().query('SELECT * FROM recipes')
    if (result[0].length < 1) {
      throw new Error('Couldnt retrieve recipes')
    }
    return result[0]
  },

  async deleteRecipes(id) {
    const deleted = await db().promise().query('DELETE FROM recipes WHERE recipeId = ?', [id])
    if (deleted[0].affectedRows !== 1) {
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

  async searchRecipeIdByIngredientId(ingredientID) {
    const recipesByIng = await db().promise().query('SELECT recipeRecipeId FROM ingredient_recipe WHERE ingredientIngredientId = ?', [ingredientID])
    if (recipesByIng.length == 0) {
      throw new Error('No recipes were found for that ingredient')
    }
    return recipesByIng[0]
  },


  // PESQUISA DE RECEITAS POR INGREDIENTES:

  //1.- Obter Info da receita:
  async returnRecipeById(recipeID) {
    const selectedRecipes = await db().promise().query('SELECT recipeId FROM recipes WHERE recipeId = ?', [recipeID])
    if (selectRecipe.length == 0) {
      throw new Error('No recipes were found with that ID')
    }
    return selectedRecipes
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
  /* async getRecipesNotApproved() {
    const stepsFromRecipe = await db().promise().query(`SELECT i.name, i.ingredientId, ir.recipeRecipeId, r.name
                                                        FROM recipes_app.ingredient_recipe ir, recipes_app.ingredients i, recipes_app.recipes r
                                                        WHERE ir.recipeRecipeId = ( SELECT recipeId 
                                                            FROM recipes_app.recipes r
                                                            WHERE r.approval = 0 and r.recipeId = ir.recipeRecipeId)
                                                        AND ir.ingredientIngredientId = i.ingredientId
                                                        AND ir.recipeRecipeId = r.recipeId`)
    
    let xpto = stepsFromRecipe[0];
   
    let xpto0 = xpto[0];
    console.log(xpto0.name);
  

    let result = {
      "recipe": {
        "ingredients": []
      }
    }

    let result2 = {}
    for (i = 0; i<stepsFromRecipe[0].length; i++){
      // if(result2.)
      let xpto = stepsFromRecipe[0];
      let textRow = xpto[i];
      let ingId = textRow.ingredientId;
      // let ingName = i.name;
      if(i != 0){
        let lastTextRow = xpto[i-1];
        let lastIngId = lastTextRow.ingredientId;
        if(lastIngId==ingId){
          result.recipe.ingredients.push( { "IngreiendId": ingId } )
        }else{
          //adicionar ingrediente ao novo objecto recipe
        }
      }else{
        result.recipe.ingredients.push( { "IngreiendId": ingId } )
      }
      
      console.log("my result : ",result);
      console.log("my result : ",ingId);
    }

    return stepsFromRecipe[0];





  }, */


  //2.- Aprovar receita:
  async changeApprovalById(id, value) {
    console.log(value.approval)
    console.log(id)
    const changedApproval = await db().promise().query(`UPDATE recipes SET approval = ${value.approval}, aprovedBy = ${value.userId}, dateOfApproval = now() WHERE recipeId = ${id}`)
    /* console.log("aqui", changedApproval[0].affectedRows) */
    /* if (changedApproval[0].ResultSetHeader.affectedRows != 1) {
      console.log("asd")
      throw new Error("Couldnt approve")
    } */
    /* console.log("aqui2", changedApproval) */
    return changedApproval[0].affectedRows
  },

  // Listar receitas de um user:

  //1.- Obter receitas de um user:
  async getRecipesByUserId(id) {
    const getUserRecipes = await db().promise().query('SELECT * FROM recipes WHERE UseruserId = ?', [id])
    console.log(getUserRecipes[0].length)
    return getUserRecipes[0]
  },

  // Adicionar receita:

  //1.- Adicionar receita HEAD
  async addRecipe(value) {
    const addedRecipe = await db().promise().query('INSERT INTO recipes SET UseruserId = ?', [value.recipes])
    console.log(addedRecipe)
    return addedRecipe[0]
  }


  //2.- Adicionar Ingredientes


  //3.- Adicionar Steps
}