<template>
  <v-row justify="center" align="center">
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card
        hover
        :to="{ name: 'postId', params: { postId: item.id } }"
        color="#1F7087"
        dark
        @click="onClickCard(item.id)"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.title" />
            <v-card-subtitle v-text="item.user.id" />
            <v-card-text v-text="item.body.slice(0, 150)" />

            <v-card-actions>
              <!-- action -->
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <v-btn v-if="currentPage !== 1" elevation="2" @click="showPrev">
        Prev
      </v-btn>
      <v-btn elevation="2" @click="showNext"> Next </v-btn>
      <!-- <VDialog :dialog="dialog" /> -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            アプリケーションを認証しますか？
          </v-card-title>
          <v-card-text>
            このアプリケーションは以下の情報にアクセスする可能性があります
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" text @click="onDisagreeDaialog">
              認証しない
            </v-btn>
            <v-btn color="green darken-1" text @click="onAgreeDaialog">
              認証する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
// import VDialog from '~/components/VDialog/index'
export default {
  async asyncData({ store }) {
    const client_id = process.env.CLIENT_ID

    if (store.getters['items'].length) {
      return
    }
    await store.dispatch('fetchItems')
    console.log(process.env.CLIENT_ID)
    return { dialog: true, client_id }
  },
  computed: {
    ...mapGetters(['items']),
    ...mapGetters(['currentPage']),
    getAuthUrl() {
      const scope = 'read_qiita'
      // FIXME:乱数つくる
      const state = 'FEDCBA9876543210'
      return `https://qiita.com/api/v2/oauth/authorize?client_id=${this.client_id}&scope=${scope}&state=${state}`
    }
  },
  methods: {
    onClickCard(postId) {
      // 詳細に遷移
      this.$router.push({ name: 'postId', params: { postId } })
    },
    // モーダル表示制御
    onAgreeDaialog() {
      // FIXME readの認可が必要なページはすべて必要？
      window.open(this.getAuthUrl, '_blank')
      this.dialog = false
    },
    onDisagreeDaialog() {
      this.dialog = false
    },
    async showNext() {
      // FIXME:普通にparam.idを使ってrouter.pushした方がいい気がしてきた
      const nextPage = this.currentPage + 1
      // 次の10件を表示
      this.$store.dispatch('setCurrentPage', nextPage)
    },
    async showPrev() {
      const prevPage = this.currentPage - 1
      // 前の10件を表示
      this.$store.dispatch('setCurrentPage', prevPage)
    }
  },
  // components: {
  //   VDialog
  // },
  data: () => ({
    dialog: false
  })
}
</script>
