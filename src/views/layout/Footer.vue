<template>
 <!--footer start-->

<footer style="    margin-top: 90px;">
   <div class="row text-white text-center" style="background: #28b97b;">
      <div class="col-12" style="    padding: 20px;">
        Copyright {{ new Date().getUTCFullYear()}} {{settings.site_name}} | All Rights Reserved
     <br> <span class="pt-2" v-for="(menu_item, index) in menu_items" :key="index" >
             <router-link tag="span" :to="{ path: menu_item.path}" style="font-weight: 700;color: #eff9f5; cursor: pointer;">{{menu_item.title}} {{ menu_items.length - 1 == index ? '' : ' | '}}</router-link>
          </span>
        </div>
       


    </div>
    <cookie-law theme="blood-orange">
       <div slot="message">
         This website uses cookies to ensure you get the best experience on our website.
        </div>
    </cookie-law>
</footer>

<!--footer end-->
</template>

<script>

import axios from 'axios'
 import CookieLaw from 'vue-cookie-law'

export default {
  name:"Footer",
  props:['settings'],
  components: { CookieLaw },
  data() {
        return {
            menu_items : [],
            
        };
  },
  created() {
    this.getMenu()
  },
  methods: {
       getMenu(){
            axios.get("/get-menu").then(
                res => {
                    this.menu_items = res.data
                },
                error => {
                    console.log(error)
                }
            );
        },
  },

  }
</script>

<style>
.bg-footer {
    background-color: #272220 !important;
}
.bg-warning-soft {
    background-color: rgb(49 45 43) !important;
}
</style>