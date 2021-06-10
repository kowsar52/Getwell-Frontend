<template>
       <Loading
            :active.sync="isLoading"
            :is-full-page="true"
            color="#22dbd7"
            background-color="#fff"
            loader="dots"
        ></Loading>
</template>

<script>
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "LoadingComponent",
  components:{
    Loading
  },
  data() {
    return {
      isLoading : false,
    }
  },
};
</script>
