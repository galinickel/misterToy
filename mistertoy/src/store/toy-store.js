import Vue from 'vue'
import Vuex from 'vuex'
import {
  toyService
} from "../services/toy-service.js"

Vue.use(Vuex)

export const toyStore = ({
  state: {
    toys: [],
    filterBy: {}
  },
  getters: {
    toys(state) {
      return state.toys
    },
  },
  mutations: {
    setIsLoading(state, {
      isLoading
    }) {
      state.isLoading = isLoading;
    },
    setProducts(state, {
      toys
    }) {
      state.toys = toys;
    },
    removeProduct(state, {
      productId
    }) {
      const idx = state.toys.findIndex(p => p._id === productId)
      state.toys.splice(idx, 1)
    },
    addProduct(state, {
      toy
    }) {
      state.toys.push(toy);
    },
    updateProduct(state, {
      toy
    }) {
      const idx = state.toys.findIndex(p => p._id === toy._id)
      state.toys.splice(idx, 1, toy);
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
        .then(toys => {

          commit({
            type: 'setProducts',
            toys
          });
        })
        .catch(err => {
          console.log('Store: Cannot load toys', err);
          throw new Error('Cannot load toys');
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
          console.log('Store: Cannot remove toy', err);
          throw new Error('Cannot remove toy');
        })
    },
    saveProduct({
      commit
    }, {
      toy
    }) {
      const type = (toy._id) ? 'updateProduct' : 'addProduct';
      return toyService.save(toy)
        .then(savedProduct => {
          commit({
            type,
            toy: savedProduct
          })
        })
        .catch(err => {
          console.log('Store: Cannot save toy', err);
          throw new Error('Cannot save toy');
        })

    },
  },
  modules: {}
})