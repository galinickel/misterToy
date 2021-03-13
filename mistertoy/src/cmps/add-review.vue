<template>
    <section v-if="loggedinUser" class="toy-review">
        <h2>Write a review about: <h1 class="capitalize">{{toy.name}}</h1>
        </h2>
        <form @submit.prevent="submitReview">
            <p for="full-name">Full Name: {{loggedinUser.fullname}} </p>
            <label for="review-text">Review: </label>
            <textarea rows="12" id="review-text" placeholder="place your review" type="text"
                v-model="review.txt"></textarea>
            <span class="rate-with-stars">
                <h5>Rate this toy</h5>
                <ol class="star-list">
                    <span class="star star-1 fa fa-star" @click="updateStarCount(1)"></span>
                    <span class="star star-2 fa fa-star" @click="updateStarCount(2)"></span>
                    <span class="star star-3 fa fa-star" @click="updateStarCount(3)"></span>
                    <span class="star star-4 fa fa-star" @click="updateStarCount(4)"></span>
                    <span class="star star-5 fa fa-star" @click="updateStarCount(5)"></span>
                </ol>
            </span>
            <button>Submit</button>
        </form>
    </section>
</template>

<script>
    import {
        toyService
    } from '../services/toy-service';
    export default {
        name: 'toyReview',
        props: ['toy'],
        data() {
            return {
                review: {
                    starCount: null,
                    txt: ''
                }
            }
        },
        methods: {
            updateStarCount(starCount) {
                for (let i = 1; i <= 5; i++) {
                    document.querySelector(`.star-${i}`).classList.remove('selected')
                }
                this.review.starCount = starCount;
                for (let i = 1; i <= starCount; i++) {
                    document.querySelector(`.star-${i}`).classList.add('selected')
                }
            },
            submitReview() {
                this.review.user = this.loggedinUser
                this.toy.reviews.push(this.review)
                toyService.save(this.toy)
                console.log(this.toy);
            }
        },
        computed: {
            loggedinUser() {
                return this.$store.getters.user
            }
        }
    }
</script>