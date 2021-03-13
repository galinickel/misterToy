<template>
  <div>
    <h3 v-if="toy._id !== ''">Edit Toy</h3>
    <h3 v-else>Add Toy</h3>
    <form @submit.prevent="saveProduct">
      <el-input style="width:25%" type="text" placeholder="Name" v-model="toy.name" />
      <el-input style="width:10%" type="number" placeholder="Price" v-model.number="toy.price" />
      <label>
        <input type="radio" v-model="toy.type" value="Family Friendly" /> Family Friendly
      </label>
      <label>
        <input type="radio" v-model="toy.type" value="Sporty" /> Sporty
      </label>
      <label>
        <input type="radio" v-model="toy.type" value="Science" /> Science
      </label>
      <label>
        <input type="radio" v-model="toy.type" value="Outdoors" /> Outdoors
      </label>
      <label>
        <input type="radio" v-model="toy.type" value="Funny" /> Funny
      </label>
       <label>
        <input type="checkbox" v-model="toy.inStock"/> In Stock
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
      toy: Object
    },
    data(){
      return{}
    },
    methods: {
      saveProduct() {
        console.log('Saving...', this.toy);
        this.$store.dispatch({
            type: 'saveProduct',
            toy: this.toy
          })
          .then(() => {
            this.clearProduct()
          })
      },
      clearProduct() { 
        this.$emit('getEmptyProduct')
      },
      setProductToEdit(){
        this.setProductToEdit = this.toy
      }
    },
    computed: {},
    created() {

    }
  }
</script>