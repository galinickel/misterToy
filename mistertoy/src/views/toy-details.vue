<template>
    <section class="toy-details" v-if="toy">
        <div class="details-container">
            <router-link to="/app">Back to Toys</router-link>
            <h3>Toy Name: {{toy.name}}</h3>
            <p>Toy Type: {{toy.type}}</p>
            <p>In Stock: {{isInStock}}</p>
            <ul class="review-list">
                <li v-for="(review,idx) in reviews" :key="idx" class="review-item">
                    <p>By: {{review.byUser.fullname}}</p>
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
    import {
        reviewService
    } from '../services/review.service.js'

    export default {
        name: 'toy-details',
        data() {
            return {
                toy: null,
                reviews: null
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
            const id = this.$route.params.toyId
            toyService.getById(id)
                .then(toy => {
                    this.toy = toy
                })
            this.setReviews(id)
        },
        methods: {
            removeReview(idx) {
                console.log('removing', this.toy.reviews[idx]);
                this.toy.reviews.splice(idx, 1)
                toyService.save(this.toy)
            },
            showStars(num) {
                return '⭐'.repeat(num)
            },
            async setReviews(toyId) {
                this.reviews = await reviewService.query({
                    toyId
                })
            }
        },
        components: {
            addReview
        }
    }
</script>