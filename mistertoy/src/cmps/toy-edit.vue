<template>
  <div>
    <h3 v-if="product.name !== ''">Edit Product</h3>
    <h3 v-else>Add Product</h3>
    <form @submit.prevent="saveProduct">
      <el-input style="width:25%" type="text" placeholder="Name" v-model="product.name" />
      <el-input style="width:10%" type="number" placeholder="Price" v-model.number="product.price" />
      <label>
        <input type="radio" v-model="product.type" value="Family Friendly" /> Family Friendly
      </label>
      <label>
        <input type="radio" v-model="product.type" value="Sporty" /> Sporty
      </label>
      <label>
        <input type="radio" v-model="product.type" value="Science" /> Science
      </label>
      <label>
        <input type="radio" v-model="product.type" value="Outdoors" /> Outdoors
      </label>
      <label>
        <input type="radio" v-model="product.type" value="Funny" /> Funny
      </label>
      <el-button @click="saveProduct">Save</el-button>
    </form>
          <el-button @click="clearProduct">Clear</el-button>
  </div>
</template>

<script>
import toyService from "../services/toy-service.js"
  export default {
    
    name: 'toyPreview',
    props: {
      product: Object
    },
    data(){
      return{}
    },
    methods: {
      saveProduct() {
        console.log('Saving...', this.product);
        this.$store.dispatch({
            type: 'saveProduct',
            product: this.product
          })
          .then(() => {
            this.clearProduct()
          })
      },
      clearProduct() { 
        this.$emit('getEmptyProduct')
      },
      setProductToEdit(){
        this.setProductToEdit = this.product
      }
    },
    computed: {},
    created() {

    }
  }
</script>