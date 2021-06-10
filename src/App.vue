<template>
<div>
  <loading
    :active.sync="isLoading"
    :is-full-page="true"
    color="#28b97b"
    background-color="#fff"
    loader="dots"
></loading>

 <vue-progress-bar></vue-progress-bar>
<transition  name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @afterEnter="afterEnter">
  <router-view :settings="settings"></router-view>
  
</transition>
  <Footer :settings="settings"/>

  </div>
</template>

<script>
import axios from 'axios'

import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css"

export default {
  name: "App",
  components: {
    'Footer': () => import('./views/layout/Footer.vue'),
    Loading
  },
  data() {
    return {
      app_name: "GetWell",
      prevHeight: 0,
      settings : [],
      translations : [],
      isLoading: false,
      page: 'home'
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "GetWell";
      },
    },
  },
    created(){
        this.getSettings();    
    },
    methods: {

      getSettings: function() {
            this.isLoading = true;
          axios
              .get("/settings")
              .then(res => {
                  this.settings = res.data;
                  this.isLoading = false;
              })
              .catch(e => {
                  this.errors.push(e);
                  this.isLoading = false;
          });
      },
      beforeLeave() {
        if(localStorage.getItem('user')){
          if(this.$route.meta.role != 'all' && this.$store.state.userRole != this.$route.meta.role){
            this.$router.go(-1)
          }
        }
        this.page = this.$route.name
        this.isLoading = true
        this.$Progress.start()
      },
      afterEnter() {
        this.isLoading = false
        this.$Progress.finish()
      },
    },
    computed: {
          currentRouteName() {
               return this.$route.name;
          }
      },
     mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '/js/theme-script.js')
  
      document.head.appendChild(recaptchaScript)
    },

};
</script>

<style>
/* body{
  background: #f7f7f7;
}*/
header{
  border-bottom: 1px solid #f1f1f1;
} 
  .vld-overlay .vld-background {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background: #fff !important;
    opacity: .8 !important;
}
.v-application a {
    color: #28b97b !important;
}
.dashboard-content{
      border: 1px solid #dedede;
    padding: 10px 15px;
    margin-bottom: 20px !important;
}
.vs--searchable .vs__dropdown-toggle {
    cursor: text;
    padding: 10px 0px;
    background: white;
}
.select2-container .select2-selection--single{
  height: 50px !important;
}
.kk-orders .card .card-body{
  height: 700px;
    overflow: auto;
}
  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }
  .v-item--active {
      color: var(--v-primary-base) !important;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #e6d0c3; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #28b97b; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #28b97b; 
  }
  #particles-js {
    top: 100px !important;
}

.yellow--text {
    color: #f18121 !important;
}
  
section {
    padding: 2.5rem 0 !important;
}

/* //modal css start  */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
@media only screen and (max-width: 400px) {
  .modal-container {
    width: 96%;
  }
}


.modal-header {
     padding: 10px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* //modal css end  */
</style>
