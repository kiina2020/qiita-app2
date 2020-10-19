export default function ({ $axios, store }) {
  // nuxt 公式のaxiosモジュールを拡張してアクセストークンを保存
  // https://axios.nuxtjs.org/helpers#interceptors
  $axios.onRequest(config => {
    console.log('[ COMMON HEADERS ]' + JSON.stringify(config.headers.common))
    console.log('[ Authorization ]' + config.headers.common['Authorization'])
    console.log('[ TOKEN ]' + store.getters['token'])
    return config
  })

  $axios.onResponse(response => {
    // console.log('[ RESPONSE ]' + response.request.responseURL, response)
    // TODO: If token expires, perform a silent refresh

    return response
  })

  $axios.onError(error => {
    console.error('[ ERROR ]', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      console.log('401エラー')
    }

    return error
  })
}
