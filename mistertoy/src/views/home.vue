<template>
  <div class="home">
    <h1>Mister Toy's Toystore</h1>
    <div class="home-charts ">
    <typeChart v-if="toys.length" :toys="toys" class="chart" />
    <averageChart v-if="toys.length" :toys="toys" class="chart" />

</div>
  </div>
</template>

<script>
  import typeChart from "@/cmps/type-chart.vue";
  import averageChart from "@/cmps/average-chart.vue";

  export default {
    name: 'home',
    computed: {
      toys() {
        return this.$store.getters.products;
      }
    },
    components: {
      typeChart,
      averageChart
    }
  }
</script>