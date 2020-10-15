<template>
  <v-row justify="center" align="center">
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card hover :to="{ name: 'postId' }" color="#1F7087" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.title" />
            <nuxt-link
              :to="{ name: 'userId', params: { userId: item.user.id } }"
            >
              <v-card-subtitle v-text="item.user.id" />
            </nuxt-link>

            <v-card-text v-text="item.body.slice(0, 150)" />

            <v-card-actions>
              <!-- action -->
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <!-- <v-btn v-if="currentPage!==1" @click="showPrev" elevation="2">Prev</v-btn> -->
      <v-btn elevation="2"> Prev </v-btn>
      <v-btn elevation="2"> Next </v-btn>
      <!-- <v-btn @click="showNext" elevation="2">Next</v-btn> -->
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
  },
  computed: {
    ...mapGetters(['items']),
    ...mapGetters(['currentPage'])
  },
  methods: {
    onClickCard(postId) {
      // 詳細に遷移
      // this.$router.push({ path: `/${postId}`})
      this.$router.push({ name: 'postId', params: { postId } })
    }
  },
  data: () => ({
    //
  })
}
</script>
