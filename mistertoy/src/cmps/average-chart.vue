<script>
  import {
    Bar
  } from 'vue-chartjs'

  export default {
    props: ['toys'],
    extends: Bar,
    mounted() {
      this.renderChart({
        labels: ['Funny', 'Sporty', 'Outdoors', 'Science', 'Family Friendly'],
        datasets: [{
          label: 'Average Price',
          backgroundColor: '#f87979',
          data: [this.getData('Funny'), this.getData('Sporty'), this.getData('Outdoors'), this.getData(
            'Science'), this.getData('Family Friendly')]
        }],
      },
          {
          scales: {
            yAxes: [{
                      type: 'linear',
              ticks: {
                beginAtZero: true,
                min:0
              }
            }]
          }
        }
      )
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
          if (toy.type === type) toysToShow.push(toy.price)
        });
        if (toysToShow.length <= 1) {
          return toysToShow[0]
        }
        return toysToShow.reduce((a, b) => (a + b)) / toysToShow.length;
      }
    },
  }
</script>
<style>
  .chart {
    width: 500px;
  }
</style>