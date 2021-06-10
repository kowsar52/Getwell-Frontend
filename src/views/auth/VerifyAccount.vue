<template>
<div>
    <Header :settings="settings"/>
    <!--hero section start-->
<loading
    :active.sync="isLoading"
    :is-full-page="true"
    color="#22dbd7"
    background-color="#000"
    loader="dots"
></loading>

<!--body content start-->

<div class="page-content">

<!--login start-->

<section class="register" style="    text-align: center;
    color: #795548;">
     <img :src="settings.asset_url+settings.logo" width="150"/>
<h2>Checking... Please Wait...</h2>
</section>

<!--login end-->

</div>

<!--body content end--> 


</div>


</template>
<script>
// import axios from 'axios'
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import axios from 'axios'

  export default {
    data() {
      return {
        isLoading: true,
        token:this.$route.params.token,
      }
    },
    props: ['settings'],
    components:{
        Loading,
        'Header': () => import('../layout/Header.vue'),
    },
    mounted() {


    },
    created(){
        this.verifyAccount()
    },
    methods: {
         verifyAccount() {
          
            this.isLoading = true;
            axios.get("account-verify/"+this.token,{
                headers: {
                     'Access-Control-Allow-Origin': '*',
                     'Content-type': 'application/json',
                }
            }).then(
                res => {
                    if(res.data.status == 'success'){
                        this.$router.push({ name: 'dashboard' })

                    }
                },
                error => {
                    this.error = error
                    this.isLoading = false;
                    this.$router.push({ name: 'register' })
                }
            );
        },
    }
  }
</script>
<style scoped>
footer{
    position: fixed !important;
    width: 100% !important;
    bottom: 0 !important;
}
</style>