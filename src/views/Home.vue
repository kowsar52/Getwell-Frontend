<template>
  <div>
  <Header :settings="settings"/>

<!--hero section start-->

<section style="    background: #f1f1f1;
    padding-bottom: 0px !important;">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12 col-lg-5 col-xl-6 order-lg-2 mb-8 mb-lg-0">
        <!-- Image -->
        <img src="https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png" class="img-fluid" alt="...">
      </div>
      <div class="col-12 col-lg-7 col-xl-6 order-lg-1">
        <!-- Heading -->
        <h1 class="display-4 mt-3">
               Create an account & <span class="text-primary font-w-5">Book</span> your appointment               
            </h1>
        <!-- Text -->
        <p class="lead text-muted">Booking an appointment has never been so easy. Try it out today.</p>
        <!-- Buttons --> <a href="#" class="btn btn-primary shadow mr-1">
                Book Now
              </a>
      </div>
    </div>
    <!-- / .row -->
  </div>
  <!-- / .container -->
</section>

  <!--hero section end--> 


  <!--body content start-->

  <div class="page-content mt-5">
    <div class="container">
      <div class="row justify-content-center text-center">
      <div class="col-12 col-md-12 col-lg-8 mb-8 mb-lg-0">
        <div class="mb-8"> <span class="badge badge-primary-soft p-2 font-w-6">
                  Find Doctors
              </span>
          <h2 class="mt-3 font-w-5">Find Doctors</h2>
          <p class="lead mb-0" style="font-size: 14px">Find Docortor, booking an appointment has never been so easy. Try it out today.</p>
        </div>
      </div>
    </div>

      <div class="row">
         <div class="col-12 mb-5 mb-lg-0" bis_skin_checked="1">
              <!-- profile section  -->
              <div class="row">
                  <div class="col-md-12 total-item-card">
                      <div class="card m-b-30" style="height:100%">
                          <div class="card-body">
                              <form>
                                  <div class="form-row">
                                      <div class="col">
                                          <label for="">Choose Expertise :</label>
                                            <vue-select 
                                              v-model="filterExpertise" 
                                              required 
                                              :options="expertises" 
                                              :reduce="data => data.id" 
                                              label="expertise" 
                                              @input="filterMethod()"
                                              placeholder="Select Expertise">
                                            </vue-select>
                                      </div>
                                      <div class="col">
                                          <label for="">Choose Location:</label>
                                          <vue-select 
                                              v-model="filterCity" 
                                              required 
                                              :options="cities" 
                                              :reduce="city => city.id" 
                                              label="name" 
                                              @input="filterMethod()"
                                              placeholder="Select Location">
                                            </vue-select>
                                      </div>
                                      <div class="col">
                                          <label for="">Choose Date:</label>
                                          <input type="date" class="form-control" v-model="filterDate" placeholder="" @change="filterMethod()">
                                      </div>
                                  </div>
                                  </form>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- profile end  -->

              <!-- latest order section  -->
              <div class="table-responsive" style="    min-height: 200px;">
                <table  class="table table-bordered mt-5 mb-5"> 
                  <thead>
                      <th scope="col">#</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Name</th>
                      <th scope="col">Expertise</th>
                      <th scope="col">City</th>
                      <th scope="col">Available Date</th>
                      <th scope="col">Booking</th>
                  </thead>
                  <tbody :if="doctors.length > 0">
                      <tr v-for="(doctor, index) in doctors" :key="index" >
                          <td>{{index+1}}</td>
                          <td>
                              <img class="user-image" :src="settings.asset_url+doctor.avater" alt="">
                          </td>
                          <td>
                              <span class="">{{doctor.first_name+' '+doctor.last_name}}</span>
                          </td>
                          <td>
                              {{doctor.expertise}}
                          </td>
                          <td>
                              {{doctor.city}}
                          </td>
                          <td>
                              {{doctor.appointment_date}}
                          </td>
                          <td>
                              <router-link class="btn btn-success" :to="{ path: '/user/book-appoinment/'+doctor.appointment_id}">Book Appoinment</router-link>
                          </td>
                      </tr>
                      <tr>
                          <infinite-loading v-if="loadMore" @infinite="handleLoadMore" ref="infiniteLoading"  spinner="waveDots">
                              <span slot="no-more">
                              There is no more doctors :(
                              </span>
                          </infinite-loading>
                          <div v-if="noData" class="no-data-div" style="position: absolute;width: 95%;text-align: center; padding-top: 20px;">
                              <h6 >No doctors found!</h6>
                          </div>

                      </tr>

                  </tbody>
              </table>
              </div>
              <!-- latest order section end -->
            </div><!-- end col-md-6 -->
      </div>
    </div>
  </div>

  <!--body content end--> 
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import $ from 'jquery'
// import moment from 'moment'
import "vue-loading-overlay/dist/vue-loading.css"
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)

export default {
  components: { 
      'Header': () => import('./layout/Header.vue'),
   },
  props:['settings'],
  data () {
    return {
      doctors: [],
      filterExpertise: 'all',
      filterDate : 'all',
      filterCity : 'all',
      expertises:[],
      cities:[],
      isLoading: true,
      page: 1,
      pageSize: 10,
      loadMore: true,
      noData: false,
      distance: -Infinity,
    }
  },
  created() {
    this.getExpertises()
    this.getCities()
  },
  methods: {
    getExpertises(){
         axios.get("/get-expertises").then(
              res => {
                  this.expertises = res.data;
              },
              error => {
                  console.log(error)
              }
          );
    },
    getCities(){
         axios.get("/get-cities").then(
              res => {
                  this.cities = res.data;
              },
              error => {
                  console.log(error)
              }
          );
    },
    handleLoadMore($state) {
      if(this.loadMore){
         var moment = require('moment-timezone');
        var tz = moment.tz.guess();
           this.noData = false
          axios.get("/get-doctors", {
                  params: {
                      page: this.page,
                      per_page: this.pageSize,
                      filterDate: this.filterDate,
                      filterCity: this.filterCity,
                      filterExpertise: this.filterExpertise,
                      timezone: tz,
                  }
              })
              .then((res) => {
                   let response = res.data.data.data
                if (res.data.data.data && response.length > 0) {
                    this.page += 1;
                    this.doctors = this.doctors.concat(response);
                    response.length < this.pageSize && (this.loadMore = false)
                    $state.loaded();
                } else {
                    if(this.page == 1){
                        this.noData = true
                    }
                    this.loadMore = false
                }
              });

      }
    },
    filterMethod:function(){
         this.doctors = [];
          this.page = 1;
          this.loadMore = true
          this.distance = 100;
          this.$nextTick(() => {
              this.$refs.infiniteLoading.attemptLoad();
          });
    },
  },

}
</script>

<style>
.user-image{
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    width: 50px;

}
</style>