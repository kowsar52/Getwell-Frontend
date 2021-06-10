<template>
<div>
<loading
    :active.sync="isLoading"
    :is-full-page="true"
    color="#28b97b"
    background-color="#fff"
    loader="dots"
></loading>

     <Header :settings="settings"/>
    <Breadcrumb page_title="Booking Appointment"></Breadcrumb>
  <div class="container">
      <div class="row" bis_skin_checked="1">
        <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
            <div class="card p-5">
                <h5>Doctor Information</h5>
                <img class="user-image-d" :src="settings.asset_url+doctor.avater" alt="">
                <ul class="cases-meta list-unstyled text-muted">
                    <li class="mb-3"><span class="text-dark"> Name: </span> {{doctor.first_name+' '+doctor.last_name}}</li>
                    <li class="mb-3"><span class="text-dark"> City: </span> {{doctor.city}}</li>
                    <li class="mb-3"><span class="text-dark"> Expertise: </span> {{doctor.expertise}}</li>
                    <li class="mb-3"><span class="text-dark"> Member Since: </span> {{doctor.created_at}}</li>
                    <li>
                      <span v-if="doctor.phone_verified_at" >Phone: {{doctor.phone}} <span class="badge badge-success">Phone Verified </span></span>
                      <span v-else class="badge badge-danger">Phone Unverified</span>
                    </li>
                </ul>

            </div>
        </div>

        <div class="col-md-6 col-lg-8 mb-5 mb-lg-0" bis_skin_checked="1">

            <!-- latest order section  -->
            <div class="mb-5 ">
                <form>

                  <div class="card">
                      <div class="card-body">
                          <label for="">Date:</label>
                           <input type="text" class="form-control" v-model="form_data.date" readonly>

                    <div class="row mt-5 mb-5">
                        <div class="col-12">
                            <label>Time:</label>
                        </div>
                        <div v-for="(time,i) in times" :key="i" class="col-md-3">
                            <label :class="`btn btn-outline-primary kk-check-btn ${'active_'+i}`" @click="selectTime(i)" style="width: 100%">
                                <input type="radio" name="time" :value="time" v-model="form_data.time" class="d-none">
                                <span>{{time}}</span>
                            </label>
                        </div>
                    </div>
                 <hr>
                          <button type="button" class="btn btn-primary submit-btn mb-1" @click="submitForm()">Submit</button>
                        <router-link class="btn btn-secondary ml-3 mb-1" :to="{path : '/user/appointment-time'}">Cancel</router-link>
                      </div>
                  </div>

                  </form>
                </div>
            <!-- create section end -->
                </div><!-- end col-md-6 -->
              </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)
import $ from 'jquery'
import swal from 'sweetalert'

export default {
  name: "AppointmentTime",
  components: {
    'Breadcrumb': () => import('../include/Breadcrumb.vue'),
    // 'SideMenu': () => import('../include/SideMenu.vue'),
    'Header': () => import('../layout/Header.vue'),
  },
  props:['settings'],
  data() {
    return {
      user : {},
      page_title: 'Create Appointment',
      isLoading: true,
      form_data:{
        date : null,
        time : null,
      },
      appointment:{},
      times:[],
      doctor:{},
    }
  },
  created() {
    if(this.$route.params.id){
      this.getAppointment(this.$route.params.id)
    }
  },
  methods: {
    selectTime(i){
        $('.kk-check-btn').removeClass('active')
        $('.active_'+i).addClass('active')
    },
    getAppointment(id){
          axios.get("/user/get-appointment/"+id)
        .then((res) => {
              this.form_data.time = res.data.times
              this.form_data.date = res.data.appointment.date
              this.doctor = res.data.doctor
              this.times = res.data.times
        });
    },
    submitForm(){
        $("button.submit-btn").prop("disabled", true);
        $("button.submit-btn").html("Sending");

       if(this.$route.params.id){
            this.form_data.id =this.$route.params.id
        }
      console.log( this.form_data)
        axios.post("/user/appointment-booking", this.form_data).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.errors) {
                  for (var key in data.errors) {
                    swal("Oops!", data.errors[key][0], "error");
                    }
                    
                }else{
                  swal('Good!','Created Successfully','success')
                   this.$router.push({ path: '/user/my-booking' })
                }
                this.isLoading = false;
                $("button.submit-btn").prop("disabled", false);
                $("button.submit-btn").html("Submit");
            },
            error => {
                console.log(error)
            }
        );
    },
  },
  filters:{
    
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
    background: #28b97b;
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
    background: #f4f3f5;
    border: 1px solid #f4f3f5;
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
    border: 1px solid #28b97b;
    padding: 5px 10px !important;
    background: #28b97b;
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
.checkuncheck{
        right: 20px;
    text-align: right;
    position: absolute;
}
.user-image-d{
    height: 200px;
    object-fit: contain;
    margin-bottom: 14px;
    border: 1px solid whitesmoke;
}
</style>