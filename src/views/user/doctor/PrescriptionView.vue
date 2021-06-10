<template>
<div>
     <Header :settings="settings"/>
    <Breadcrumb :page_title="page_title"></Breadcrumb>
  <div class="container">
      <div class="row" bis_skin_checked="1">
            <SideMenu/>

    <div class="col-md-6 col-lg-9 mb-5 mb-lg-0" bis_skin_checked="1">

        <!-- latest order section  -->
        <div class="mb-5 kk-card card">
            <div class="card-header">
                {{page_title}}
            </div>
            <div class="card-body" style="height: auto !important">
                    <p><strong>Date: </strong>{{prescription.date | dateFormat}}</p>
                    <p><strong>Patient: </strong>{{prescription.patient_name}}</p>
                    <p><strong>Doctor: </strong>{{prescription.doctor_name}}</p>
                    <p><strong>Disease: </strong>{{prescription.name_of_disease}}</p>
                    <p><strong>Symptoms: </strong>{{prescription.symptoms}}</p>
                    <p><strong>Medicine: </strong>{{prescription.medicine}}</p>
                    <p><strong>Procedure to use medicine: </strong>{{prescription.procedure_to_use_medicine}}</p>
                    <p><strong>Feedback: </strong>{{prescription.feedback}}</p>
                    <p><strong>Doctor signature: </strong>{{prescription.signature}}</p>    
                    <hr>
                    <router-link class="btn btn-secondary" :to="{path : '/user/patients'}">Back</router-link>
            </div>
        </div>
        <!-- latest order section end -->
    </div><!-- end col-md-6 -->
 </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert'
export default {
  name: "PrescriptionView",
  components: {
    'Breadcrumb': () => import('../../include/Breadcrumb.vue'),
    'SideMenu': () => import('../../include/SideMenu.vue'),
    'Header': () => import('../../layout/Header.vue'),
  },
  props:['settings'],
  data() {
    return {
      page_title: 'Prescription Details',
      isLoading: true,
      prescription : [],
    }
  },
  created() {
    this.getPrescription()
  },
  methods: {
    getPrescription(){
          axios.get("/user/prescription/"+this.$route.params.id).then(
              res => {
                  this.prescription = res.data;
              },
              error => {
                   swal(String(error.response.status),error.response.statusText,'error')
              }
        );
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