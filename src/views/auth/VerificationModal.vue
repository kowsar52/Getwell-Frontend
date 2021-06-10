<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container w-md-50 w-sm-99">

        <div class="modal-header">
          <slot name="header">
           <h5 class="modal-title" id="exampleModalLabel">Enter Your Verification Code</h5>
          <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          </slot>
        </div>

    <form
      class="msger-inputarea messageForm"
      @submit.prevent="verify"
    >
        <div class="modal-body">
            <div class="input-group mb-3">
             <input class="form-control" placeholder="Enter Verification Code" v-model="otp" type="text">
              <div class="input-group-append">
                <a href="javascript:;"  @click="resendCode" style="padding: 10px">Resend</a>
              </div>
              <div :class="`help-block with-errors phone-error`"></div>
            </div>

                
        </div>
        <div class="modal-footer">
            <div :class="`text-right`">
                <button type="button" class="btn btn-outline-secondary mr-2" data-dismiss="modal"  @click="$emit('close')">Cancel</button>
                <button type="submit" class="btn btn-primary submit-btn2"><i></i> Verify</button>
            </div>
        </div>
      </form>

      </div>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import swal from 'sweetalert'

  export default {
    name: 'VerificationModal',
    components :{},
    props : ['phone'],
    data() {
        return {
           otp: null,
        }
    },
    created() {
       
    },
    methods: {
      close() {
        this.$emit('close');
      },
        verify(){
            $("button.submit-btn2").prop("disabled", true);
            $("button.submit-btn2").html("Sending");
                
            this.isLoading = true;
    
            axios.post("/user/phone-verification/verify",{ otp : this.otp, phone :  this.phone}).then(
                res => {
                    let data = res.data;
                    $(".with-errors").html('');
                    if (data.status == 'error' || data.status == "error" ) {
                        swal("Opps!", data.message , "error");

                    }else{
                        this.$emit('close');
                        swal("Good!", data.message, "success");
                        this.$parent.user = data.user
                    }
                    this.isLoading = false;
                    $("button.submit-btn2").prop("disabled", false);
                    $("button.submit-btn2").html("Verify");
                },
                error => {
                    console.log(error)
                }
            );

        },
        resendCode(){
        $("button.verify-btn").prop("disabled", true);
        $("button.verify-btn").html("re-sending..");
        this.otp = null
        this.isLoading = true;
  
        axios.post("/user/phone-verification/send",{phone :  this.phone}).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.status == 'error' || data.status == "error" ) {
                      swal("Opps!", data.message , "error");
                }else{
                     swal("Good!", 'Verification Code Resend Successfully!', "success");
                }
                this.isLoading = false;
                $("button.verify-btn").prop("disabled", false);
                $("button.verify-btn").html("Verify");
            },
            error => {
                console.log(error)
            }
        );

    },

    },
    filters:{
 
    }
 
 
  };
</script>
<style scoped>
.w-md-50{
  width: 50%;
} 
@media only screen and (max-width: 600px){
  .w-sm-99{
  width: 96%;
  }
}
</style>
