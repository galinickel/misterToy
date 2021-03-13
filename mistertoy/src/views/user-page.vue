<template>
    <section v-if="loggedinUser">
        Hello, {{loggedinUser.fullname}}!
        <p v-if="loggedinUser.isAdmin">As admin, you have the authority to modify toys, remove toys and even remove reviews. Use your power responsibly!</p>
        <el-button @click="logout">Logout</el-button>
    </section>
    <section v-else>
        <hr />
        <form >
            <h2>Login</h2>
            <input type="text" placeholder="Your username" v-model="credentials.username" />
            <input type="password" v-model="credentials.password" />
            <el-button @click="login">Login</el-button>
        </form>
        <hr />
        <form>
            <h2>Signup</h2>
            <input type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
            <input type="text" placeholder="Your username" v-model="signupCredentials.username" />
            <input type="password" v-model="signupCredentials.password" />
            <el-button @click="signup">Login</el-button>
        </form>

    </section>
</template>
<script>
    export default {
        name: 'user-page',
        data() {
            return {
                credentials: {
                    username: 'admin',
                    password: 'admin'
                },
                signupCredentials: {
                    username: 'amnon',
                    password: 'am',
                    fullname: 'Amnon Dilfu'
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch({
                    type: 'doLogin',
                    credentials: this.credentials
                })

            },
            signup() {
                this.$store.dispatch({
                    type: 'doSignup',
                    signupCredentials: this.signupCredentials
                })


            },
            logout() {
                this.$store.dispatch({
                    type: 'doLogout'
                })
            }
        },
        computed: {
            loggedinUser() {
                return this.$store.getters.user
            }
        }


    }
</script>