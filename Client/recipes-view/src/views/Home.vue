<template>
  <div>
    <div class="home">
      <img alt="Logo" src="@/assets/logorecipe.png" width="300" height="300">
      <HelloWorld msg="RECIPES"/>
    </div>
    <div>
      <form class="d-flex container">
        <input v-model="searchin" class="form-control me-2" type="search" placeholder="Search Ingredients" aria-label="Search">
        <!-- v-on:click.prevent to overide the default behavior of a form button which refreshes the page -->
        <button class="btn btn-outline-danger"><i class="fas fa-utensils"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
