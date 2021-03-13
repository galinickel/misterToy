<template>
  <div id="app">
    <appHeader/>
    <router-view />
  </div>
</template>
<script>
  import appHeader from './cmps/app-header.vue'
 
  export default {
    created() {
      this.$store.dispatch({
        type: 'loadProducts'
      })
    },
    data() {
      return {
        toys: this.$store.getters.toys
      }
    },
    components: { 
      appHeader
    }
  }
</script>