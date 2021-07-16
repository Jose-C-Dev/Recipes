<template>
  <div class="container">
    <main class="form-signin" style="padding-left: 25%; padding-right: 25%;">
      <div>
        <img class="mb-4" src="@/assets/logorecipe.png" alt="" width="200" height="200">
        <h1 class="h3 mb-3 fw-normal" style="color:#198754">Please sign in</h1>

        <div class="form-floating">
          <input v-model="signIn.email" type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" required @keyup.enter="signUser()">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="signIn.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" name="psw" required @keyup.enter="signUser()">
          <label for="floatingPassword">Password</label>
        </div>
        <a v-if="!signIn.email || !signIn.password" style="color:#f05f61">Fill all the fields</a>
        <br><br>
        <button @click="signUser()" class="w-75 btn btn-lg btn-success" type="submit">Sign in</button>
        <br><br>
        <button class="w-75 btn btn-lg btn-success" type="button" data-bs-toggle='modal' data-bs-target='#createUserModal' >Create Account</button>

        <div id="createUserModal" class="modal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div class="container">
                  <span @click="resetCreateUserForm()" data-bs-dismiss="modal" aria-label="Close" class="close" title="Close Modal"><i class="fas fa-times-circle"></i></span>

                  <h1 style="color:#198754">Sign Up</h1>
                  <hr>
                  <label for="name"><b>Name</b></label>
                  <input v-model="createUserForm.name" type="text" placeholder="Enter Name" name="name" required>

                  <label for="email"><b>Email</b></label>
                  <input v-model="createUserForm.email" type="text" placeholder="Enter Email" name="email" required>

                  <label for="psw"><b>Password</b></label>
                  <input v-model="createUserForm.password" type="password" placeholder="Enter Password" name="psw" required>

                  <label for="psw-repeat"><b>Repeat Password</b></label>
                  <input v-model="createUserForm.passwordSame" type="password" placeholder="Repeat Password" name="psw-repeat" required>
                  <div class="clearfix">
                    <button
                    v-if="createUserForm.name
                    && createUserForm.email
                    && createUserForm.password
                    && createUserForm.passwordSame
                    && createUserForm.password === createUserForm.passwordSame"
                    @click="createUser()" id="signup" type="submit" class="signup">Sign Up</button>
                    <a v-else style="color:#f05f61; font-weight: bold;">Fields required or passwords do not match</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
/* import { mapMutations } from 'vuex' */
// Pagina onde se pode realizar o Login ou Criar uma conta de novo user
export default {
  name: 'Login',
  // Data onde guarda os dados inseridos no input do login e nos inputs de criacao de uma conta
  data () {
    return {
      signIn: {
        email: '',
        password: ''
      },

      createUserForm: {
        name: '',
        email: '',
        password: '',
        passwordSame: ''
      }
    }
  },

  methods: {
    // Metodo que envia o request para o backend para obter info do login e guarda(setitem) no user, role, token com o que vem da response do backend
    signUser: function () {
      const signInForm = {
        username: this.signIn.email,
        password: this.signIn.password
      }
      axios.post('http://localhost:3000/login', signInForm).then((response) => {
        if (response.data.user.userId !== null) {
          window.localStorage.setItem('user', JSON.stringify(response.data.user))
          window.localStorage.setItem('role', response.data.user.admin)
          window.localStorage.setItem('token', response.data.token)
          this.resetSignIn()
          swal('Success', 'You Logged In', 'success')
          this.$router.push({ name: 'Home' })
        } else {
          swal('Oops', 'Email or Password are incorrect!', 'error')
        }
      }).catch((error) => {
        swal('Oops', error.response.data, 'error')
      })
    },
    // Metodo que envia o request para o backend para realizar a criacao de uma nova conta
    createUser: function () {
      const userForm = {
        name: this.createUserForm.name,
        email: this.createUserForm.email,
        password: this.createUserForm.password,
        passwordSame: this.createUserForm.passwordSame
      }
      axios.post('http://localhost:3000/createuser/', userForm).then((response) => {
        if (response.data.code === 200) {
          this.resetCreateUserForm()
          swal('Good job!', 'Account Created', 'success')
        }
      }).catch((error) => {
        if (error.response.data.errno === 1062) {
          swal('Oops', 'Email already exists', 'error')
        }
      })
    },
    // Metodo que da wipe a data do form de onde se cria uma receita
    resetCreateUserForm () {
      this.createUserForm = {
        name: null,
        email: null,
        password: null,
        passwordSame: null
      }
    },
    // Metodo que da wipe a data dos inputs de onde se realiza o login
    resetSignIn () {
      this.signIn = {
        email: null,
        password: null
      }
    }

  }
}
</script>

<style>

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

/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for all buttons */
#signup {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  border-radius: 10px;
}

button:hover {
  opacity:1;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* The Modal (background) */

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  width: 100%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
