<template>
  <!-- 使ってないページ -->
  <v-row justify="center" align="center">
    <v-col>
      <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">
            Login completed！ Welcome, {{ authenticatedUser.name }}
          </h1>
        </v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-btn class="info" @click="onClickStart"> Start </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['authenticatedUser'])
  },
  methods: {
    onClickStart() {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
