<template>
  <div class="about">
    <h1>This is an about page</h1>
    <gMapCmp class="map"></gMapCmp>
  </div>
</template>
<script>

  import gMapCmp from "@/cmps/map.vue";
  
  export default {
    name: 'about',
   
    components: {
      gMapCmp
    }
  }
</script>

