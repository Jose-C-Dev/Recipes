<template>
  <div>
    <div v-if="this.user !== null">
      <div>
        <div class="home" style="padding-left: 25%; padding-right: 25%;">
          <img alt="Logo" src="@/assets/logorecipe.png" width="200" height="200">
        </div>
        <div>
          <a id="welcome">Welcome {{ user.name }}</a>
          <br>
          <button class="btn btn-danger" @click="logOut()">Logout</button>
        </div>
      </div>
      <div v-if="this.role === '1'">
        <div class="container">
          <br><br>
          <button class="btn btn-outline-danger" type="button" data-bs-toggle="collapse" data-bs-target="#notApproved" aria-expanded="false"
            aria-controls="collapseExample">Recipes Not Approved</button>
          <br><br>
          <div class="collapse" id="notApproved">
            <div class="row" v-if="recipes_not_approved.length > 0">
              <NotApprovedList
                v-for="recipe, index in recipes_not_approved"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"
                :user="user"
                :token="token"
                @handle-change="handleChange"/>
            </div>
            <div v-else>
              <a>No Recipes to appove</a>
            </div>
          </div>
          <br><br><hr>
          <button class="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#myRecipes" aria-expanded="false"
            aria-controls="collapseExample">Show my Recipes</button>
          <br><br>
          <div class="collapse" id="myRecipes">
            <div class="row" v-if="user_recipes.length > 0">
              <UserRecipesList
                v-for="recipe, index in user_recipes"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"
                :user="user"
                :token="token"/>
            </div>
            <div v-else>
              <a>No Recipes</a>
              <br><br>
            </div>
          </div>
          <div>
            <button class="w-50 btn btn-lg btn-success" type="button" data-bs-toggle='modal' data-bs-target='#createRecipeModal' >Create Recipe</button>
            <div id="createRecipeModal" class="modal" role="dialog">
              <div class="modal-dialog" role="document">
                <div id="modalC" class="modal-content">
                  <div class="modal-body">
                    <div class="container">
                      <span data-bs-dismiss="modal" aria-label="Close" class="close" title="Close Modal"><i class="fas fa-times-circle"></i></span>

                      <h1 style="color:#198754">Create Recipe</h1>
                      <hr>
                      <label for="name"><b>Name</b></label>
                      <input v-model="new_recipes.name" type="text" placeholder="Recipe Name" name="name" required>

                      <label ><b>Image</b></label>
                      <input @change="updateFile" id="file" class="form-control" type="file" placeholder="Choose image" name="image" required>
                      <br>
                      <label ><b>Ingredients</b></label>
                      <div class="input-group" v-for="item in new_recipes.ingredients" v-bind:key="item.id" >
                        <input class="form-control" id="iname" type="text" placeholder="Name" name="name" v-model="item.name" required>&nbsp;
                        <input class="form-control" id="iquantity" type="number" placeholder="Quantity" min="0" name="qtd" v-model="item.quantity" required>&nbsp;
                        <select class="form-select" id="unity" name="unity" v-model="item.unity" required>
                          <!-- <option value="" disabled selected>Unity</option> --><!--
                          <option value="" placeholder="Quantity" selected>Unity</option> -->
                          <option value="un">un</option>
                          <option value="g">g</option>
                          <option value="Kg">Kg</option>
                          <option value="L">L</option>
                        </select>
                      </div>
                      <button @click="addIngredients()" class="w-50 btn btn-sm btn-success" type="button">Add Ingredient</button>
                      <br><br>
                      <label ><b>Steps</b></label>
                      <input v-model="new_recipes.steps" type="text" placeholder="Steps" name="steps" required>

                      <div class="clearfix">
                        <button
                        @click="createRecipe()" id="signup" type="submit" class="signup btn btn-success">Create Recipe</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br><br>
        </div>
      </div>
      <div v-else>
        <div class="container">
          <br><br>
          <button class="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#myRecipes2" aria-expanded="false"
            aria-controls="collapseExample">Show my Recipes</button>
          <br><br><hr>
          <div class="collapse" id="myRecipes2">
            <div class="row" v-if="user_recipes.length> 0">
              <UserRecipesList
                v-for="recipe, index in user_recipes"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"
                :user="user"
                :token="token"/>
            </div>
            <div v-else>
              <a>No Recipes</a>
              <br><br>
            </div>
          </div>
          <div>
            <button class="w-50 btn btn-lg btn-success" type="button" data-bs-toggle='modal' data-bs-target='#createRecipeModal' >Create Recipe</button>
            <div id="createRecipeModal" class="modal" role="dialog">
              <div class="modal-dialog" role="document">
                <div id="modalC" class="modal-content">
                  <div class="modal-body">
                    <div class="container">
                      <span @click="resetRecipeForm()" data-bs-dismiss="modal" aria-label="Close" class="close" title="Close Modal"><i class="fas fa-times-circle"></i></span>

                      <h1 style="color:#198754">Create Recipe</h1>
                      <hr>
                      <label for="name"><b>Name</b></label>
                      <input v-model="new_recipes.name" type="text" placeholder="Recipe Name" name="name" required>

                      <label ><b>Image</b></label>
                      <input @change="updateFile" id="file" class="form-control" type="file" placeholder="Choose image" name="image" required>
                      <br>
                      <label ><b>Ingredients</b></label>
                      <div class="input-group" v-for="item in new_recipes.ingredients" v-bind:key="item.id" >
                        <input class="form-control" id="iname" type="text" placeholder="Name" name="name" v-model="item.name" required>&nbsp;
                        <input class="form-control" id="iquantity" type="number" placeholder="Quantity" min="0" name="qtd" v-model="item.quantity" required>&nbsp;
                        <select class="form-select" id="unity" name="unity" v-model="item.unity" required>
                          <!-- <option value="" disabled selected>Unity</option> --><!--
                          <option value="" placeholder="Quantity" selected>Unity</option> -->
                          <option value="un">un</option>
                          <option value="g">g</option>
                          <option value="Kg">Kg</option>
                          <option value="L">L</option>
                        </select>
                      </div>
                      <button @click="addIngredients()" class="w-50 btn btn-sm btn-success" type="button">Add Ingredient</button>
                      <br><br>
                      <label ><b>Steps</b></label>
                      <input v-model="new_recipes.steps" type="text" placeholder="Steps" name="steps" required>

                      <div class="clearfix">
                        <button
                        @click="createRecipe()" id="signup" type="submit" class="signup btn btn-success">Create Recipe</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="home" style="padding-left: 25%; padding-right: 25%;">
        <img alt="Logo" src="@/assets/logorecipe.png" width="200" height="200">
      </div>
      <br><br>
      <a style="color:#f05f61; font-size:40px; font-weight: bold;">A login is needed to access this area</a>
    </div>
  </div>
</template>

<script>
import NotApprovedList from '@/components/NotApprovedList.vue'
import UserRecipesList from '@/components/UserRecipesList.vue'
import swal from 'sweetalert'
// Pagina account onde demonstra os componentes pretendidos dependendo do user que realiza o login
export default {
  name: 'Account',

  components: {
    NotApprovedList,
    UserRecipesList
  },

  data () {
    return {
      // Data onde guarda info do user, role, e token preenchida quando aberta esta pagina
      user: {},

      role: null,

      token: null,
      // Arrays onde guardam receitas
      recipes_not_approved: [],

      user_recipes: [],
      // Array onde e preenchido com dados de uma nova receita
      new_recipes: {

        name: null,
        image: null,
        file: null,
        ingredients: [
          {
            id: 1,
            name: null,
            quantity: null,
            unity: null
          }
        ],
        steps: null
      }
    }
  },

  methods: {
    handleChange () {
      console.log('UPDATE CHAMADO')
      /* this.$forceUpdate() */
      this.$router.go()
    },
    // Metodo que envia o request para o backend para fazer a criacao de uma nova receita
    createRecipe () {
      var formData = new FormData()
      formData.append('file', this.new_recipes.file)
      formData.append('name', this.new_recipes.name)
      formData.append('ingredients', JSON.stringify(this.new_recipes.ingredients))
      formData.append('steps', this.new_recipes.steps)
      formData.append('UseruserId', this.user.userId)

      this.axios.post('http://localhost:3000/users/recipes', formData,
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        if (response.data.code === 200) {
          swal('Good job!', 'Recipe Created', 'success')
          this.resetRecipeForm()
        }
      }).catch((error) => {
        if (error.response.data.errno === 1062) {
          swal('Oops', 'Recipe Error', 'error')
        }
        console.log(error.response.data.errno)
      })
    },

    updateFile (event) {
      this.new_recipes.file = event.target.files[0]
    },
    // Metodo que envia o request para o backend para obter a listagem de receitas nao aprovadas
    getRecipesNotApproved () {
      this.axios.get('http://localhost:3000/admin',
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        this.recipes_not_approved = response.data.data
      })
    },
    // Metodo que envia o request para o backend para obter a listagem de receitas de um user
    getUserRecipes () {
      this.axios.get('http://localhost:3000/users/' + this.user.userId + '/recipes',
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        this.user_recipes = response.data.data
      })
    },
    // Metodo que da wipe a data user, role, token e envia para a rota Login
    logOut () {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('role')
      window.localStorage.removeItem('token')

      this.$router.push({ name: 'Login' })
    },
    // Metodo que faz o push dos ingredientes e assim da para adicionar varios
    addIngredients () {
      const _id = this.new_recipes.ingredients.length + 1
      this.new_recipes.ingredients.push(
        {
          id: _id,
          name: null,
          quantity: null,
          unity: null
        })
    },
    // Metodo que da wipe a data do form de onde se cria receitas
    resetRecipeForm () {
      this.new_recipes = {

        name: null,
        image: null,
        file: null,
        ingredients: [
          {
            id: 1,
            name: null,
            quantity: null,
            unity: null
          }
        ],
        steps: null
      }
    }
  },
  // Este created vai fazer get aos items user, role, token que sao set no login e executa no criar da pagina os metodos getRecipesNotApproved e getUserRecipes
  created () {
    this.user = JSON.parse(window.localStorage.getItem('user'))
    this.role = window.localStorage.getItem('role')
    this.token = window.localStorage.getItem('token')
    this.getRecipesNotApproved()
    this.getUserRecipes()
  }
}
</script>

<style>

  #welcome {
    font-size: 50px;
    color:#198754
  }

  #modalC {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
    width: 100%; /* Could be more or less, depending on screen size */
  }

  * {box-sizing: border-box}
  /* Full-width input fields */
  input[type=text], input[type=password], input[type=file], input[type=number] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  background: #f1f1f1;
  border-radius: 10px;
  }

  .form-select {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  #unity {
    background-color: #f1f1f1;
    border-radius: 0px 10px 10px 0px;
  }

  #iname {
    width: 40%
  }

  #iquantity {
    width: 25%
  }

</style>
