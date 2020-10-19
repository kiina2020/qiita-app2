<template>
  <p>callback</p>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['clientId']),
    ...mapGetters(['clientSecret']),
    ...mapGetters(['code']),
    ...mapGetters(['token'])
  },
  async mounted() {
    try {
      const { code, state } = this.$route.query
      // FIXME:動的にstateを設定したら修正
      if (state === 'FEDCBA9876543210') {
        this.setCode({ code })
        // アクセストークン取得
        const { token } = await this.$axios.$post(
          `https://qiita.com/api/v2/access_tokens?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${this.code}`
        )
        this.setToken({ token })
        console.log('callback token:' + this.token)
        // 認証済みユーザー取得
        this.$axios.setToken(this.token, 'Bearer') //ログイン中のTokenに書き換え
        const authenticatedUser = await this.$axios.$get(
          'https://qiita.com/api/v2/authenticated_user'
        )
        this.setAuthenticatedUser({ authenticatedUser })
        // ログイン完了画面に遷移
        this.$router.push({ name: 'complete' })
      } else {
        console.log('missing state')
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  methods: mapMutations(['setCode', 'setToken', 'setAuthenticatedUser'])
}
</script>
