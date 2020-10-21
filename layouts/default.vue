<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link class="link" :to="{ name: 'index' }">
        <v-toolbar-title class="top-link" v-text="title" />
      </nuxt-link>
      <v-spacer />

      <nuxt-link
        :to="{
          name: 'userId',
          params: { userId: authenticatedUser.id }
        }"
        class="link"
      >
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </nuxt-link>
      <span v-if="authenticatedUser.id" class="login-name">
        {{ authenticatedUser.id }}
      </span>
      <v-btn color="red darken-1" @click="onClickLogout"> Logout </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      clipped: false,
      right: true,
      rightDrawer: false,
      title: 'Qiita-app2'
    }
  },
  computed: {
    ...mapGetters(['clientId']),
    ...mapGetters(['token']),
    ...mapGetters(['authenticatedUser'])
  },
  methods: {
    onClickLogout() {
      // アクセストークン削除
      this.$store.dispatch('deleteToken')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style>
.top-link {
  color: white;
}
.top-link:hover {
  background-color: #383838;
}

.login-name {
  margin-bottom: 0;
  margin-right: 10px;
}
.link {
  text-decoration: none;
}
</style>
