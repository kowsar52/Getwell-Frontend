<template>
<div>
     <Header :settings="settings"/>
    <Breadcrumb page_title="Appointment Time"></Breadcrumb>
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
                        <th scope="col">Doctor</th>
                        <th scope="col">Time</th>
                        <th scope="col">Appointment Date</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </thead>
                    <tbody :if="bookings.length > 0">
                        <tr v-for="(appointment, index) in bookings" :key="index" >
                            <td>{{index+1}}</td>
                            <td>
                                <span class="">{{appointment.first_name+' '+appointment.last_name}}</span>
                            </td>
                            <td> {{appointment.time}}  </td>
                            <td> {{appointment.date | dateFormat}}  </td>
                            <td> {{appointment.created_at | filterAgo($store.state.userTimezone)}}</td>
                            <td><span :class="`badge badge-${appointment.status == 1 ? 'success' : 'warning'}`"> {{appointment.status | filterStatus}}</span></td>
                            <td> 
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <router-link tag="button" class="btn btn-warning btn-small" :to="{path: '/user/inbox/'+appointment.user_id}"><i class="la la-comment"></i></router-link>
                                    <!-- <router-link tag="button" class="btn btn-success btn-small" :to="{path: 'user/my-booking/edit/'+appointment.id}"><i class="la la-edit"></i></router-link> -->
                                    <button type="button" class="btn btn-danger btn-small" @click="deleteBooking(appointment.id,index)"><i class="la la-trash"></i></button>
                                </div>
                                </td>
                           
                        </tr>
                        <tr>
                            <infinite-loading v-if="loadMore" @infinite="handleLoadMore" ref="infiniteLoading"  spinner="waveDots">
                                <span slot="no-more">
                                There is no more bookings :(
                                </span>
                            </infinite-loading>
                            <div v-if="noData" class="no-data-div" style="position: absolute;width: 95%;text-align: center; padding-top: 20px;">
                                <h6 >No bookings found!</h6>
                                <router-link v-if="user.role == 2" tag="button" class="btn btn-primary" :to="{path : '/user/create-appointment'}">Create Appointment</router-link>
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
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)

export default {
  name: "MyBookings",
  components: {
    'Breadcrumb': () => import('../include/Breadcrumb.vue'),
    'SideMenu': () => import('../include/SideMenu.vue'),
    'Header': () => import('../layout/Header.vue'),
  },
  props:['settings'],
  data() {
    return {
      user : {},
      page_title: 'My Bookings',
      filterDate : 'all',
      isLoading: true,
      bookings : [],
      page: 1,
      pageSize: 10,
      loadMore: true,
      noData: false,
      distance: -Infinity,
    }
  },
  created() {
    this.getUser()
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
      handleLoadMore($state) {
      if(this.loadMore){
           this.noData = false
          axios.get("/user/my-bookings", {
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
                    this.bookings = this.bookings.concat(response);
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
                    this.bookings = [];

               axios.get("/user/my-bookings/"+this.status, {
                    params: {
                        page: this.page++,
                        per_page: this.pageSize,
                        searchText : this.searchText,
                    }
                }).then(res => {
                    if(this.page == 2){
                        this.bookings = [];
                    }
                    let response = res.data.data.data
                    this.loadMoreLoader = false
                    this.bookings = response;
                    // Stop scroll-loader
                    response.length < this.pageSize && (this.loadMore = false)
                })
                .catch(e => {
                    this.errors.push(e);
                });
            }else{
                this.bookings = [];
                this.page = 1;
                this.loadMore = true
                this.distance = 100;
                this.$nextTick(() => {
                    this.$refs.infiniteLoading.attemptLoad();
                });
          }
    },

     deleteBooking(id,index){
        swal({
            title: "Are you sure?",
            text: "Confirm that you want to delete this appointment.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.get("/user/delete-booking/"+id).then(res => {
                    if(res.data.success){
                        swal(res.data.message, {
                            icon: "success",
                        });
                        this.bookings.splice(index,1);
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });

        
            } else {
                swal("Appointment is not deleted!");
            }
        });
    }

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