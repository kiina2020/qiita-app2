<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          {{ user.id }}
        </v-card-title>
        <hr />
        <v-card-text>
          <div>{{ user.description }}</div>
          <br />
          <div>投稿:{{ user.items_count }}</div>
          <div>フォロー：{{ user.followees_count }}</div>
          <div>フォロワー：{{ user.followers_count }}</div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-subheader>Posts</v-subheader>
        <v-list three-line>
          <template v-for="(item, index) in userItems">
            <v-divider :key="index" />
            <!-- <nuxt-link :to="{ name: 'postId', params: { postId: item.id }}">{{ item.title }}</nuxt-link> -->
            <v-list-item :key="item.title">
              <v-list-item-content>
                <v-list-item-title v-html="item.title" />
                <v-list-item-subtitle v-html="item.subtitle" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  async asyncData({ app, route }) {
    const user = await app.$axios.$get(
      `https://qiita.com/api/v2/users/${route.params.userId}`
    )
    // const user = await app.$axios.$get(`https://qiita.com/api/v2/users/nakia`)

    const userItems = await app.$axios.$get(
      `https://qiita.com/api/v2/users/${route.params.userId}/items?page=1&per_page=20`
    )

    return { user, userItems }
  },
  data: () => ({
    items: [
      {
        title: '記事のタイトル',
        subtitle: '記事の本文'
      },
      {
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      {
        title: 'Oui oui',
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      {
        title: 'Birthday gift',
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        title: 'Recipe to try',
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  })
}
</script>
