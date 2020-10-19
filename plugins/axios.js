export default function ({ $axios, store, redirect }) {
  // nuxt 公式のaxiosモジュールを拡張してアクセストークンを保存
  // https://axios.nuxtjs.org/helpers#interceptors
  $axios.onRequest(config => {
    console.log('[ COMMON HEADERS ]' + JSON.stringify(config.headers.common))
    console.log(
      '[ Authorization ]' +
        JSON.stringify(config.headers.common['Authorization'])
    )
    console.log('[ TOKEN ]' + store.getters['token'])
    const token = store.getters['token']
    if (token) {
      config.headers.common['Authorization'] = token
    }
    // // console.log('config:' + JSON.stringify(config))
    // // config.headers.common['Authorization'] = process.env.QIITA_TOKEN
    // // config.headers.common['Authorization'] = store.state.token
    // request.headers.common['Authorization'] = store.state.token
    // // console.log(`config,axiostoken:${config.headers.common['Authorization']}`)
    // console.log(`request,axiostoken:${request.headers.common['Authorization']}`)
    // // } else if (process.env.QIITA_TOKEN) {
    // //   console.log(`envtoken:${process.env.QIITA_TOKEN}`)
    // //   config.headers.common['Authorization'] = process.env.QIITA_TOKEN
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
      store.state.sessionStorage.authUser = null
      return redirect('/')
    }

    return error
  })
}
