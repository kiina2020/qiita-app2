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

        const { token } = await this.$axios.$post(
          `https://qiita.com/api/v2/access_tokens?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${this.code}`
        )
        this.setToken({ token })
        console.log('callbacktoken:' + this.token)
      }
      this.$router.replace('/complete')
    } catch (error) {
      console.log(error.message)
    }
  },
  methods: mapMutations(['setCode', 'setToken'])
}
</script>
