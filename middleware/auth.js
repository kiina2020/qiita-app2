export default function ({ store, route, redirect }) {
  if (store.getters.token) {
    // 認証済みならリダイレクトしない
    return
  } else if (route.query.code && route.query.state) {
    // 未認証でも認可済みならリダイレクトしない（コールバック処理）
    // console.log('route.query:' + JSON.stringify(route.query))
    return
  } else {
    // 認可もしてなかったらログイン画面にリダイレクト
    console.log('failed auth')
    return redirect('/login')
  }
}
