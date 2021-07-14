<template>
  <div>
    <div class="home" style="padding-left: 25%; padding-right: 25%;">
      <img alt="Logo" src="@/assets/logorecipe.png" width="200" height="200">
    </div>
    <div>
      <form class="d-flex container">
        <input v-model="searched_name" class="form-control me-2" type="search" placeholder="Search Ingredients" aria-label="Search">
        <button class="btn btn-outline-danger"><i class="fas fa-utensils"></i></button>
      </form>
      <div class="row" v-if="searched_recipes.length > 0">
        <SearchRecipesList
          v-for="recipe, index in searched_recipes"
          :key="recipe.recipeId"
          :index="index"
          :recipe="recipe"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchRecipesList from '@/components/SearchRecipesList.vue'

export default {
  name: 'Home',

  components: {
    SearchRecipesList
  },

    data () {
    return {

      searched_recipes: [],

      searched_name: null
    }
  },

  methods: {
    getUserRecipes () {
      this.axios.get('http://localhost:3000/recipes/ingredient/' + searched_name
        ).then((response) => {
        this.searched_recipes = response.data.data
      })
    },
    

  },
}
</script>
