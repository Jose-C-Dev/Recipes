<template>
  <div>
    <div class="home" style="padding-left: 25%; padding-right: 25%;">
      <img alt="Logo" src="@/assets/logorecipe.png" width="200" height="200">
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

export default {
  name: 'Home',
  components: {
  }
}
</script>
