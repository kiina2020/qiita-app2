import Vuex from 'vuex'

const store = {
  state: {
    items: [],
    currentPage: 1
  },
  getters: {
    items: state => state.items,
    currentPage: state => state.currentPage
  },
  mutations: {
    setItems(state, { items }) {
      state.items = items
    },
    setCurrentPage(state, { page }) {
      state.currentPage = page
    }
  },
  actions: {
    async fetchItems({ commit }) {
      const items = await this.$axios.$get(
        `https://qiita.com/api/v2/items?page=${this.getters.currentPage}&per_page=10`
      )
      commit('setItems', { items })
    },
    setCurrentPage({ dispatch, commit }, page) {
        commit('setCurrentPage', { page })
        dispatch('fetchItems')
    }
  }
}
export default () => new Vuex.Store(store)
