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
    <div v-if="this.page_content.slug == $route.params.slug">
          <div class="xp-authenticate-bg kk-page-header">
            <div class="row align-items-center mb-5 justify-content-center">
              <div class="col-12 col-md-10 col-lg-8 text-center">
                <div> 
                  <h2 class="mt-4 mb-0 font-weight-bold header-title">{{page_content.title}}</h2>
                  <p class=" mb-0">{{page_content.heading}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Start XP Container -->
      
      
        <!-- Contact section start -->
        <Contact v-if="$route.params.slug == 'contact'" :settings="settings"/>
        <!-- Contact section end -->
      <section v-else class="pb-11">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-12 mb-6 mb-lg-0" v-html="page_content.details">
              
            </div>
          </div>
        </div>
      </section>
    </div>
    <NotFound v-if="notFound"/>
    <!-- End XP Container -->
  </div>
</template>
<script>

import axios from 'axios'
  export default {
    name: 'Pages',
   components: { 
      'Header': () => import('./layout/Header.vue'),
      'Contact': () => import('./Contact.vue'),
      'NotFound': () => import('./404.vue'),
   },
   props : ['settings'],
    data() {
      return {
          page_content :[],
          isLoading: true,
          notFound: false,
      }
    },
    created() {
        this.getPageContent()
    },
    watch:{
        $route (){
            this.getPageContent()
        }
    },
    methods: {
        getPageContent(){
           this.isLoading = true
            axios.get("/get-page-content/"+this.$route.params.slug).then(
                res => {
                    this.page_content = res.data
                    this.isLoading = false
                    if(res.data.slug != this.$route.params.slug){
                        this.notFound = true
                    }
                },
                error => {
                    console.log(error)
                }
            );
        },
    }
  }
</script>
<style scoped>
.kk-page-header{
   overflow: hidden;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #272220;
    color: #ffffff;
}
.kk-bg-secondary{
      background-color: #ebf8ff!important;
}
h1, .h1 {
    font-size: 30px!important;
    font-weight: 700!important;
}
</style>