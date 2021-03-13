<template>
  <div>
    <h3>{{toy.name}}</h3>
    <p>Category: {{toy.type}}</p>
    <p>Price: {{toy.price}}</p>
    <p>In Stock: {{toy.inStock}}</p>
    <router-link :to="'/toy/details/'+toy._id">Details</router-link>
    <div v-if="isUserAdmin">
    <el-button @click="removeProduct(toy._id)">x</el-button>
    <el-button @click="editProduct(toy)">Edit</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toyPreview',
    props: {
      toy: Object
    },
    methods: {
      removeProduct(productId) {
        console.log('Removing...', productId);
        this.$store.dispatch({
            type: 'removeProduct',
            productId
          })
          .then(() => {
            console.log('toy removed');
          })
          .catch(err => {
            console.log('toy failed to remove');
          })
      },
      editProduct(toy) {
        this.$emit('clickedEdit', toy)
      }
    },
    computed: {
      isUserAdmin() {
        return this.$store.getters.user?.isAdmin || false
      }
    },
    created() {}
  }
</script>