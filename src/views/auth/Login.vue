<template>
<div>
    <Header :settings="settings"/>
    <!--hero section start-->
<loading
    :active.sync="isLoading"
    :is-full-page="true"
    color="#22dbd7"
    background-color="#000"
    loader="dots"
></loading>

<!--body content start-->

<div class="page-content">

<!--login start-->

<section class="register">
  <div class="container mt-md-10 mb-md-10">
     <div class="row justify-content-center text-center">
      <div class="col-lg-8 col-md-12">
        <div class="mb-6"> <span class="badge badge-primary-soft p-2">
                  <i class="la la-exclamation ic-3x rotation"></i>
              </span>
          <!-- <h2 class="mt-3">Simple And Easy To Sign Up</h2>
          <p class="lead">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p> -->
        </div>
        </div>
        </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 ml-auto mr-auto">
        <div class="register-form text-center">
         <form  @submit.prevent="loginSubmit"  method="post">
                <div class="text-center mb-3">
                    <h4 class="text-black">Sign In !</h4>
                    <p class="text-muted">New to {{settings.site_name}}? <router-link :to="{ name :'register' }">Sign Up</router-link> Here</p>
                </div>
                
                <div v-if="has_success" class="alert alert-success" role="alert">
                    {{message}}
                </div>
                    <div v-if="has_error" class="alert alert-danger" role="alert">
                    {{message}}
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" id="email" placeholder="Email" v-model="email" required>
                    <div class="help-block with-errors email-error"></div>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required>
                    <div class="help-block with-errors passwrord-error"></div>
                </div> 
                    <div class="row mt-5">
                        <div class="col-md-6">
                            <div class="remember-checkbox clearfix mb-5">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" id="customCheck1" class="custom-control-input" value="true" v-model="remember_me">
                                <label class="custom-control-label" for="customCheck1">Remember Me</label>
                            </div>
                            </div> 
                        </div>
                        <div class="col-md-6 text-right">
                            <router-link :to="{ name :'forgot_password' }" >Forgot your password</router-link>
                        </div>
                    </div>
                                        
                <button type="submit" class="btn btn-primary btn-rounded btn-lg btn-block submit-btn text-white">Log In</button>
            </form>

        </div>
      </div>
    </div>
  </div>
</section>

<!--login end-->

</div>

<!--body content end--> 


</div>


</template>
<script>

import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";


  export default {
    data() {
      return {
        isLoading: false,
        successModal: false,
        email: '',
        remember_me: '',
        password: '',
        has_error: false,
        has_success: false,
        message : '',
      }
    },
    components:{
        Loading,
        'Header': () => import('../layout/Header.vue'),
    },
    props : ['settings'],
    mounted() {
       const loggedIn = localStorage.getItem('user')
      if (loggedIn) {
         this.$router.push({ name: 'dashboard' })
        return
      }

    },
    created(){
        // console.log(this.$root)
    },
    methods: {
        loginSubmit() {
        let email = this.email
        let password = this.password
        let remember_me = this.remember_me
     
        this.$store.dispatch('login', { email, password,remember_me })
       .then(res => {
           console.log(res)
                this.has_error = false
                this.has_success = true
                this.message = "Login Successfull. You are being redirecting.."
                if(localStorage.getItem('redirect')){
                    this.$router.push({ path: localStorage.getItem('redirect') })
                    localStorage.removeItem('redirect')
                }else{
                    this.$router.push({ name: 'dashboard' })

                }
       })
       .catch(err => {
          
           var error = err.response.data
               this.has_error = true
                this.message = error.message
       })

      }
    }
  }
</script>
<style >
    .success-modal.v-card {
        padding: 20px;
        text-align: center !important;
    }
    .success-modal.v-card p{
           color: #757575;
    }
    .success-modal.v-card h5{
            font-size: 24px;
            padding: 5px;
            color: #464646;
    }
    .register-form{
            background: #f9f9f9;
        padding: 25px;
        border-radius: 10px;
    }
    .v-application--wrap {
        min-height: 80vh !important;
    }
    .remember-checkbox{
        text-align: left;
    }
</style>