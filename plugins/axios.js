export default function ({ $axios }) {
  // nuxt 公式のaxiosモジュールを拡張してアクセストークンを保存
  // https://axios.nuxtjs.org/helpers#interceptors
  $axios.onRequest(config => {
    if (process.env.QIITA_TOKEN) {
      config.headers.common['Authorization'] = process.env.QIITA_TOKEN
    }
    return config
  })
}
