<template>
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <img v-if="recipe.image != null" :src="'http://localhost:3000/uploads/images/' + recipe.image" style="border-radius: 15px;" class="bd-placeholder-img card-img-top">
        <img v-else src="@/assets/no_picture.png" style="border-radius: 15px;" class="bd-placeholder-img card-img-top" alt='No Image'>
        <br><br>
        <h5 class="h5 btn-success">Name:</h5>
        <br>
        <h6 class="card-title">{{ recipe.name }}</h6>
        <hr>
        <h5 class="h5 btn-success" type="button" data-bs-toggle="collapse" :data-bs-target="'#ingredients' + recipe.recipeId" aria-expanded="false"
            aria-controls="collapseExample">Ingredients:</h5>
        <br>
        <h6 :id="'ingredients' + recipe.recipeId" class="collapse card-title"
          v-for="ing, index in recipe.ingredients"
          :key="ing.ingredientId"
          :index="index"
          :ing="ing">{{ ing.name }}</h6>
          <hr>
        <h5 data-bs-toggle="collapse" type="button" :data-bs-target="'#steps' + recipe.recipeId" aria-expanded="false"
            aria-controls="collapseExample" class="h5 btn-success">Steps:</h5>
        <br>
        <h6 :id="'steps' + recipe.recipeId" class="collapse card-text">{{ recipe.steps }}</h6>
        <br>
        <div class="form-check form-switch">
          <label class="form-check-label" for="flexSwitchCheckDefault">Visible</label>
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @change="changeRecipeVisibility" :checked="recipe.visible === 1">
        </div>
        <br>
        <button @click="deleteRecipes()" id="approve" type="button" class="btn btn-success">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'UserRecipesList',

  props: {
    recipe: {
      type: Object,
      required: true
    },

    user: {
      type: Object,
      required: true
    },

    token: {}
  },

  methods: {
    changeRecipeVisibility () {
      const visibleBody = {
        visible: this.recipe.visible
      }
      console.log('FUI CHAMADO E SOU VISIBLE', visibleBody)
      console.log('FUI CHAMADO E SOU RECIPEID', this.recipe.recipeId)

      this.axios.patch('http://localhost:3000/users/' + this.recipe.recipeId + '/visible', visibleBody,
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        if (response.data.code === 200) {
          swal('Good job!', 'Change visibility', 'success')
        }
      }).catch((error) => {
        if (error.response.data.errno === 1062) {
          swal('Oops', 'Change visibility', 'error')
        }
        console.log(error.response.data.errno)
      })
    },

    deleteRecipes () {
      this.axios.delete('http://localhost:3000/recipes/' + this.recipe.recipeId,
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        if (response.data.code === 200) {
          swal('Good job!', 'Deleted Recipe', 'success')
        }
      }).catch((error) => {
        if (error.response.data.errno === 1062) {
          swal('Oops', 'Delete Recipe', 'error')
        }
        console.log(error.response.data.errno)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5 {
  /* color: #198754 */
  border-radius: 10px;
  width: 65%;
  margin: auto
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card {
  border-radius: 20px;
  background-color: #ffdfa57d;
}

hr {
  border: 2px solid #331c1c;
  border-radius: 20px;
}

.btn-success {
    color: #fff;
    background-color: #d84555;
    border-color: #d84555;
}

.col-sm-3 {
    margin-bottom: 15px;
}
</style>
