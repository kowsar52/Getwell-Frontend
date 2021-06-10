<template>
<div>
     <Header :settings="settings"/>
    <Breadcrumb page_title="Dashboard"></Breadcrumb>
  <div class="container">
      <div class="row" bis_skin_checked="1">
            <SideMenu/>

        <div class="col-md-6 col-lg-9 mb-5 mb-lg-0" bis_skin_checked="1">
          <!-- profile section  -->
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6">
                    <div class="card m-b-30">
                        <div class="card-body">
                            <div class="xp-widget-box">
                                <div class="float-left">
                                    <div class="">
                                          <img :src="settings.asset_url+user.avater" alt="user-profile" height="50px" class="kk-round-image"><span class="xp-social-profile-live"></span>
                                      </div>                     
                                </div>
                                <div class="float-left p-2">
                                    <h6 style="line-height: 0.6;">{{user.first_name+' '+user.last_name}} <router-link class="btn btn-primary edit-btn" :to="{path : '/user/profile'}">Edit Profile</router-link></h6>
                                    <p style="line-height: 0;margin-top: 20px !important;" class="mt-1">From <strong>{{user.country}}</strong></p>
                                    <p style="line-height: 0;margin-top: 20px !important;" class="mt-1 text-capitalize"><strong>{{$store.state.userRole}}</strong></p>
                                    <p style="line-height: 0.6;">Member Since {{user.created_at | filterMY}}</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="col-md-6 col-lg-6 col-xl-6 total-item-card">
                    <div class="card m-b-30" style="height:100%">
                        <div class="card-body mt-3">
                           <div class="row">
                              <div class="col-6">
                                  <div class="xp-social-profile-media text-center" style="border-right: 1px solid gainsboro;">
                                      <h5 class="text-black my-1">{{user.total_appointments}}</h5>
                                      <p class="mb-0 text-muted">Total Appointment</p>
                                  </div>
                              </div>
                              <div class="col-6">
                                  <div class="xp-social-profile-followers text-center">
                                      <h5 class="text-black my-1">{{user.today_appointments}}</h5>
                                      <p class="mb-0 text-muted">Today Appointment</p>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
          <!-- profile end  -->

        <h5 class="mt-5 mb-2">Appointment Calender</h5>
        <EventCalender class="mt-2"/>
             </div><!-- end col-md-6 -->
        </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: "Dashboard",
  components: {
    'Breadcrumb': () => import('../include/Breadcrumb.vue'),
    'SideMenu': () => import('../include/SideMenu.vue'),
    'Header': () => import('../layout/Header.vue'),
    'EventCalender': () => import('../include/EventCalender.vue'),
  },
  props:['settings'],
  data() {
    return {
      user : {},
      page_title: 'Latest Appointment',
      searchText : '',
      isLoading: true,
      page: 1,
      pageSize: 10,
      loadMore: true,
      noData: false,
      distance: -Infinity,
      total_appointments: 0,
      today_appointments: 0,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser(){
        axios.get("/get-user").then(
              res => {
                  this.user = res.data;
                  this.total_appointments= this.user.total_appointments;
                  this.today_appointments= this.user.today_appointments;
                  this.previewImage = this.settings.asset_url+this.user.avater;
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
</style>