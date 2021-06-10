<template>
  <section class="position-relative" style="padding: 3rem 0 !important;">
  <div class="container">
    <div class="row  text-center">
      <div class="col">
        <h1 class="font-weight-bold">{{ page_title}}</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center bg-transparent p-0 m-0">
            <li class="breadcrumb-item">
                <router-link tag="a" :to="{ path : '/'}" class="text-dark">Home</router-link>
            </li>
            <li class="breadcrumb-item active text-primary" aria-current="page">{{ page_title}}</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- / .row -->
  </div>
  <!-- / .container -->
</section>
</template>

<script>
export default {
    name:'Breadcrumb',
    props : ['page_title'],
    data() {
      return {
      }
    },
}
</script>

<style>

</style>