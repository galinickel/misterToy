<template>
    <div id="nav">
        <div>
        <h1>Mister Toy</h1>
            Hello, {{user.fullname}}
        </div>
        <ul>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/app">Store</router-link>
            <router-link to="/login">Log In</router-link>
        </ul>

    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.getters.user || {
                    fullname: 'You are currently not logged in.',
                }
            }
        }
    }
</script>