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
        <br><br>
        <button @click="approveRecipe()" id="approve" type="button" class="btn btn-success">Approve</button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
// Componente que realiza a criacao das cards das receitas nao aprovadas
export default {
  name: 'NotApprovedList',

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

  data () {
    return {
      body: {
        userId: this.user.userId,
        approval: 1
      }
    }
  },

  methods: {
    // Metodo que envia o request para o backend para aprovar receita
    approveRecipe () {
      const approveBody = {
        userId: this.body.userId,
        approval: this.body.approval
      }

      this.axios.patch('http://localhost:3000/admin/' + this.recipe.recipeId + '/approval', approveBody,
        {
          headers: {
            Authorization: this.token
          }
        }).then((response) => {
        if (response.data.code === 200) {
          swal('Good job!', 'Approved', 'success')
          this.callHandleChange()
        }
      }).catch((error) => {
        if (error.response.data.errno === 1062) {
          swal('Oops', 'Error Approving', 'error')
        }
      })
    },

    callHandleChange () {
      console.log('fui chamado para emitir')
      this.$emit('handle-change')
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
