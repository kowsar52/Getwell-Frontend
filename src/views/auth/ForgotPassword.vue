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
  <div class="container">
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
               <form  @submit.prevent="forgotSubmit"  method="post">
                <div class="text-center mb-3">
                    <h2>Forgot your password?</h2>
                     <p>Enter your email to reset your password.</p>
                </div>
            

            <div v-if="has_success" class="alert alert-success" role="alert">
                {{message}}
            </div>
            <div v-if="has_error" class="alert alert-danger" role="alert">
                {{message}}
            </div>

                <div class="form-group">
                    <input type="email" class="form-control" id="email" placeholder="Enter Email Address" v-model="email" required>
                        <div style="color: #ef0d0d;"></div>
                </div>                        
            <button type="submit" class="btn btn-primary btn-rounded btn-lg btn-block submit-btn">Forgot Password</button>
            </form>
              <div class="mt-4 text-center">
               <router-link :to="{ name :'login' }" class="link-title">Back To Sign In</router-link>
          </div>
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
import axios from 'axios'
import Loading from "vue-loading-overlay";
import $ from 'jquery'
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

  export default {
    components:{
          Loading,
          'Header': () => import('../layout/Header.vue'),
      },
    data() {
      return {
        isLoading: false,
        email: '',
        has_error: false,
        has_success: false,
        message : '',
        res : '',
        error : '',
         BASE_URL :  window.location.origin,
      }
    },
    props :['settings'],
    mounted() {
       const loggedIn = localStorage.getItem('user')
      if (loggedIn) {
         this.$router.push({ name: 'dashboard' })
        return
      }

    },
    created(){
     
    },
    methods: {
      forgotSubmit(e) {
            e.preventDefault();
            $("button.submit-btn").prop("disabled", true);
            $("button.submit-btn").html("Sending..");
            $(".error-message").css("display", "none");
          
            this.isLoading = true;
            axios.post("forgot-password", {email : this.email , site_base_url : this.BASE_URL}).then(
                res => {
                    this.res = res
                    this.has_error = false
                    this.has_success = true
                    this.message = "Forgot password successfully ! Check your email account . You will receive forgot password email ASAP . "
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                    $("button.submit-btn").html("Forgot Password");
                },
                error => {
                    this.error = error
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                    $("button.submit-btn").html("Forgot Password");
                        this.has_error = true
                        this.message = "This email address haven't any account"
                }
            );
        },
    }
  }
</script>
<style scoped>
footer{
    position: fixed !important;
    width: 100% !important;
    bottom: 0 !important;
}
</style>