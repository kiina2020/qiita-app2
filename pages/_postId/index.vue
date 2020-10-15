<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-row>
          <v-col>
            <v-card-title class="headline">
              {{ post.title }}
            </v-card-title>
          </v-col>
          <v-col>
            <v-card-text>
              <nuxt-link
                :to="{ name: 'userId', params: { userId: post.user.id } }"
              >
                <span> by {{ post.user.id }}</span>
              </nuxt-link>
            </v-card-text>
          </v-col>
        </v-row>
        <hr />
        <v-card-text>
          <!-- XSSの懸念はqiita apiに依存 -->
          <div class="card_rendered-body" v-html="post.rendered_body" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ app, route }) {
    const post = await app.$axios.$get(
      `https://qiita.com/api/v2/items/${route.params.postId}`
    )
    return { post }
  },
  methods: {
    moveTop() {
      // 一覧に遷移
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
