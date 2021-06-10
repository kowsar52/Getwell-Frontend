<template>
 <div>
<!--header start-->

<header class="site-header">
  <div id="header-wrap">
    <div class="container">
      <div class="row">
        <!--menu start-->
        <div class="col d-flex align-items-center justify-content-between">
              <router-link tag="a" :to="{ path: '/'}" class="navbar-brand logo text-dark h2 mb-0">
                 <img :src="settings.asset_url+settings.logo" width="150"/>
              </router-link>
          <nav class="navbar navbar-expand-lg navbar-light ml-auto">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li v-for="(menu_item, index) in menu_items" :key="index"  :class="`nav-item ${menu_item.sub_menu_items.length> 0 ? 'dropdown' : ''}`"> 
                    <router-link :class="`nav-link ${menu_item.sub_menu_items.length> 0 ? 'dropdown-toggle' : ''}`" :data-toggle="menu_item.sub_menu_items.length> 0 ? 'dropdown' : ''" :to="{ path: menu_item.path}">
                        {{menu_item.title}}
                    </router-link>
                    <!-- submenu     -->
                  <ul :if="menu_item.sub_menu_items.length> 0" class="dropdown-menu">
                    <li v-for="(sub_menu_item, index2) in menu_item.sub_menu_items" :key="index2">
                        <router-link tag="a" :to="{ path: sub_menu_item.path}" class="dropdown-item">
                            {{sub_menu_item.title}}
                        </router-link>
                    </li>
                  </ul>
                </li>
              </ul>

          <router-link   v-if="!isLogin" tag="a" :to="{ path: '/contact'}" class="btn btn btn-secondary ml-5">
              Are you a professional?
            </router-link>

          <div v-if="isLogin" class="p-2 d-md-block d-none">
             <router-link :to="{path: '/user/inbox'}">
                <i class="la la-inbox" style="    font-size: 20px;"></i><span class="badge bg-success">{{total_messages ? total_messages : '0'}}</span>
            </router-link>
         </div>
         <!-- <div v-if="isLogin" class="p-2 d-md-block d-none">
             <router-link :to="{path: '/user/notifications'}">
              <i class="la la-bell" style="    font-size: 20px;"></i><span class="badge bg-success">{{total_notifications ? total_notifications : '0'}}</span>
            </router-link>
         </div> -->


          <router-link v-if="!isLogin" tag="a" :to="{ path: '/login'}" class="btn btn btn-outline-primary ml-5">
              Sign In
            </router-link>
          <router-link v-if="!isLogin" tag="a" :to="{ path: '/register'}" class="btn btn-primary ml-2">
               Sign Up
            </router-link>
                  <li v-if="isLogin" class="nav-item dropdown" style="list-style: none;">
                    <a class="nav-link" href="#" id="nav-inner-success_dropdown_1" role="button" data-toggle="dropdown">
                      <img :src="settings.asset_url+user.avater" alt="User" class="rounded-circle avatarUser mr-1 img-fluid" width="30" height="30">
                      <span class="d-lg-none">{{user.first_name}}</span>
                      <i class="la la-angle-down m-0"></i>
                    </a>
                  <div class="dropdown-menu mb-1 dropdown-menu-right dd-menu-user" aria-labelledby="nav-inner-success_dropdown_1" bis_skin_checked="1">
                    <span :if="top_user_menu_items.length > 0" v-for="(menu_item, i) in top_user_menu_items" :key="i">
                        <router-link v-if="isLogin" tag="a" :to="{ path: menu_item.path}" class="dropdown-item dropdown-navbar p-3">
                            {{menu_item.title}}
                          </router-link>
                          <div class="dropdown-navbar" bis_skin_checked="1" style="border-bottom: 1px solid #dedede;"></div>
                    </span>
                        <a v-if="isLogin" @click="logout()" class="dropdown-item dropdown-navbar p-3" style="cursor:pointer">
                           Logout
                          </a>
                  </div>
                </li>
            </div>
          </nav> 
        </div>
        <!--menu end-->


      </div>
    </div>
  </div>
</header>

<!--header end-->
 </div>
</template>

<script>
import menu from '../../plugins/menu_items'
import axios from 'axios'
export default {
  name:"Header",
  props:['settings'],
  data() {
    return {
      isLogin :  false,
      user: [],
      menu_items : menu.public_menu,
      user_menu_items : menu.user_menu,
      top_user_menu_items: [],
      total_messages: 0,
      total_notifications: 0,
    }
  },
  created() {
    
    const loggedIn = localStorage.getItem('user')
     if(loggedIn){
      this.getUser()
       this.isLogin  = true 
       this.getTotalNotifications()
       if(this.$store.state.userRole == 'Patient'){
         this.top_user_menu_items = this.user_menu_items.patient_menu_items
       }else{
          this.top_user_menu_items = this.user_menu_items.doctor_menu_items
       }
       
     }else{
       this.isLogin  = false 
     }
  },
   methods: {
       getUser(){
        axios.get("/get-user").then(
              res => {
                  this.user= res.data;
              },
              error => {
                  console.log(error)
              }
        );
    },
  
      logout () {
            this.$store.dispatch('logout')
            .then(function(){
              this.$router.push({ name: 'login' })
            })
      },
       getTotalNotifications: function() {
          axios.get("/user/check-new-notifications")
              .then(res => {
                  this.total_notifications = res.data.total_notifications
                  this.total_messages = res.data.total_messages
              })
              .catch(e => {
                  console.log(e);
          });
      },
   },
      mounted: function () {
    setInterval(() => {
      const loggedIn = localStorage.getItem('user')
      if(loggedIn){
        this.getTotalNotifications()
      }
    }, 15000)
  }
}
</script>

<style scoped>
.badge{
      position: absolute;
    color: #fff;
    border-radius: 50px;
    font-weight: 400;
}
</style>