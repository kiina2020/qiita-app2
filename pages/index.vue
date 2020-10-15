<template>
  <v-row justify="center" align="center">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
    >
      <v-card
        :color="item.color"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
              v-text="item.title"
            ></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>

            <v-card-actions>
              <!-- action -->
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    items: [
      {
        color: '#1F7087',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  })
}
</script>
