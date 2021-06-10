<template>
<div>
   <Header :settings="settings"/>
    <Breadcrumb page_title="Profile"></Breadcrumb>
  <div class="container">
      <div class="row" bis_skin_checked="1">

          <SideMenu/>

        <div class="col-md-6 col-lg-9 mb-5 mb-lg-0 kk-card" bis_skin_checked="1">
          <form class="mt-3 mb-3" id="formEditPage" accept-charset="UTF-8" enctype="multipart/form-data">
          <div class="row form-group mb-0" bis_skin_checked="1">
            <div class="col-md-6" bis_skin_checked="1">
                <label>First name</label>
                <div class="input-group mb-4" bis_skin_checked="1">
                <div class="input-group-prepend" bis_skin_checked="1">
                <span class="input-group-text"><i class="la la-user"></i></span>
                </div>
                    <input class="form-control" v-model="user.first_name" required="" placeholder="first name" type="text">
                    <div :class="`help-block with-errors first_name-error`"></div>
                </div>
              </div><!-- ./col-md-6 -->
            <div class="col-md-6" bis_skin_checked="1">
                <label>Last name</label>
                <div class="input-group mb-4" bis_skin_checked="1">
                <div class="input-group-prepend" bis_skin_checked="1">
                <span class="input-group-text"><i class="la la-user"></i></span>
                </div>
                    <input class="form-control" v-model="user.last_name" required="" placeholder="last name" type="text">
                    <div :class="`help-block with-errors last_name-error`"></div>
                </div>
              </div><!-- ./col-md-6 -->

            </div><!-- End Row Form Group -->

          <div class="form-group" bis_skin_checked="1">
              <label>Email</label>
                <input class="form-control" placeholder="Email" disabled="" :value="user.email" type="text">
                <div :class="`help-block with-errors email-error`"></div>
            </div><!-- End form-group -->
          <div class="form-group" bis_skin_checked="1">
              <label>Username</label>
                <input class="form-control" placeholder="Username"  v-model="user.username" type="text">
                <div :class="`help-block with-errors username-error`"></div>
            </div><!-- End form-group -->

            <label>Phone <small class="text-info">(Ex: +15853322279)</small></label>
            <div v-if="user.phone_verified_at" class="input-group mb-3">
             <input class="form-control" placeholder="Phone" :value="user.phone" type="text" readonly>
              <div class="input-group-append">
                <button type="button" class="btn btn-primary verify-btn" >Verified</button>
              </div>
            </div>
            <div v-else class="input-group mb-3">
             <input class="form-control" placeholder="Phone" v-model="user.phone" type="text">
              <div class="input-group-append">
                <button type="button" class="btn btn-warning verify-btn" @click="sendVerificationCode">Verify</button>
              </div>
              <div :class="`help-block with-errors phone-error`"></div>
            </div>

  

          <div v-if="user.role == 2" class="form-group" bis_skin_checked="1">
              <label>Expertise</label>
              <select v-model="user.expertise_id" class="form-control custom-select">
                 <option v-for="(expertise,i) in expertises" :key="i" :value="expertise.id">{{expertise.expertise}}</option>
                </select>
                <div :class="`help-block with-errors phone-error`"></div>
            </div><!-- End form-group -->
          <div class="form-group" bis_skin_checked="1">
              <label>Address</label>
                <input class="form-control" placeholder="address" v-model="user.address" type="text">
                <div :class="`help-block with-errors address-error`"></div>
            </div><!-- End form-group -->
          <div class="form-group" bis_skin_checked="1">
              <label>Avater</label>
                <input id="imageUpload" class="form-control" placeholder="image" accept="image/*" @change="uploadImage" type="file">
                <label for="imageUpload" style="width: 100%"><img :src="previewImage" class="image-preview" /></label>
                <div :class="`help-block with-errors avater-error`"></div>
            </div><!-- End form-group -->

              <div class="row form-group mb-0" bis_skin_checked="1">
                  <div class="col-md-6" bis_skin_checked="1">
                      <div class="input-group" bis_skin_checked="1">
                        <div class="input-group-prepend" bis_skin_checked="1">
                          <span class="input-group-text"><i class="la la-calendar-alt"></i></span>
                        </div>
                        <input class="form-control" v-model="user.birth_date" placeholder="Birthdate" value="" autocomplete="off" type="date">
                        <div :class="`help-block with-errors birth_date-error`"></div>
                      </div>
                      <!-- <small class="form-text text-muted mb-4">Valid formats: <strong>01/31/2000</strong> or <strong>31-01-2000</strong></small> -->
                    </div><!-- ./col-md-6 -->

                    <div class="col-md-6" bis_skin_checked="1">
                      <div class="input-group mb-4" bis_skin_checked="1">
                      <div class="input-group-prepend" bis_skin_checked="1">
                        <span class="input-group-text"><i class="la la-venus-mars"></i></span>
                      </div>
                       <select v-model="user.gender" class="form-control custom-select">
                          <option selected="selected" value="">(Gender) Not specified</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <div :class="`help-block with-errors gender-error`"></div>
                        </div>
                      </div><!-- ./col-md-6 -->
                    </div><!-- End Row Form Group -->


                    <div class="form-group" bis_skin_checked="1">
                        <label class="w-100"><i class="la la-bullhorn text-muted"></i> Tell us about you</label>
                        <textarea v-model="user.short_about" required="" rows="5" cols="40" class="form-control textareaAutoSize scrollError" style="overflow: hidden; overflow-wrap: break-word; height: 142px;"></textarea>
                    </div><!-- End Form Group -->
                

                    <button class="btn btn-1 btn-primary submit-btn btn-block"   type="button" @click="submitForm()"><i></i> Save changes</button>

                                    <div class="text-center mt-3" bis_skin_checked="1">
                <a class="btn btn-danger" href="javascript:;" @click="deleteAccount">Delete account</a>
                </div>
                                      </form>
                </div><!-- end col-md-6 -->
              </div>
  </div>
  <VerificationModal v-if="verificationModal"  @close="verificationModal = false" :phone="user.phone"/>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert'
import moment from 'moment'
import $ from 'jquery'
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)

export default {
  name: "Profile",
  components: {
    'Breadcrumb': () => import('../include/Breadcrumb.vue'),
    'SideMenu': () => import('../include/SideMenu.vue'),
    'Header': () => import('../layout/Header.vue'),
    'VerificationModal': () => import('../auth/VerificationModal.vue'),
  },
  props:['settings'],
  data() {
    return {
      user : {},
      expertises : {},
      previewImage: null,
      verificationModal : false,
    }
  },
  created() {
    this.getUser();
    this.getExpertise();
  },
  methods: {
    getUser(){
        axios.get("/get-user").then(
              res => {
                  this.user= res.data;
                  this.previewImage = this.settings.asset_url+this.user.avater
              },
              error => {
                  console.log(error)
              }
        );
    },
    getExpertise(){
        axios.get("/get-expertises").then(
              res => {
                  this.expertises= res.data;
              },
              error => {
                  console.log(error)
              }
        );
    },
    deleteAccount(){
        swal({
            title: "Are you sure?",
            text: "Confirm that you want to delete this account.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.get("/user/account/delete").then(res => {
                    if(res.data.success){
                        swal(res.data.message, {
                            icon: "success",
                        });
                       this.$store.dispatch('logout')
                      .then(function(){
                        this.$router.push({ name: 'login' })
                      })
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });

        
            } else {
                swal("Your account is safe!");
            }
        });
    },
    uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                   this.user.new_avater = e.target.result;
                };
            },

     submitForm(){
        $("button.submit-btn").prop("disabled", true);
        $("button.submit-btn").html("Sending");
            
        this.isLoading = true;
  
        axios.post("/user/update-profile", this.user).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.errors) {
                    for (var key in data.errors) {
                        $("." + key + "-error").html(data.errors[key]);

                      $("." + key + "-error").css("display", "block");
                    }
                }else{
                 this.$router.reload
                    swal("Good job!", "Profile updated successfully!", "success");

                }
                this.isLoading = false;
                $("button.submit-btn").prop("disabled", false);
                $("button.submit-btn").html("Save changes");
            },
            error => {
                console.log(error)
            }
        );

    },

     sendVerificationCode(){
        $("button.verify-btn").prop("disabled", true);
        $("button.verify-btn").html("Sending");
            
        this.isLoading = true;
  
        axios.post("/user/phone-verification/send", this.user).then(
            res => {
                let data = res.data;
                console.log(data)
                  $(".with-errors").html('');
                if (data.status == 'error' || data.status == "error" ) {
                      swal("Oops!", data.message , "error");

                }else{
                   this.verificationModal = true

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
    filterMY : function (value) {
          const date = new Date(value)
          return moment(date).format('MMMM YYYY');
    },
      formatStatus: function (value) {
        if (!value) return ''
        if(value == 1){
            return 'Active'
        }else if(value == 2){
            return 'Draft'
        }else{
            return 'Closed'
        }
    },
     diffDay: function (value) {
          const deadline = new Date(value)
          return moment(deadline, "YYYYMMDDHHIISS").fromNow();
      }
  }
}
</script>

<style>
.kk-round-image{
      height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 50px;
}
.kk-card{
   border-radius: 0;
    border: 1px dashed #28b97b;
    background: #f4f3f5;
}
.kk-card .card-header{
    border: none;
    background: #a36846;
    color: #fff;
    font-weight: 700;
        border-radius: 0;
}
.kk-card .card-body{
   
    height: 700px;
    overflow: auto;

}
.kk-card .search{
     position: absolute;
    right: 5px;
    width: 180px;
    height: 35px;
    top: 5px;
    background: #ebf8ffc4;
    border: 1px solid #c3b7b0;
    border-radius: 50px;
}
.text-small{
    font-weight: 400;
    font-size: 12px;
    color: #6d6d6d;
}

.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading {
    background: #e1e8ec !important;
}
.order-menu{
    border: 1px solid #a36846;
    padding: 5px 10px !important;
    background: #a36846;
    color: white;
}
.edit-btn{
  text-align: right;
    padding: 5px 10px;
    right: 10px;
    top: 19px;
    position: absolute;
    font-size: 12px;
}
@media screen and (max-width: 767px) {
  .total-item-card {margin-top:10px;}
}
.help-block{
    right: 0 !important;
    bottom: -15px !important;
}
.image-preview{
      margin: 10px 0px;
    height: 70px;
    text-align: center;
    width: 100%;
    object-fit: contain;
    border: 1px dashed #cccccc;
    cursor: pointer;
}
</style>