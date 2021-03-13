<template>
  <div id="app">
    <div id="nav">
      <h1>Mister Toy</h1>
      <ul>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/app">Store</router-link>
        <router-link to="/login">Log In</router-link>
      </ul>
      <section>
        Hello, {{user.fullname}}
      </section>
    </div>
    <router-view />
  </div>
</template>
<script>
  export default {
    created() {
      this.$store.dispatch({
        type: 'loadProducts'
      })
    },
    data() {
      return {
        toys: this.$store.getters.products
      }
    },
    computed: {
      user() {
        return this.$store.getters.user || {
          fullname: 'You are currently not logged in.',
        }
      }
, created() { 
}
    }
  }
</script>