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
                        <h4 class="text-black">Reset Password !</h4>
                    </div>
                    

                    <div v-if="has_success" class="alert alert-success" role="alert">
                    {{message}}
                </div>
                    <div v-if="has_error" class="alert alert-danger" role="alert">
                    {{message}}
                </div>

                    <div class="form-group">
                        <input type="password" class="form-control"  placeholder="Enter New Password" v-model="password" required>
                            <div style="color: #ef0d0d;"></div>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control"  placeholder="Confirm Password" v-model="confirm_password" required>
                            <div style="color: #ef0d0d;"></div>
                    </div>                       
                    <button type="submit" class="btn btn-primary btn-rounded btn-lg btn-block submit-btn">Reset Password</button>
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
 import $ from 'jquery'
import axios from 'axios'
import Loading from "vue-loading-overlay";
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
        password: null,
        confirm_password: null,
        token:this.$route.params.token,
        has_error: false,
        has_success: false,
        message : null,
         BASE_URL :  window.location.origin,
      }
    },
    props :['settings'],
    mounted() {
    //    const loggedIn = localStorage.getItem('user')
    //   if (loggedIn) {
    //      this.$router.push({ name: 'dashboard' })
    //     return
    //   }

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
            axios.post("update-password", {password : this.password,confirm_password : this.confirm_password , token : this.token}).then(
                res => {
                    console.log(res)
                    this.has_error = false
                    this.has_success = true
                    this.message = "Forgot Reset successfully ! You can sign in now using new password."
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                    $("button.submit-btn").html("Save");
                },
                error => {
                    console.log(error)
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                    $("button.submit-btn").html("Save");
                        this.has_error = true
                        this.message = "Confirm password doesn't match."
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