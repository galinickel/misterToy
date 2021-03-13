<script>
  import {
    Pie
  } from 'vue-chartjs'

  export default {
    props: ['toys'],
    extends: Pie,
    mounted() {
      this.renderChart({
        labels: ['Funny', 'Sporty', 'Outdoors', 'Science', 'Family Friendly'],
        datasets: [{
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [this.getData('Funny'), this.getData('Sporty'), this.getData('Outdoors'), this.getData(
            'Science'), this.getData('Family Friendly')]
        }]
      })
    },
    methods: {
      loadProducts() {
        return this.$store.dispatch({
          type: 'loadProducts'
        })
      },
      getData(type) {
        let toysToShow = []
        this.toys.forEach(toy => {
          if (toy.type === type) toysToShow.push(toy)
        });
        return toysToShow.length
      }
    },
  }
</script>
<style>
  .chart {
    width: 500px;
  }
</style>