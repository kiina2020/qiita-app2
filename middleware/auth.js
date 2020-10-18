export default function ({ store, route, redirect }) {
  if (store.getters.authenticatedUser.id) {
    // ユーザーが認証済みならそのまま
    return
  } else if (route.query.code && route.query.state) {
    // 認可済みならアクセストークン取得
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
    // なにもしてないならログイン画面へ
    console.log('failed auth')
    return redirect('/login')
  }
}
