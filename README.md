# qiita-app2
Qiita api v2から記事を取得して表示するWebアプリ

## 構成

### フレームワーク
- [Nuxt.js](https://ja.nuxtjs.org/guide/)

### 使用ライブラリ
- [@nuxtjs/axios](https://axios.nuxtjs.org/)：axios接続
- [@nuxtjs/vuetify](https://vuetifyjs.com/en/)：UIコンポーネント
- [js-cookie](https://github.com/js-cookie/js-cookie)：vuex永続化
- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)：vuex永続化

### 環境変数（別途お伝えします）
- CLIENT_ID
- CLIENT_SECRET
- QIITA_TOKEN

### セットアップ手順
 リポジトリをチェックアウト後、ローカル環境でdevサーバを立ち上げて確認してください。（localhost:3000にアクセス）

```bash
# checkout this repository
git clone https://github.com/kiina2020/qiita-app2.git
# install dependencies
cd (your path)/qiita-app2/

$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

```