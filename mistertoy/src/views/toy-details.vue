<template>
    <section class="toy-details" v-if="toy">
        <div  class="details-container">
        <router-link to="/app">Back to Toys</router-link>
        <h3>Toy Name: {{toy.name}}</h3>
        <p>Toy Type: {{toy.type}}</p>
        <p>In Stock: {{isInStock}}</p>
        <ul class="review-list">
            <li v-for="(review,idx) in toy.reviews" :key="idx" class="review-item">
                <p>By: {{review.user.fullname}}</p>
                <p>Rating: {{showStars(review.starCount)}}</p>
                <p>"{{review.txt}}"</p>
                <span v-if="isUserAdmin" @click="removeReview(idx)"> X</span>
            </li>
        </ul>
        </div>
        <addReview :toy="toy"></addReview>
    </section>
</template>


<script>
    import {
        toyService
    } from '../services/toy-service.js'
    import addReview from '../cmps/add-review.vue'

    export default {
        name: 'toy-details',
        data() {
            return {
                toy: null
            }
        },
        computed: {
            isInStock() {
                return this.toy.inStock ? 'Yes' : 'No'
            },
            isUserAdmin() {
                return this.$store.getters.user?.isAdmin || false
            }
        },
        created() {
            const idx = this.$route.params.toyId
            console.log('idx at 28', idx)
            toyService.getById(idx)
                .then(toy => {
                    console.log('toy', toy)
                    this.toy = toy
                })
        },
        methods: {
            removeReview(idx) {
                console.log('removing', this.toy.reviews[idx]);
                this.toy.reviews.splice(idx, 1)
                toyService.save(this.toy)
            },
            showStars(num) { 
                return '⭐'.repeat(num)
            }
        },
        components: {
            addReview
        }
    }
</script>