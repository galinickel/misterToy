<template>
  <div>
    <h3>TOY FILTER</h3>
    <el-input prefix-icon="el-icon-search" @input="setFilter" type="text" placeholder="Search..."
      v-model="filterBy.content" style="width:25%"></el-input>
    <el-select @change="setFilter" v-model="filterBy.type">
      <el-option :value="'Price: Low to High'">Price: Low to High</el-option>
      <el-option :value="'Stock Availability'">Stock Availability</el-option>
      <el-option :value="'Name'">Name</el-option>
    </el-select>
    <el-select @change="setFilter" v-model="filterBy.category">
      <el-option :value="'All Toys'">All Toys</el-option>
      <el-option :value="'Family Friendly'">Family Friendly</el-option>
      <el-option :value="'Sporty'">Sporty</el-option>
      <el-option :value="'Science'">Science</el-option>
      <el-option :value="'Outdoors'">Outdoors</el-option>
      <el-option :value="'Funny'">Funny</el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'toyFilter',
    data() {
      return {
        filterBy: {
          content: '',
          type: '',
          category: ''
        }
      }
    },
    methods: {
      setFilter() {
        this.$emit('filterSet', this.filterBy)
      }
    },
    computed: {},
    created() {}
  }
</script>