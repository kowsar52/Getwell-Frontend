<template>
  <div>
    <Header :settings="settings"/>
    <div class="xp-authenticate-bg"></div>
    <!-- Start XP Container -->
    <div id="xp-container" class="xp-container">

        <!-- Start Container -->
        <div class="container">

            <!-- Start XP Row -->
            <div class="row vh-100 align-items-center">
                <!-- Start XP Col -->
                <div class="col-lg-12 ">

                    <!-- Start XP Auth Box -->
                    <div class="xp-auth-box">
                        <div class="card">
                            <div class="card-body">
                                <div class="xp-error-box text-center">
                                    <h1 class="xp-error-title mb-3"><span class="text-black">4</span><span class="text-black">0</span><span class="text-black">4</span>
                                    </h1>
                                    <h4 class="xp-error-subtitle text-black m-b-30"><i class="mdi mdi-emoticon-sad text-danger font-32"></i><i class="mdi mdi-emoticon-sad text-danger font-32"></i>ps! Page not Found</h4>
                                    <p class="text-muted m-b-30">The page you're looking for doesn't exist.</p>
                                     <router-link tag="button" :to="{ path: '/'}" class="btn btn-primary">
                                       Take Me Home
                                    </router-link>
                                </div>
                            </div>
                        </div>
        
                    </div>
                    <!-- End XP Auth Box -->

                </div>
                <!-- End XP Col -->
            </div>
            <!-- End XP Row -->
        </div>
        <!-- End Container -->
    </div>
    <!-- End XP Container -->
  </div>
</template>
<script>


  export default {
   components: { 
      'Header': () => import('./layout/Header.vue'),
   },
   props : ['settings'],
    data() {
      return {
  
      }
    },
 
    created(){
        
    },
    methods: {
    
    }
  }
</script>