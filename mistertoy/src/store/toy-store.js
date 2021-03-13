import Vue from 'vue'
import Vuex from 'vuex'
import {
  toyService
} from "../services/toy-service.js"

Vue.use(Vuex)

export const toyStore = ({
  state: {
    products: [],
    filterBy: {}
  },
  getters: {
    products(state) {
      return state.products
    },
  },
  mutations: {
    setIsLoading(state, {
      isLoading
    }) {
      state.isLoading = isLoading;
    },
    setProducts(state, {
      products
    }) {
      state.products = products;
    },
    removeProduct(state, {
      productId
    }) {
      const idx = state.products.findIndex(p => p._id === productId)
      state.products.splice(idx, 1)
    },
    addProduct(state, {
      product
    }) {
      state.products.push(product);
    },
    updateProduct(state, {
      product
    }) {
      const idx = state.products.findIndex(p => p._id === product._id)
      state.products.splice(idx, 1, product);
    },
    setFilter(state, payload) {
      const filter = payload.payload
      state.filterBy = filter
      console.log(state.filterBy);
    }
  },
  actions: {
    loadProducts({
      commit
    }) {
      commit({
        type: 'setIsLoading',
        isLoading: true
      });
      toyService.query()
        .then(products => {

          commit({
            type: 'setProducts',
            products
          });
        })
        .catch(err => {
          console.log('Store: Cannot load products', err);
          throw new Error('Cannot load products');
        })
        .finally(() => {
          commit({
            type: 'setIsLoading',
            isLoading: false
          });
        })
    },
    removeProduct({
      commit
    }, payload) {
      return toyService.remove(payload.productId)
        .then(() => {
          commit(payload)
        })
        .catch(err => {
          console.log('Store: Cannot remove product', err);
          throw new Error('Cannot remove product');
        })
    },
    saveProduct({
      commit
    }, {
      product
    }) {
      const type = (product._id) ? 'updateProduct' : 'addProduct';
      return toyService.save(product)
        .then(savedProduct => {
          commit({
            type,
            product: savedProduct
          })
        })
        .catch(err => {
          console.log('Store: Cannot save product', err);
          throw new Error('Cannot save product');
        })

    },
  },
  modules: {}
})