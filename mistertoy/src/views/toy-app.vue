<template>
  <div class="home">
    <h1>Toy Store</h1>
    <toyFilter @filterSet="setFilteredProducts" />
    <toyList :msg="'This is toy list'" :toys="toys" @editProduct="editToy" />
    <toyEdit :toy="productToEdit" @getEmptyProduct="getEmptyProduct" />
  </div>
</template>

<script>
  import {
    toyService
  } from "../services/toy-service.js"
  import toyList from '../cmps/toy-list.vue'
  import toyEdit from '../cmps/toy-edit.vue'
  import toyFilter from '../cmps/toy-filter.vue'
  

  export default {
    name: 'app',
    data() {
      return {
        productToEdit: toyService.getEmptyProduct(),
      }
    },
    methods: {
      loadProducts() {
        this.$store.dispatch({
          type: 'loadProducts'
        })
      },
      editToy(toy) {
        this.productToEdit = {
          ...toy
        }
      },
      getEmptyProduct() {
        this.productToEdit = toyService.getEmptyProduct()
      },
      setFilteredProducts(filterBy) {
        toyService.setFilter(filterBy)
              this.loadProducts()
      }
    },
    computed: {
      toys() {
        return this.$store.getters.toys
      },
    },
    created() {
      this.loadProducts()
    },
    components: {
      toyList,
      toyEdit,
      toyFilter
    }
  }
</script>