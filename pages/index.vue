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
      <!-- <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            認証画面に遷移しますか？
          </v-card-title>
          <v-card-text> OKをクリックすると外部サイトに移動します </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" text @click="onDisagreeDaialog">
              NG
            </v-btn>
            <v-btn color="green darken-1" text @click="onAgreeDaialog">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ store }) {
    if (store.getters['items'].length) {
      return
    }
    await store.dispatch('fetchItems')
    return { dialog: true }
  },
  data: () => ({
    dialog: false
  }),
  // async fetch({ store }) {
  //   if (store.getters.authenticatedUser) {
  //     console.log('getOK')
  //   } else {
  //     console.log('fetchUser')
  //     await store.dispatch('fetchAuthenticatedUser')
  //   }
  // },
  computed: {
    ...mapGetters(['items']),
    ...mapGetters(['currentPage'])
  },
  methods: {
    onClickCard(postId) {
      // 詳細に遷移
      this.$router.push({ name: 'postId', params: { postId } })
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
  }
}
</script>
