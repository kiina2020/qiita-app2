<template>
  <v-row justify="center" align="center">
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card
        hover
        class="card"
        :to="{ name: 'postId', params: { postId: item.id } }"
        dark
        @click="onClickCard(item.id)"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-title class="headline" v-text="item.title" />
              </v-col>
              <v-col justify="right" align="right">
                <v-card-subtitle class="user-id" v-text="item.user.id" />
              </v-col>
            </v-row>
            <v-card-text v-text="`${item.body.slice(0, 150)}......`" />
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
  middleware: 'auth',
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
<style>
.user-id {
  padding-bottom: 0;
  padding-top: 0;
}

.card:hover {
  color: #ffffff;
  background-color: #1f7087;
  cursor: pointer;
}
</style>
