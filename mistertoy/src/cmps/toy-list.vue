<template>
  <div class="hello">
    <div>
      <ul class="toy-list">
        <li v-for="product in products" v-bind:key="product._id">
          <toy-preview :product="product" @clickedEdit="prepareEdit(product)" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import toyPreview from "../cmps/toy-preview.vue"
  export default {
    name: 'toyList',
    props: {},
    methods: {
      editProduct(product) {
        console.log(product._id);
      },
      prepareEdit(product) {
        this.$emit('editProduct', product)
      }
    },
    computed: {
      products() {
        return this.$store.getters.products
      },
      isLoading() {
        return this.$store.getters.isLoading
      },

    },
    components: {
      toyPreview
    }
  }
</script>