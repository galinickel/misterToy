<template>
  <div class="hello">
    <div>
      <ul class="toy-list">
        <li v-for="toy in toys" v-bind:key="toy._id">
          <toy-preview :toy="toy" @clickedEdit="prepareEdit(toy)" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import toyPreview from "../cmps/toy-preview.vue"
  export default {
    name: 'toyList',
    methods: {
      editProduct(toy) {
        console.log(toy._id);
      },
      prepareEdit(toy) {
        this.$emit('editProduct', toy)
      }
    },
    computed: {
      toys() {
        return this.$store.getters.toys
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