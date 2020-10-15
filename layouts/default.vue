<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- FIXME あとでrefactor -->
      <nuxt-link to="/">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <nuxt-link :to="{ name: 'userId', params: { userId: 'nakia' } }">
          <v-list-item>
            <v-list-item-action>
              <v-icon light> mdi-account-circle </v-icon>
            </v-list-item-action>
            <v-list-item-title>My Page</v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      right: true,
      rightDrawer: false,
      title: 'Qiita-app2'
    }
  }
}
</script>
