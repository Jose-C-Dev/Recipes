<template>
  <div>
    <div class="home" style="padding-left: 25%; padding-right: 25%;">
      <img alt="Logo" src="@/assets/logorecipe.png" width="200" height="200">
    </div>
    <div class="container">
      <div class="d-flex container">
        <input v-model="searchedName" class="form-control me-2" type="search" placeholder="Search Ingredients" aria-label="Search">
        <button @click="getUserRecipes()" class="btn btn-outline-danger"><i class="fas fa-utensils"></i></button>
      </div>
      <br><br>
      <div class="row" v-if="searchedRecipes.length > 0">
        <SearchRecipesList
          v-for="recipe, index in searchedRecipes"
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

      searchedRecipes: [],

      searchedName: null
    }
  },

  methods: {
    getUserRecipes () {
      this.axios.get('http://localhost:3000/recipes/ingredient/' + this.searchedName
      ).then((response) => {
        this.searchedRecipes = response.data.data
      })
    }
  }
}
</script>
