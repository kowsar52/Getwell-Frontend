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

<div class="page-content" style="    margin-top: 10%;">

<!--login start-->

<section class="register">
  <div class="container">
     <div class="row justify-content-center text-center">
      <div class="col-lg-6 col-md-8">
        <div class="mb-6"> 
            <div v-if="has_success" class="alert alert-success" role="alert">
                {{message}}
            </div>
            <div v-if="has_error" class="alert alert-danger" role="alert">
                {{message}}
            </div>

          <h2 class="mt-3">Confirm Email Address</h2>
          <p class="lead">Verification link has been sent to your {{email}}. Click the link to activate your account. </p>
          <button type="button" class="btn btn-primary btn-rounded btn-lg btn-block submit-btn text-white" @click="resendVerifyAccount()">Resend Confirmation Email</button>
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
// import axios from 'axios'
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import $ from 'jquery'
import axios from 'axios'
import swal from 'sweetalert'

  export default {
    props: ['settings'],
    data() {
      return {
        isLoading: false,
        email:this.$route.params.email,
        has_error: false,
        has_success: false,
        message : '',
        

      }
    },
    components:{
        Loading,
        'Header': () => import('../layout/Header.vue'),
    },
    mounted() {


    },
    created(){
    },
    methods: {
   
        resendVerifyAccount() {

            this.isLoading = true;
            axios.post("/resend-confirmation",{email : this.email}).then(
                   res => {
                    let data = res.data;
                    if (data.errors) {
                        for (var key in data.errors) {
                            this.message = data.errors[key]
                        }
                    }else{
                         swal ( "Good!" , 'Resend Verification Email Successfully!' ,  "success" )
                    }
                    this.isLoading = false;
                    $("button.submit-btn").prop("disabled", false);

                     $("button.submit-btn").html('Resend Confirmation Email');
                },
                error => {
                    console.log(error)
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
