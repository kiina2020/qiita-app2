<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card width="400px" class="mx-auto mt-5">
        <!-- <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              @click:append="showPassword = !showPassword"
            />
            <v-card-actions>
              <v-btn class="info"> Login </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text> -->
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-btn class="info" @click="onClickLogin"> Login </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'noNavigation',
  computed: {
    ...mapGetters(['clientId'])
  },
  methods: {
    onClickLogin() {
      // あとでstateを動的に
      // Qiita認証
      const scope = 'read_qiita'
      const state = 'FEDCBA9876543210' // FIXME:毎回生成するように修正
      const authUrl = `https://qiita.com/api/v2/oauth/authorize?client_id=${this.clientId}&scope=${scope}&state=${state}`
      window.open(authUrl, '_blank', 'noopener noreferrer')
    }
  }
  // data: () => ({
  //   showPassword: false
  // })
}
</script>
