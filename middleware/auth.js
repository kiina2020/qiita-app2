export default function ({ store, route, redirect }) {
  console.log('AUTH:' + JSON.stringify(route.path))
  if (store.getters.token) {
    console.log('認証済み')
    // ユーザーが認証済みならそのまま
    return
  } else if (route.query.code && route.query.state) {
    console.log('認可済み')
    console.log('route.query:' + JSON.stringify(route.query))
  } else {
    // なにもしてないならログイン画面へ
    console.log('failed auth')
    return redirect('/login')
  }
}
