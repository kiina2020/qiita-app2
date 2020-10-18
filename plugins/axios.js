export default function ({ $axios, store }) {
  // nuxt 公式のaxiosモジュールを拡張してアクセストークンを保存
  // https://axios.nuxtjs.org/helpers#interceptors
  $axios.onRequest(config => {
    console.log('store.getters.token:' + store.getters.token)
    if (store.getters.token) {
      console.log(`axiostoken:${store.getters.token}`)
      // config.headers.common['Authorization'] = process.env.QIITA_TOKEN
      config.headers.common['Authorization'] = store.getters.token
    } else if (process.env.QIITA_TOKEN) {
      console.log(`envtoken:${process.env.QIITA_TOKEN}`)
      config.headers.common['Authorization'] = process.env.QIITA_TOKEN
    }
    return config
  })
}
