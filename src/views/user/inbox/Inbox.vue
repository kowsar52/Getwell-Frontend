<template>
<div>
   <Header :settings="settings"/>
    <Breadcrumb page_title="Messages"></Breadcrumb>
  <div class="container kk-messages">
      <div class="row" bis_skin_checked="1">

          <SideMenu/>

            <div class="col-md-6 col-lg-9 mb-5 mb-lg-0" bis_skin_checked="1">
                  <div class="card mb-5">
                    <div class="card-header">
                        {{page_title}}
                        <!-- <input type="text" class="form-control search" placeholder="Search"  v-model="searchText" @input="SearchMethod()"> -->
                    </div>
                    <div class="card-body">
                         <div :if="messages.length > 0">
                            <ul class="writer-info" v-for="(message, index) in messages" :key="index" @click="viewMessage(message.userID)">
                                <li>
                                <v-badge
                                        bordered
                                        bottom
                                        :color="message.isOnline ? 'bg-success accent-4' : 'bg-danger accent-4'"
                                        dot
                                        offset-x="10"
                                        offset-y="10"
                                    >
                                        <v-avatar size="40">
                                            <v-img :src="settings.asset_url+message.avater"></v-img>
                                        </v-avatar>
                                    </v-badge>
                                </li>
                                <li>
                                    <div class="float-left p-2">
                                        <h6 style="line-height: 0.6;">{{ message.first_name+' '+message.last_name}} </h6>
                                        <span class="text-small" style=" right: 0;position: absolute;">{{message.created_at}}</span>
                                        <p class="text-truncate m-0"> 
                                            <span v-if="message.messagesCount != 0" class="badge badge-primary mr-1">{{ message.messagesCount }}</span>

                                         <span v-html="message.icon ? message.icon : ''"></span> 
                                         <span v-html="message.iconMedia ? message.iconMedia : message.last_message"></span> 
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        <ul>
                            <infinite-loading v-if="loadMore" @infinite="handleLoadMore" ref="infiniteLoading"  spinner="waveDots">
                                <span slot="no-more">
                                There is no more messages :(
                                </span>
                            </infinite-loading>
                            <div v-if="noData" class="no-data-div" >
                                <h6 >No messages found!</h6>
                            </div>

                        </ul>

                        </div>

                                
                    </div>
                </div>
            </div><!-- end col-md-6 -->
        </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import swal from 'sweetalert'
import moment from 'moment'
// import $ from 'jquery'
import InfiniteLoading from 'vue-infinite-loading'
Vue.use(InfiniteLoading)

export default {
  name: "Inbox",
  components: {
    'Breadcrumb': () => import('../../include/Breadcrumb.vue'),
    'SideMenu': () => import('../../include/SideMenu.vue'),
    'Header': () => import('../../layout/Header.vue'),
  },
  props:['settings'],
  data() {
    return {
       page_title : 'Messages',
        searchText : '',
        isLoading: true,
        messages : [],
        currency: this.settings.currency,
        page: 1,
        pageSize: 10,
        loadMore: true,
        noData: false,
        distance: -Infinity,
    }
  },
  created() {

  },
  methods: {
        viewMessage(id){
          this.$router.push({path: '/user/inbox/'+id})
      },
      handleLoadMore($state) {
          if(this.loadMore){
              this.noData = false
              axios.get("/user/messages", {
                      params: {
                          page: this.page,
                          per_page: this.pageSize,
                      }
                  })
                  .then(res => {
                      let response = res.data.data.data
                    if (res.data.data.data && response.length > 0) {
                        this.page += 1;
                        this.messages = this.messages.concat(response);
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
  },
  filters:{
    filterMY : function (value) {
          const date = new Date(value)
          return moment(date).format('MMMM YYYY');
    },
  }
}
</script>

<style>
.kk-messages .card{
   border-radius: 0;
    border: 1px dashed #28b97b;
    background: #ebf8ffc4;
}
.kk-messages .card-header{
    border: none;
    background: #28b97b;
    color: #fff;
    font-weight: 700;
        border-radius: 0;
}
.kk-messages .search{
     position: absolute;
    right: 5px;
    width: 180px;
    height: 35px;
    top: 5px;
    background: #ebf8ffc4;
    border: 1px solid #c3b7b0;
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
.writer-info{
       position: relative;
    display: inline-flex;
    width: 100%;
    border-top: 1px solid #e6e6e6;
    padding-top: 10px;
    margin: 0;
    cursor: pointer;
}
.writer-info li{
    list-style: none;
    float: left;
    display: block;
}
</style>