<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card-title class="headline">
              {{ post.title }}
            </v-card-title>
          </v-col>
          <v-col class="user-id-wrapper">
            <v-card-text class="user-id">
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
  head() {
    return {
      script: [
        {
          src:
            'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js'
        }
      ]
    }
  },
  methods: {
    moveTop() {
      // 一覧に遷移
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
<style>
.user-id-wrapper {
  position: relative;
}
.user-id {
  position: absolute;
  bottom: 0px;
  right: 10px;
  text-align: right;
  font-size: 1.5rem;
}
.headline {
  text-align: center;
}
.card_rendered-body {
  padding: 20px;
}
.card_rendered-body pre {
  max-width: 100%;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: solid 1px white;
  margin: 1rem;
  padding: 1rem;
  color: gold;
}

hr {
  margin: 10px 0;
}
h1 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
  /* box-sizing: border-box; */
}
</style>
