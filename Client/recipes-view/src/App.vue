<template>
  <div id="app">
    <div id="nav">
      <a style="float: left">
      <router-link class="btn btn-danger" to="/">Recipes</router-link> &nbsp;
      <router-link class="btn btn-danger" to="/account">Account</router-link>
      </a>
      <router-link class="btn btn-danger" to="/login" style="float: right">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  background-color: #198754;
  color: white;
  box-shadow: 0 0 0 0.25rem rgb(25 135 84);
  border-color: #198754;
}
</style>
