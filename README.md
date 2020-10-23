# qiita-app2
Qiita api v2から記事を取得して表示するWebアプリ

# 構成

## フレームワーク
- [Nuxt.js](https://ja.nuxtjs.org/guide/)

## 使用ライブラリ
- [@nuxtjs/axios](https://axios.nuxtjs.org/)：axios接続
- [@nuxtjs/vuetify](https://vuetifyjs.com/en/)：UIコンポーネント
- [js-cookie](https://github.com/js-cookie/js-cookie)：vuex永続化
- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)：vuex永続化

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
