<template>
 
    <section>
  <div class="container">
    <div class="row align-items-end">
      <div class="col-lg-8">
          <form class="row" >
            <div class="messages"></div>
            <div class="form-group col-md-6">
              <input id="form_name" type="text" v-model="first_name" class="form-control" placeholder="First Name" required="required" data-error="Name is required.">
              <div class="help-block with-errors first_name-error"></div>
            </div>
            <div class="form-group col-md-6">
              <input id="form_name1" type="text" v-model="last_name" class="form-control" placeholder="Last Name" required="required" data-error="Name is required.">
              <div class="help-block with-errors last_name-error"></div>
            </div>
            <div class="form-group col-md-12">
              <input id="form_email" type="email" v-model="email" class="form-control" placeholder="Email" required="required" data-error="Valid email is required.">
              <div class="help-block with-errors email-error"></div>
            </div>
            <div class="form-group col-md-12">
              <input id="form_phone" type="tel" v-model="mobile" class="form-control" placeholder="Phone" required="required" data-error="Phone is required">
              <div class="help-block with-errors  mobile-error"></div>
            </div>
            <div class="form-group col-md-12">
              <textarea id="form_message" v-model="message" class="form-control" placeholder="Message" rows="4" required="required" data-error="Please,leave us a message."></textarea>
              <div class="help-block with-errors  message-error"></div>
            </div>
            <div class="col-md-12 mt-4">
              <button type="button" class="btn btn-primary submit-btn" @click="submitContactForm"><span>Send Messages</span>
              </button>
            </div>
          </form>
    </div>
    <div class="col-lg-4">
      <div class="mb-5">
          <svg class="feather feather-map-pin" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#28b97b" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <h4 class="mt-3">Address:</h4>
            <span class="text-black">{{settings.contact_address}}</span>
        </div>
        <div class="mb-5">
          <svg class="feather feather-mail" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#28b97b" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <h4 class="mt-3">Email Us</h4>
         <a :href="`mailto:${settings.contact_email}`"> {{settings.contact_email}}</a>
        </div>
        <div>
          <svg class="feather feather-phone-call" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#28b97b" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <h4 class="mt-3">Phone Number</h4>
          <a :href="`tel:${settings.contact_phone}`"> {{settings.contact_phone}}</a>
        </div>
    </div>
    </div>
    
  </div>
</section>
</template>
<script>

import axios from 'axios'
import $ from 'jquery'
import swal from 'sweetalert'
  export default {
    name: 'Pages',
   components: { 
   },
   props : ['settings'],
    data() {
      return {
          first_name: '',
          last_name: '',
          email: '',
          mobile: '',
          message: '',
      }
    },
    methods: {
    submitContactForm() {
        $("button.submit-btn").prop("disabled", true);
        $("button.submit-btn").html("Sending");

       let  form_data = {
            first_name : this.first_name,
            last_name : this.last_name,
            email : this.email,
            mobile : this.mobile,
            message : this.message,
       };
        axios.post("/contact-submit", form_data).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.errors) {
                  for (var key in data.errors) {
                    swal("Oops!", data.errors[key][0], "error");
                    }
                    
                }else{
                     this.first_name =  ''
                    this.last_name =  ''
                    this.email =  ''
                    this.mobile =  ''
                    this.message = ''
                  swal('Good!','Contact Message Successfully','success')
                  
                }
                this.isLoading = false;
                $("button.submit-btn").prop("disabled", false);
                $("button.submit-btn").html("Send Message");
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

</style>