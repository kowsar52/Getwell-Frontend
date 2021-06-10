<template>
    <div class="col-md-6 col-lg-3 mb-3" bis_skin_checked="1">

    <button type="button" class="btn btn-primary btn-block mb-2 d-lg-none" data-toggle="collapse" data-target="#navbarUserHome" aria-controls="navbarCollapse" aria-expanded="false">
            <i class="fa fa-bars myicon-right"></i> Menu
    </button>

    <div class="navbar-collapse collapse d-lg-block" id="navbarUserHome" bis_skin_checked="1">
        <div class="card shadow-sm" bis_skin_checked="1">
                <div class="list-group list-group-sm list-group-flush" bis_skin_checked="1">
                    <router-link v-for="(menu_item, index) in menu_items" :key="index" tag="a" :to=" { path : menu_item.path}" class="list-group-item list-group-item-action d-flex justify-content-between ">
                        <div bis_skin_checked="1">
                                <i class="fa fa-tachometer-alt mr-2"></i>
                                <span>{{ menu_item.title }}</span>
                        </div>
                        <div bis_skin_checked="1">
                                <i class="la la-angle-right"></i>
                        </div>
                    </router-link>
                     <a v-if="isLogin" @click="logout()" class="list-group-item list-group-item-action d-flex justify-content-between " style="cursor:pointer">
                      <div bis_skin_checked="1">
                                <i class="fa fa-tachometer-alt mr-2"></i>
                                <span>Logout</span>
                        </div>
                        <div bis_skin_checked="1">
                                <i class="la la-angle-right"></i>
                        </div>
                        
                    </a>
                </div>
        </div>
    </div><!-- End Card -->
</div><!-- navbarUserHome -->
</template>

<script>
import menu from '../../plugins/menu_items'
export default {
  data() {
    return {
      isLogin: false,
      role: localStorage.getItem('role'),
      menu : menu,
      menu_items: [],
    }
  },
    created() {
     const loggedIn = localStorage.getItem('user')
     if(loggedIn){
       this.isLogin  = true 
       if(this.$store.state.userRole == 'Patient'){
         this.menu_items = this.menu.user_menu.patient_menu_items
       }else{
          this.menu_items = this.menu.user_menu.doctor_menu_items
       }
     }else{
       this.isLogin  = false 
     }
  },
  methods: {
    logout () {
            this.$store.dispatch('logout')
            .then(function(){
              this.$router.push({ name: 'login' })
            })
        },
  },
}
</script>

<style>

</style>