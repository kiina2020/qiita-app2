<template>
  <v-row justify="center" align="center">
    <v-col v-for="(item, i) in items" :key="i" cols="12">
      <v-card hover :to="{ name: 'postId' }" color="#1F7087" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.title" />

            <v-card-subtitle v-text="item.userId" />

            <v-card-text v-text="item.body" />

            <v-card-actions>
              <!-- action -->
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col>
      <!-- <v-btn v-if="currentPage!==1" @click="showPrev" elevation="2">Prev</v-btn> -->
      <v-btn elevation="2">Prev</v-btn>
      <v-btn elevation="2">Next</v-btn>
      <!-- <v-btn @click="showNext" elevation="2">Next</v-btn> -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'item.title',
        body: 'item.body.slice(0,150)',
        userId: 'item.user.id'
      },
      {
        title: 'item.title',
        body: 'item.body.slice(0,150)',
        userId: 'item.user.id'
      },
      {
        title: 'item.title',
        body: 'item.body.slice(0,150)',
        userId: 'item.user.id'
      },
      {
        title: 'Halcyon Days',
        body: 'item.body.slice(0,150)',
        userId: 'Ellie Goulding'
      }
    ]
  })
}
</script>
