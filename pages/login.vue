<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Start Qiita-app2!</h1>
        </v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-btn class="info" @click="onClickLogin"> Qiita Login </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  layout: 'noNavigation',
  computed: {
    ...mapGetters(['clientId']),
    ...mapGetters(['authState'])
  },
  methods: {
    ...mapMutations(['setAuthState']),
    onClickLogin() {
      // Qiita認証
      const scope = 'read_qiita'
      const authState = Math.random().toString(32).substring(2) // 'a6dpgjqlq8g' 等
      this.setAuthState({ authState })
      const authUrl = `https://qiita.com/api/v2/oauth/authorize?client_id=${this.clientId}&scope=${scope}&state=${this.authState}`
      window.location.href = authUrl
    }
  }
}
</script>
