<template>
<div>
     <Header :settings="settings"/>
    <Breadcrumb :page_title="page_title"></Breadcrumb>
  <div class="container">
      <div class="row" bis_skin_checked="1">
            <SideMenu/>

                <div class="col-md-6 col-lg-9 mb-5 mb-lg-0" bis_skin_checked="1">
        <!-- profile section  -->
        <div class="row">
            <div class="col-md-12 total-item-card">
                <div class="card m-b-30" style="height:100%">
                    <div class="card-body">
                        <form>
                            <div class="form-row">
                                <div class="col-12 col-md-8">
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
        <div class="mt-5 mb-5 kk-card card">
            <div class="card-header">
                {{page_title}}
            </div>
            <div class="card-body">
                <table  class="table"> 
                    <thead>
                        <th scope="col">#</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col">Contact</th>
                    </thead>
                    <tbody :if="patients.length > 0">
                        <tr v-for="(patient, index) in patients" :key="index" >
                            <td>{{index+1}}</td>
                            <td><img :src="settings.asset_url+patient.avater" alt="" style="height: 50px;border-radius: 5px;"></td>
                            <td>{{patient.date | dateFormat}}</td>
                            <td>{{patient.time}}</td>
                            <td>
                                <span class="">{{patient.first_name+' '+patient.last_name}}</span>
                            </td>
                            <td>{{patient.email}}</td>
                            <td>{{patient.phone? patient.phone : 'null'}}</td>
                            <td>{{patient.gender}}</td>
                            <td><span :class="`badge badge-${patient.status == 1 ? 'success' : 'warning'}`"> {{patient.status | filterStatus}}</span></td>
                            <td>
                                <router-link v-if="patient.have_prescription" class="btn btn-success" :to="{path: '/user/prescription/'+patient.prescription_id}">View Prescriptions</router-link>
                                <button v-else-if="patient.status == 1" class="btn btn-success" @click="writePrescription(index, patient.id)">Write Prescriptions</button>
                                <button v-else class="btn btn-success" @click="acceptBooking(index, patient.id)">Accept</button>
                            </td>
                            <td> <router-link class="btn btn-info" :to="{path: '/user/inbox/'+patient.user_id}">Message</router-link></td>
                        </tr>
                        <tr>
                            <infinite-loading v-if="loadMore" @infinite="handleLoadMore" ref="infiniteLoading"  spinner="waveDots">
                                <span slot="no-more">
                                There is no more patients :(
                                </span>
                            </infinite-loading>
                            <div v-if="noData" class="no-data-div" style="position: absolute;width: 95%;text-align: center; padding-top: 20px;">
                                <h6 >No patients found!</h6>
                                
                            </div>

                        </tr>

                    </tbody>
                    </table>

                        
            </div>
        </div>
        <!-- latest order section end -->
            </div><!-- end col-md-6 -->
              </div>
  </div>
  <WritePrescriptionModal v-if="showModal" @close="showModal = false" :settings="settings" :booking_id="booking_id" :b_index="b_index"/>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert'
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)

export default {
  name: "Patients",
  components: {
    'Breadcrumb': () => import('../../include/Breadcrumb.vue'),
    'SideMenu': () => import('../../include/SideMenu.vue'),
    'Header': () => import('../../layout/Header.vue'),
    'WritePrescriptionModal': () => import('./WritePrescriptionModal'),
  },
  props:['settings'],
  data() {
    return {
      page_title: 'Patients',
      filterDate : 'all',
      isLoading: true,
      patients : [],
      page: 1,
      pageSize: 10,
      loadMore: true,
      noData: false,
      distance: -Infinity,
      showModal: false,
      booking_id: null,
      b_index: null,
    }
  },
  created() {
    
  },
  methods: {
    acceptBooking(index,booking_id){
          axios.get("/user/accept-booking/"+booking_id).then(
              res => {
                  swal('Good!','Status Updated Successfully','success')
                  this.patients[index].status = res.data.status;
              },
              error => {
                  console.log(error)
              }
        );
    },
    writePrescription(b_index,booking_id){
        this.booking_id = booking_id
        this.b_index = b_index
        this.showModal = true
    },
      handleLoadMore($state) {
      if(this.loadMore){
           this.noData = false
          axios.get("/user/patients", {
                  params: {
                      page: this.page,
                      per_page: this.pageSize,
                      filterDate: this.filterDate
                  }
              })
              .then((res) => {
                   let response = res.data.data.data
                if (res.data.data.data && response.length > 0) {
                    this.page += 1;
                    this.patients = this.patients.concat(response);
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
          if(this.searchText){
                    this.loadMore = true
                    this.page = 1
                    this.patients = [];

               axios.get("/user/patients/"+this.status, {
                    params: {
                        page: this.page++,
                        per_page: this.pageSize,
                        searchText : this.searchText,
                    }
                }).then(res => {
                    if(this.page == 2){
                        this.patients = [];
                    }
                    let response = res.data.data.data
                    this.loadMoreLoader = false
                    this.patients = response;
                    // Stop scroll-loader
                    response.length < this.pageSize && (this.loadMore = false)
                })
                .catch(e => {
                    this.errors.push(e);
                });
            }else{
                this.patients = [];
                this.page = 1;
                this.loadMore = true
                this.distance = 100;
                this.$nextTick(() => {
                    this.$refs.infiniteLoading.attemptLoad();
                });
          }
    },
  },
  filters:{
    filterStatus(status){
        if(status == 1){
            return 'Checked'
        }else{
             return 'Not Visited'
        }
    },
    filterAgo(value,timezone){
        var d = new Date(value); 
          var n_date = d.toLocaleString('en-US', { timeZone: timezone});
          return moment(n_date).format("MMMM D, hh:mm A");
    },
    dateFormat(data){
       return  moment(data).format("DD-MM-YYYY");
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