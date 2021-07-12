<template>
  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <img v-if="recipe.image != null" v-bind:src= 'recipe.image' style="border-radius: 15px;" class="bd-placeholder-img card-img-top">
        <img v-else src="@/assets/no_picture.png" style="border-radius: 15px;" class="bd-placeholder-img card-img-top" alt='No Image'>
        <br><br>
        <h5 class="h5 btn-success">Name:</h5>
        <br>
        <h6 class="card-title">{{ recipe.name }}</h6>
        <hr>
        <h5 class="h5 btn-success">Ingredients:</h5>
        <br>
        <h6 class="card-title"
          v-for="ing, index in recipe.ingredients"
          :key="ing.ingredientId"
          :index="index"
          :ing="ing">{{ ing.name }}</h6>
          <hr>
        <h5 class="h5 btn-success">Steps: </h5>
        <br>
        <h6 class="card-text">{{ recipe.steps }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotApprovedList',

  props: {
    recipe: {
      type: Object,
      required: true
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
