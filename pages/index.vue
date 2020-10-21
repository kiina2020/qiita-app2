<template>
  <v-row justify="center" align="center">
    <!-- <p>{{ authenticatedUser.id }}でログイン中</p> -->
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
      <v-row>
        <v-col>
          <v-btn v-if="currentPage !== 1" elevation="2" @click="showPrev">
            Prev
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col class="next-button-wrapper" justify="right" align="right">
          <v-btn class="next-button" elevation="2" @click="showNext">
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // middleware: 'auth',
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
  computed: {
    ...mapGetters(['items']),
    ...mapGetters(['currentPage']),
    ...mapGetters(['authenticatedUser'])
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
<style></style>
