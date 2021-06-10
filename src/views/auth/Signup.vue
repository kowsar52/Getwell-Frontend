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
  <div class="container mt-md-5 mb-md-10">
     <div class="row justify-content-center text-center">
      <div class="col-lg-8 col-md-12">
        <div class="mb-6"> <span class="badge badge-primary-soft p-2">
                  <i class="la la-exclamation ic-3x rotation"></i>
              </span>
          <h2 class="mt-3">Simple And Easy To Sign Up</h2>
          <p class="lead">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        </div>
        </div>
        </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 ml-auto mr-auto">
        <div class="register-form text-center">
            <form  @submit.prevent="signupSubmit"  method="post">
                <div class="text-center mb-3">
                    <h4 class="text-black">Create New Account</h4>
                    <p class="text-muted">Already have an account? <router-link :to="{ name :'login' }">Log in</router-link> Here</p>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group has-error has-danger">
                            <input id="first_name" type="text" v-model="first_name" class="form-control" placeholder="First name" required="required" data-error="Firstname is required.">
                            <div class="help-block with-errors first_name-error"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input id="form_lastname" type="text" v-model="last_name" class="form-control" placeholder="Last name" required="required" data-error="Lastname is required.">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
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
                    <div class="col-md-12">
                        <div class="remember-checkbox clearfix mb-5">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1" required>
                            <label class="custom-control-label" for="customCheck1">I agree to the 
                                <router-link :to="{path : '/terms-conditions'}"> term of use and privacy policy</router-link></label>
                        </div>
                        </div> 
                    </div>
                    </div>
                                        
                <button type="submit" class="btn btn-primary btn-rounded btn-lg btn-block submit-btn text-white">Create an Account</button>
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
import axios from 'axios'
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
 import $ from 'jquery'

  export default {
    data() {
      return {
        isLoading: false,
        successModal: false,
        email: '',
        name: '',
        type: 'writer',
        first_name: '',
        last_name: '',
        password: '',
        has_error: false,
        has_success: false,
        message : '',
         BASE_URL : window.location.origin,
         
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
    },
    methods: {
      signupSubmit(e) {
            e.preventDefault();
            $("button.submit-btn").prop("disabled", true);
            $("button.submit-btn").html("Sending..");
            $(".error-message").css("display", "none");

            var formData = new FormData();
            formData.append("first_name",this.first_name);
            formData.append("last_name",this.last_name);
            formData.append("email",this.email);
            formData.append("password",this.password);
            formData.append("role",1); //1 = patient
            var moment = require('moment-timezone');
            formData.append("timezone",moment.tz.guess());

          
            this.isLoading = true;
            axios.post("register", formData).then(
                res => {
                    let data = res.data;
                    if (data.errors) {
                        for (var key in data.errors) {
                            $("." + key + "-error").html(data.errors[key]);

                           $("." + key + "-error").css("display", "block");
                        }
                    }else{
                      this.$router.push({ name: 'confirm_account', params: { email: this.email } })
                    }
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                    $("button.submit-btn").html("Save");
                },
                error => {
                    console.log(error)
                }
            );
        },
    }
  }
</script>
<style >
input[type="radio"]:checked, input[type="radio"]:not(:checked) {
    position: absolute;
    opacity: 1;
    pointer-events: none;
}
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
</style>