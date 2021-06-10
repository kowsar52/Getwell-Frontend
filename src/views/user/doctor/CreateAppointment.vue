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
                                        <div class="col">
                                            <label for="">Choose Date:</label>
                                            <input type="date" class="form-control" v-model="form_data.date" >
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
                <form>

                  <div class="card">
                      <div class="card-header">
                          Choose available time slot
                        <span class="checkuncheck">Check/Uncheck
                            <input type="checkbox" class="" onclick=" for(c in document.getElementsByName('time[]')) document.getElementsByName('time[]').item(c).checked=this.checked" >
                        </span>
                      </div>
                      <div class="card-body">
                          
                          <table class="table table-striped">
                          
                            
                            <tbody>
                              <tr>
                                <th scope="row">8H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="08:00"> 08:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="08:20"> 08:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="08:40"> 08:40</td>
                              </tr>
                              <tr>
                                <th scope="row">9H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="09:00"> 09:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="09:20"> 09:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="09:40"> 09:40</td>
                              </tr>
                              <tr>
                                <th scope="row"> 10H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="10:00"> 10:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="10:20"> 10:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="10:40"> 10:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 11H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="11:00"> 11:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="11:20"> 11:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="11:40"> 11:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 12H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="12:00"> 12:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="12:20"> 12:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="12:40"> 12:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 13H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="13:00"> 13:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="13:20"> 13:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="13:40"> 13:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 14H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="14:00"> 14:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="14:20"> 14:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="14:40"> 14:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 15H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="15:00"> 15:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="15:20"> 15:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="15:40"> 15:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 16H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="16:00"> 16:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="16:20"> 16:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="16:40"> 16:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 17H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="17:00"> 17:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="17:20"> 17:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="17:40"> 17:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 18H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="18:00"> 18:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="18:20"> 18:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="18:40"> 18:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 19H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="19:00"> 19:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="19:20"> 19:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="19:40"> 19:40</td>
                              </tr>

                              <tr>
                                <th scope="row"> 20H</th>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="20:00"> 20:00</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="20:20"> 20:20</td>
                                <td><input type="checkbox" name="time[]" v-model="form_data.time"  value="20:40"> 20:40</td>
                              </tr>

                          
                          
                            </tbody>
                          </table>
                          <button type="button" class="btn btn-primary submit-btn" @click="submitForm()">Submit</button>
                            <router-link class="btn btn-secondary ml-3" :to="{path : '/user/appointment-time'}">Cancel</router-link>
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
    'Breadcrumb': () => import('../../include/Breadcrumb.vue'),
    'SideMenu': () => import('../../include/SideMenu.vue'),
    'Header': () => import('../../layout/Header.vue'),
  },
  props:['settings'],
  data() {
    return {
      user : {},
      page_title: 'Create Appointment',
      isLoading: true,
      form_data:{
        date : null,
        time : [],
      },
      appointment:{},
      times:[],
    }
  },
  created() {
    if(this.$route.params.id){
      this.getAppointment(this.$route.params.id)
    }
  },
  methods: {
    getAppointment(id){
          axios.get("/user/get-appointment/"+id)
        .then((res) => {
              this.form_data.time = res.data.times
              this.form_data.date = res.data.appointment.date
        });
    },
    submitForm(){
        $("button.submit-btn").prop("disabled", true);
        $("button.submit-btn").html("Sending");

        this.isLoading = true;
        let time=[];
        $('input[name="time[]"]:checked').each(function (index, member) {
            var value = $(member).val();
           time.push(value)
        });
     
       this.form_data.time = time
       if(this.$route.params.id){
        this.form_data.id =this.$route.params.id
        }
      
        axios.post("/user/appointment-create", this.form_data).then(
            res => {
                let data = res.data;
                  $(".with-errors").html('');
                if (data.errors) {
                  for (var key in data.errors) {
                    swal("Oops!", data.errors[key][0], "error");
                    }
                    
                }else{
                  swal('Good!','Created Successfully','success')
                   this.$router.push({ path: '/user/appointment-time' })
                }
                this.isLoading = false;
                $("button.submit-btn").prop("disabled", false);
                $("button.submit-btn").html("Next Step");
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
</style>