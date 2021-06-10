<template>
  <div>
    <Header :settings="settings" />
    <!-- <Breadcrumb page_title="Messages"></Breadcrumb> -->
    <div class="container kk-messages mb-3 mt-3">
      <div class="row" bis_skin_checked="1">
        <SideMenu />

        <div class="col-md-6 col-lg-9 mb-5 mb-lg-0" bis_skin_checked="1">
          <div v-if="isLoading" class="card">
                <v-skeleton-loader
              type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
            ></v-skeleton-loader>
          </div>
          <div v-else class="card">
            <div class="card-header bg-white">
              <div class="media">
                <router-link :to="{ path: '/user/inbox' }" class="msg-header-btn"
                  ><i class="la la-arrow-left"></i
                ></router-link>
                <router-link :to="{ path: '/user/profile/' + user.id }">
                  <v-badge
                    bordered
                    bottom
                    :color="
                      user.isOnline
                        ? 'bg-success accent-4'
                        : 'bg-danger accent-4'
                    "
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                    <v-avatar size="40">
                      <v-img :src="settings.asset_url + user.avater"></v-img>
                    </v-avatar>
                  </v-badge>
                </router-link>

                <div class="media-body" style="padding: 0px 10px;">
                  <h6 class="m-0">
                    <router-link :to="{ path: '/user/profile/' + user.id }">{{
                      user.first_name + " " + user.last_name
                    }}</router-link>
                  </h6>

                  <small>Active </small>

                  <span id="timeAgo" v-if="!user.isOnline">
                    <small class="timeAgo" id="lastSeen">
                      {{ user.last_seen }}</small
                    >
                  </span>
                </div>
                <a
                  v-if="totalMessage != 0"
                  href="javascript:void(0);"
                  class="text-muted float-right msg-header-btn"
                  id="dropdown_options"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <i class="la la-ellipsis-h"></i>
                </a>

                <div
                  v-if="totalMessage != 0"
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdown_options"
                >
                  <button class="btn" @click="deleteMessage()">Delete</button>
                  <hr class="m-0">
                  <button class="btn" @click="blockUser()">Block</button>
                </div>
              </div>
            </div>
            <!-- contentDIV start-->
            <div
            v-if="messages.length > 0"
              ref="chat"
              class="content px-4 py-3 d-scrollbars"
              id="contentDIV"
              style="height: 500px; position: relative; overflow-y: auto;"
              :data="user.id"
            >
              <!-- start message chat  #####################################################-->
              <div
                v-if="allMessages > messages.length && counter >= 1"
                class="btn-block text-center wrap-container"
                :data-total="allMessages"
                :data-id="user.id"
              >
                <a
                  href="javascript:void(0)"
                  @click="loadMoreMessages"
                  class="loadMoreMessages"
                  id="paginatorChat"
                >
                  load more
                  (<span class="counter">{{ counter }}</span
                  >)
                </a>
              </div>

              <div v-for="(msg, i) in messages" :key="i">
                <div
                  v-if="msg.from_user_id == msg.login_user_id"
                  :data="msg.id"
                  class="media py-2 chatlist2"
                >
                  <div class="media-body position-relative">
                    <a
                      href="javascript:void(0);"
                      class="btn-removeMsg removeMsg"
                      :data="msg.id"
                      title="Delete"
                    >
                      <i class="fa fa-trash-alt"></i>
                    </a>

                    <div
                      :class="
                        `position-relative text-word-break message ${
                          msg.file == '' && msg.order == 'no'
                            ? ' bg-primary'
                            : 'media-container'
                        } text-white m-0 ${
                          msg.format == 'zip' ? 'w-50' : 'w-auto'
                        }  float-right rounded-bottom-right-0`
                      "
                      v-html="msg.messageChat"
                    ></div>

                    <small
                      class="timeAgo w-100 d-block text-muted float-right text-right pr-1"
                    >
                      {{ msg.created_at | diffDay }}</small
                    >
                  </div>
                  <!-- media-body -->

                  <router-link
                    :to="{ path: '/user/profile/' + user.id }"
                    class="align-self-end ml-3 d-none"
                  >
                    <v-badge
                      bordered
                      bottom
                      :color="
                        user.isOnline
                          ? 'bg-success accent-4'
                          : 'bg-danger accent-4'
                      "
                      dot
                      offset-x="10"
                      offset-y="10"
                    >
                      <v-avatar size="40">
                        <v-img :src="settings.asset_url + msg.avater"></v-img>
                      </v-avatar>
                    </v-badge>
                  </router-link>
                </div>
                <!-- media -->

                <div v-else :data="msg.id" class="media py-2 chatlist">
                  <router-link
                    :to="{ path: '/user/profile/' + user.id }"
                    class="align-self-end mr-3"
                  >
                    <v-badge
                      bordered
                      bottom
                      :color="
                        user.isOnline
                          ? 'bg-success accent-4'
                          : 'bg-danger accent-4'
                      "
                      dot
                      offset-x="10"
                      offset-y="10"
                    >
                      <v-avatar size="40">
                        <v-img :src="settings.asset_url + msg.avater"></v-img>
                      </v-avatar>
                    </v-badge>
                  </router-link>
                  <div class="media-body position-relative">
                    <div
                      :class="
                        `position-relative text-word-break message ${
                          msg.file == '' && msg.order == 'no'
                            ? ' bg-primary'
                            : 'media-container'
                        } text-white m-0 ${
                          msg.format == 'zip' ? 'w-50' : 'w-auto'
                        }  float-left rounded-bottom-left-0`
                      "
                      v-html="msg.messageChat"
                    ></div>

                    <small
                      class="timeAgo w-100 d-block text-muted float-left pl-1"
                    >
                      {{ msg.created_at | diffDay }}</small
                    >
                  </div>
                  <!-- media-body -->
                </div>
                <!-- media -->
              </div>

              <!-- message end ############################################################################# -->
            </div>
            <!-- contentDIV end-->
             <div
              v-else
              ref="chat"
              class="content px-4 py-3 d-scrollbars text-center"
              id="contentDIV"
              style="height: 500px; position: relative; overflow-y: auto;"
              :data="user.id"
            >
                <p class="badge badge-new">Send a message to start conversation</p><br>
                <p class="badge badge-new">This is the beginning of your chat history</p>
             </div>

            <div class="card-footer bg-white position-relative">
              <div class="w-100 display-none" v-if="previewFile">
                <div class="previewFile d-inline"></div>
                <a href="javascript:;" class="text-danger" id="removeFile"
                  ><i class="la la-times-circle"></i
                ></a>
              </div>

              <div
                class="progress-upload-cover"
                style="width: 0%; top:0;"
              ></div>

              <div class="blocked display-none"></div>

              <!-- Alert -->
              <div
                class="alert alert-danger my-3"
                id="errorMsg"
                style="display: none;"
              >
                <ul class="list-unstyled m-0" id="showErrorMsg"></ul>
              </div>
              <!-- Alert -->

              <form
                class="msger-inputarea messageForm"
                @submit.prevent="messageSubmit"
              >
                <input
                  type="file"
                  name="photo"
                  id="fileInput"
                  class="d-none"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
                <input
                  type="file"
                  name="zip"
                  id="zipFile"
                  accept="application/x-zip-compressed"
                  class="d-none"
                  ref="zipFile"
                  v-on:change="handleZipFileUpload()"
                />
                <div class="w-100 mr-2">
                  <textarea
                    v-model="formData.message"
                    class="form-control textareaAutoSize border-0 kk-message-box"
                    data-post-length="250"
                    rows="1"
                    placeholder="Write something..."
                    id="message"
                    name="message"
                  ></textarea>
                </div>
                       <v-progress-linear
                       v-if="uploadPercentage > 0"
                        color="green lighten-2"
                        :buffer-value="uploadPercentage"
                        stream
                      ></v-progress-linear>

                      <ol v-if="selectedFileNames.length > 0" style="background: #f0faff;padding: 10px 20px;font-weight: 700;color: #a26744;">
                        <li v-for="(item, i) in selectedFileNames" :key="i" style="padding: 5px">{{item.name}}</li>
                      </ol>
                <div class="media align-items-center">
                  <label for="fileInput" class="mr-3" style="font-size:25px;color: #28b97b;cursor: pointer;padding-top: 5px;">
                   <i class="las la-paperclip"></i>
                  </label>

                  <div class="mr-3" style="font-size:23px">
                     <label for="zipFile" class="mr-3" style="font-size:25px;color: #28b97b;cursor: pointer;padding-top: 5px;">
                      <i class="las la-file-archive"></i>
                      </label>
                  </div>

                  <div class="media-body text-right">
                    <button
                      type="submit"
                      id="button-reply-msg"
                      data-send="send"
                      data-wait="sending wait"
                      class="btn btn-primary px-3"
                    >
                      <i class="las la-paper-plane"></i> Send
                    </button>
                  </div>
                </div>
                
              </form>
            </div>
            <!-- card footer -->
          </div>
          <!-- card -->
        </div>
        <!-- end col-md-6 -->
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from "axios";
import swal from 'sweetalert'
import moment from "moment";
// import $ from "jquery";

export default {
  name: "MessageBox",
  components: {
    // Breadcrumb: () => import("../../include/Breadcrumb.vue"),
    SideMenu: () => import("../../include/SideMenu.vue"),
    Header: () => import("../../layout/Header.vue"),
  },
  props: ["settings"],
  data() {
    return {
      page_title: "Messages",
      searchText: "",
      isLoading: true,
      user_id: this.$route.params.id,
      user: {},
      messages: [],
      counter: 0,
      allMessages: 0,
      totalMessage: 0,
      currency: this.settings.currency,
      page: 1,
      pageSize: 10,
      loadMore: true,
      noData: false,
      distance: -Infinity,
      previewFile: null,
      scrolling: true,
      firstMsg: true,
      formData: {
        message: null,
        photo : '',
        zip : '',
        id_user: this.$route.params.id,
      },
      uploadPercentage: 0,
      selectedFileNames :[],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getUser(this.$route.params.id);
      this.getMessages(this.$route.params.id);
    }
  },
  methods: {
    handleFileUpload(){
      let name = {name: this.$refs.file.files[0].name}
      this.selectedFileNames.push(name) 
      this.formData.photo = this.$refs.file.files[0];
    },
    handleZipFileUpload(){
       let name = {name: this.$refs.zipFile.files[0].name}
      this.selectedFileNames.push(name) 
      this.formData.zip = this.$refs.zipFile.files[0];
    },
    scrollToEnd: function() {
      var content = this.$refs.chat;
      if (content && this.scrolling == true && content.scrollHeight > 0) {
        this.$nextTick(() => {
          content.scrollTop = content.scrollHeight;
          this.scrolling = false;
        });
      }
    },
    getUser(id) {
      
      axios.get("/user/get-user/" + id).then(
        (res) => {
          this.user = res.data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getMessages(id) {
      axios
        .get("/user/messages/" + id, {
          params: {
            page: this.page,
            per_page: this.pageSize,
            skip: this.messages.length,
          },
        })
        .then(({ data }) => {
          this.isLoading = false
          if (data.messages.length) {
            this.firstMsg = false;
          }
          if (data.messages.length) {
            this.page += 1;
            this.messages.push(...data.messages);
            this.counter = data.counter;
            this.allMessages = data.allMessages;
            this.totalMessage = data.allMessages;
            this.scrollToEnd();
          }
            
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    loadMoreMessages() {
      axios
        .get("/user/messages/" + this.user_id, {
          params: {
            page: this.page,
            per_page: this.pageSize,
            skip: this.messages.length,
          },
        })
        .then(({ data }) => {
          if (data.messages.length) {
            this.page += 1;
            this.messages.unshift(...data.messages.reverse());
            this.counter = data.counter;
            this.allMessages = data.allMessages;
            this.totalMessage = data.allMessages;
          } else {
            // $state.complete();
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    messageSubmit: function() {
      if (this.formData.message != "" && this.formData.message != null) {
        let formData = new FormData();
        let showLoader = false 
        formData.append('message', this.formData.message);
        if (this.formData.photo != "" && this.formData.photo != null){
          showLoader = true
          formData.append('photo', this.formData.photo);
        }
        if (this.formData.zip != "" && this.formData.zip != null){
          showLoader = true
          formData.append('zip', this.formData.zip);
        }
        formData.append('id_user', this.formData.id_user);

        axios.post("/user/message/send", formData,{
            headers : {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function( progressEvent ) {
              if(showLoader){
                this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
              }
            }.bind(this)
          }).then(({data}) => {
            if(!data.success){
               swal("Oops", "Something Wrong! Try Again!", "error");
            }
                this.formData.message = "";
                this.uploadPercentage = 0
                this.selectedFileNames = []
                this.refreshMessage(data.last_id)
            
          });
      }else{
        swal("Oops", "Please write something", "error");
      }
    },
    deleteMessage: function() {
        swal({
            title: "Are you sure?",
            text: "Confirm that you want to delete this conversation",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.get("/user/conversation/delete/"+this.user_id).then(res => {
                    if(res.data.success){
                        swal("Deleted Successfully!", {
                            icon: "success",
                        });
                        this.$router.push({path : '/user/inbox'})
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });

        
            } else {
                swal("Your messages are safe!");
            }
        });
    },
    refreshMessage(last_id = false) {
      console.log(last_id)
        if(this.messages.length > 0 || last_id){
            axios.get("/user/messages/ajax/chat", {
              params:{ 
                  last_id: this.messages.length > 0 ? this.messages[this.messages.length - 1].id : last_id,
                   user_id: this.user_id, 
                   first_msg: this.firstMsg 
                } ,
            })
            .then(({ data }) => {
              if (data.messages.length) {
                  this.firstMsg = false
                    this.messages.push(...data.messages);
                    this.scrolling = true;
                   this.scrollToEnd()
              } else {
                // $state.complete();
              }
            })
            .catch((e) => {
              this.errors.push(e);
            });
        }
    },
    viewMessage(id) {
      this.$router.push({ path: "/user/inbox/" + id });
    },
    handleLoadMore($state) {
      if (this.loadMore) {
        this.noData = false;
        axios
          .get("/user/messages", {
            params: {
              page: this.page,
              per_page: this.pageSize,
            },
          })
          .then((res) => {
            let response = res.data.data.data;
            if (res.data.data.data && response.length > 0) {
              this.page += 1;
              this.messages = this.messages.concat(response);
              response.length < this.pageSize && (this.loadMore = false);
              $state.loaded();
            } else {
              if (this.page == 1) {
                this.noData = true;
              }
              this.loadMore = false;
            }
          });
      }
    },
    SearchMethod: function() {
      if (this.searchText) {
        this.loadMore = true;
        this.page = 1;
        this.messages = [];
        let status = 1;
        if (this.status == "active") {
          status = 1;
        } else if (this.status == "draft") {
          status = 2;
        } else if (this.status == "closed") {
          status = 3;
        }
        axios
          .get("/user/get-messages/" + status, {
            params: {
              page: this.page++,
              per_page: this.pageSize,
              searchText: this.searchText,
            },
          })
          .then((res) => {
            if (this.page == 2) {
              this.messages = [];
            }
            let response = res.data.data.data;
            this.loadMoreLoader = false;
            this.messages = response;
            console.log(this.messages);
            // Stop scroll-loader
            response.length < this.pageSize && (this.loadMore = false);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      } else {
        this.showLoader = true;
        this.tabs = 0;
        this.loadMore = true;
        this.page = 1;
        this.messages = [];
        this.getmessages(this.status);
      }
    },
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },
  mounted: function() {
    setInterval(this.refreshMessage, 3000);
  },
  filters: {
    filterMY: function(value) {
      const date = new Date(value);
      return moment(date).format("MMMM YYYY");
    },
     diffDay: function (value) {
        const deadline = new Date(value)
        return moment(deadline, "YYYYMMDDHHIISS").fromNow();
    }
  },
};
</script>

<style>
.kk-messages .card {
  border-radius: 0;
  border: 1px dashed #28b97b;
  background: #ebf8ffc4;
}
.kk-messages .card-header {
  border: none;
  background: #28b97b;
  color: #fff;
  font-weight: 700;
  border-radius: 0;
}
.kk-messages .search {
  position: absolute;
  right: 5px;
  width: 180px;
  height: 35px;
  top: 5px;
  background: #ebf8ffc4;
  border: 1px solid #c3b7b0;
  border-radius: 50px;
}
.text-small {
  font-weight: 400;
  font-size: 12px;
  color: #6d6d6d;
}
.media-body {
  color: #313131;
}
.theme--light.v-skeleton-loader .v-skeleton-loader__table-heading {
  background: #e1e8ec !important;
}
.message {
  padding: 6px 14px 7px !important;
  border-radius: 25px !important;
  background-color: #a16744;
}
.rounded-bottom-right-0 {
  border-bottom-right-radius: 0 !important;
}
.rounded-bottom-left-0 {
  border-bottom-left-radius: 0 !important;
}
#button-reply-msg i {
  transform: rotate(-45deg);
  font-size: 20px;
  font-weight: 700;
}
.kk-message-box{
      overflow: hidden;
    overflow-wrap: break-word;
    height: 50px !important;
    box-shadow: 0px 0px 6px 0px #b3b3b3;
    padding: 5px;
    margin-bottom: 10px;
}
.kk-message-box:focus {
    overflow: hidden;
    overflow-wrap: break-word;
    height: 50px !important;
    box-shadow: 0px 0px 6px 0px #b3b3b3 !important;
    padding: 5px;
    margin-bottom: 10px;
}
.msg-header-btn{
  background: #f0faff;
    padding: 6px;
    margin: 5px;
    border-radius: 5px;
    color: #a26845;
}
.v-progress-linear__background.green.lighten-2 {
    background: #28a745;
    opacity: 0.6 !important;
}
.badge-new{
      background: #e1e6e8;
    color: #8a8db1;
    padding: 5px;
}
</style>
