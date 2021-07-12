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
            <div class="row" v-if="recipes_not_approved.length> 0">
              <NotApprovedList
                v-for="recipe, index in recipes_not_approved"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"/>
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
            <div class="row" v-if="user_recipes.length> 0">
              <NotApprovedList
                v-for="recipe, index in user_recipes"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"/>
            </div>
            <div v-else>
              <a>No Recipes</a>
              <br><br>
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
              <NotApprovedList
                v-for="recipe, index in user_recipes"
                :key="recipe.recipeId"
                :index="index"
                :recipe="recipe"/>
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
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="container">
                      <span @click="resetCreateUserForm()" data-bs-dismiss="modal" aria-label="Close" class="close" title="Close Modal"><i class="fas fa-times-circle"></i></span>

                      <h1 style="color:#198754">Create Recipe</h1>
                      <hr>
                      <label for="name"><b>Name</b></label>
                      <input type="text" placeholder="Insert Recipe Name" name="name" required>

                      <label ><b>Image</b></label>
                      <input type="file" placeholder="Choose image" name="image" required>
                      <br><br>
                      <label ><b>Ingredients</b></label>
                      <input type="text" placeholder="Insert Ingredients" name="ingredients" required>

                      <label ><b>Steps</b></label>
                      <input type="text" placeholder="Insert Steps" name="steps" required>

                      <div class="clearfix">
                        <button
                        @click="createUser()" id="signup" type="submit" class="signup">Create</button><!--
                        <a style="color:#f05f61; font-weight: bold;">Fields required</a> -->
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

export default {
  name: 'Account',

  components: {
    NotApprovedList
  },

  data () {
    return {

      user: {},

      role: null,

      token: null,

      recipes_not_approved: [],

      user_recipes: []
    }
  },

  methods: {
    getRecipesNotApproved () {
      this.axios.get('http://localhost:3000/admin',
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        this.recipes_not_approved = response.data.data
        console.log(this.recipes_not_approved)
      })
    },

    getUserRecipes () {
      this.axios.get('http://localhost:3000/users/' + this.user.userId + '/recipes',
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        this.user_recipes = response.data.data
        console.log(this.user_recipes)
      })
    },

    logOut () {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('role')
      window.localStorage.removeItem('token')

      this.$router.push({ name: 'Login' })
    }
  },

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

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
    width: 100%; /* Could be more or less, depending on screen size */
  }

  * {box-sizing: border-box}
  /* Full-width input fields */
  input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  background: #f1f1f1;
  border-radius: 10px;
}
</style>
