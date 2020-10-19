export default function ({ store, route, redirect }) {
  console.log('AUTH:' + JSON.stringify(route.path))
  if (store.getters.token) {
    console.log('認証済み')
    // ユーザーが認証済みならそのまま
    return
  } else if (route.query.code && route.query.state) {
    console.log('認可済み')
    // 認可済みならアクセストークン取得
    const { code, state } = route.query
    console.log('route.query:' + JSON.stringify(route.query))
    // FIXME:動的にstateを設定したい
    if (state === 'FEDCBA9876543210') {
      // 1.アクセストークン取得に使うためcodeをstoreに保存
      store.dispatch('setCode', code)
      console.log('1.setCode ok')
      // 2.アクセストークンを取得しstoreに格納
      store.dispatch('fetchToken').then(() => {
        console.log('2.fetchToken ok:' + store.getters.token)
        // 3.記事一覧に遷移
        // redirect('/complete')
      })

      // 3.認証済みUserの取得
      // store.dispatch('fetchAuthenticatedUser').then(() => {
      //   console.log('fetchTUser then...:' + store.getteçrs.authenticatedUser.id)
      // })
    } else {
      console.log('miss state:' + console.log(state))
    }
  } else {
    // なにもしてないならログイン画面へ
    console.log('failed auth')
    return redirect('/login')
  }
}
