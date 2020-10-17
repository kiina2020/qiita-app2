import Vuex from 'vuex'

const store = {
  state: {
    items: [],
    currentPage: 1,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    code: '',
    state: '',
    token: ''
  },
  getters: {
    items: state => state.items,
    currentPage: state => state.currentPage,
    clientId: state => state.clientId,
    clientSecret: state => state.clientSecret,
    code: state => state.code,
    state: state => state.state,
    token: state => state.token
  },
  mutations: {
    setItems(state, { items }) {
      state.items = items
    },
    setCurrentPage(state, { page }) {
      state.currentPage = page
    },
    setCode(state, { code }) {
      state.code = code
    },
    setToken(state, { token }) {
      state.token = token
    }
  },
  actions: {
    async fetchToken({ commit }) {
      console.log(
        `https://qiita.com/api/v2/access_tokens?client_id=${this.getters.clientId}&client_secret=${this.getters.clientSecret}&code=${this.getters.code}`
      )
      const res = await this.$axios.$post(
        `https://qiita.com/api/v2/access_tokens?client_id=${this.getters.clientId}&client_secret=${this.getters.clientSecret}&code=${this.getters.code}`
      )
      console.log(`res:${res}`)
      commit('setToken', res.token)
    },
    async fetchItems({ commit }) {
      const items = await this.$axios.$get(
        `https://qiita.com/api/v2/items?page=${this.getters.currentPage}&per_page=10`
      )
      commit('setItems', { items })
    },
    setCurrentPage({ dispatch, commit }, page) {
      commit('setCurrentPage', { page })
      dispatch('fetchItems')
    },
    setCode({ commit }, code) {
      commit('setCode', { code })
    }
  }
}
export default () => new Vuex.Store(store)
