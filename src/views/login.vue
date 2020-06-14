<template>
  <div class="page-wrapper page-wrapper--auth">
   <div class="col-xs-12 col-sm-8 col-md-5">
    <div class="panel panel--logo panel--center-item">
         <a class="logo panel__logo">
          <svg class="logo__image" version="1.1" width="35px" heigth="auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 426.104 426.104" style="enable-background:new 0 0 426.104 426.104;" xml:space="preserve">
            <g>
              <path d="M58.481,292.104L18.217,345.99c-6.225,8.358-9.909,18.718-9.909,29.94c0,27.71,22.463,50.173,50.173,50.173
		c27.71,0,50.173-22.463,50.173-50.173c0-11.222-3.684-21.583-9.909-29.94L58.481,292.104z" />
              <rect x="367.796" y="105" width="50" height="91.404" />
              <path d="M12.779,199.327v62.777h91.404v-62.777c0-1.612,1.311-2.923,2.923-2.923h85.049V105h-85.049
		C55.093,105,12.779,147.314,12.779,199.327z" />
              <polygon points="202.155,30 264.976,30 264.976,85 222.155,85 222.155,216.404 337.796,216.404 337.796,85 294.976,85 294.976,30 
		357.796,30 357.796,0 202.155,0 	" />
            </g>
          </svg>
          <h1 class="logo__title">жкх</h1>
        </a>
      <form class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model='email' id="email" name="email" type="email" :class="[{'is-invalid': $v.email.$error}, 'form-control']" placeholder="Email" @input="$v.email.$touch()">
          <small class="form-text text-muted">(Пример: example@mail.ru)</small>
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input v-model='password' id="password" name="password" type="password" placeholder="Пароль" :class="[{'is-invalid': $v.password.$error}, 'form-control']" @input="$v.password.$touch()">
        </div>
        <div v-if="showAlert()" class="alert alert-danger">
          <div v-if="$v.email.$error">Введите корректный email</div>
          <div v-if="$v.password.$error">Некорректный пароль (минимум {{$v.password.$params.minLength.min}} символов)</div>
          <div v-if="submitStatus">{{submitStatus}}</div>
        </div>
        <div class="row m-0 mb-3 justify-content-between align-items-center">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="remember-me">
            <label class="form-check-label" for="remember-me">Запомни меня</label>
          </div>
          <a href="#">Forgot password?</a>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary btn-block" @click.prevent="onSubmit" :disabled="loading">Авторизация
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <p class="no-account">Still no account? Please go to
            <router-link tag="a" to="/registration">Sign up</router-link>
          </p>
        </div>
      </form>
    </div></div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import {
    required,
    email,
    minLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: '',
        password: '',
        submitStatus: null
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      onSubmit() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          const user = {
            email: this.email,
            password: this.password
          }        
          this.$store.dispatch('loginUser', user)
          .then(() => {
               this.$router.push('/profile')
             }).catch((error) => {
               this.submitStatus = this.error
             })
        }
      },      
      showAlert() {
        return this.$v.email.$error || this.$v.password.$error || this.submitStatus
      }
    },
    computed: {
      loading (){
        return this.$store.getters.loading
      },
       error(){
         return this.$store.getters.error
       }
    },
    created() {     
       this.$store.dispatch('logoutUser')
      
    }
  }
</script>


<style lang="scss">
  .no-account{
    margin: 0;
    font-size: 14px;    
  }
</style>