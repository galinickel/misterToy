<template>
  <div>
    <h3>{{product.name}}</h3>
    <p>Category: {{product.type}}</p>
    <p>Price: {{product.price}}</p>
    <el-button @click="removeProduct(product._id)">x</el-button>
    <router-link :to="'/toy/details/'+product._id">Details</router-link>
    <el-button @click="editProduct(product)">Edit</el-button>
  </div>
</template>

<script>
  export default {
    name: 'toyPreview',
    props: {
      product: Object
    },
    methods: {
      removeProduct(productId) {
        console.log('Removing...', productId);
        this.$store.dispatch({
            type: 'removeProduct',
            productId
          })
          .then(() => {
            console.log('product removed');
            // showMsg('Product removed')
          })
          .catch(err => {
            console.log('product failed to remove');
            // showMsg('Cannot remove product', 'danger')
          })
      },
      editProduct(product) {
        this.$emit('clickedEdit',product)
      }
    },
    computed: {},
    created() {}
  }
</script>