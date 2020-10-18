export default function ({ store, route }) {
  // ユーザーが認証されていないとき
  if (!store.getters.client_id) {
    // console.log(store.getters.clientId)
  }

  if (route.query.code && route.query.state) {
    // 認可OKだった場合
    const { code, state } = route.query
    // FIXME:動的にstateを設定したい
    if (state === 'FEDCBA9876543210') {
      // 1.アクセストークン取得に使うためcodeをstoreに保存
      store.dispatch('setCode', code)
      // 2.アクセストークンを取得しstoreに格納
      store.dispatch('fetchToken').then(() => {
        console.log('auth token:' + store.getters.token)
      })
      // 3.認証済みUserの取得
      store.dispatch('fetchAuthenticatedUser').then(() => {
        console.log('auth user:' + store.getters.authenticatedUser.id)
      })
    }
  } else {
    console.log('failed auth')
  }
}
// export default function ({ store, redirect }) {
//   // ユーザーが認証されていないとき
//   if (!store.state.authenticated) {
//     return redirect('/login')
//   }
// }
