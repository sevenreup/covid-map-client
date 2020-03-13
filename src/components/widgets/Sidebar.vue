<template>
  <div class="sidebar">
    <!-- <v-fab-transition>
      <v-btn color="pink" dark fab @click="hidden = !hidden">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-navigation-drawer floating permanent v-show="hidden">
      <v-list dense rounded>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    
    <v-speed-dial
      v-model="fab"
      :top="true"
      :left="true"
      :direction="direction"
      :open-on-hover="true"
      :transition="transition"
    >
      <v-btn slot="activator" color="blue darken-2" dark fab hover v-model="fab">
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-avatar>
            <v-icon>chat_bubble</v-icon>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" }
    ],
    hidden: true,
    fab: false,
    direction: "bottom",
    transition: "slide-y-reverse-transition"
  })
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  z-index: 100000;
}
.v-fade {
  display: inherit !important; /* override v-show display: none */
  transition: opacity 0.5s;
}

.v-fade[style*="display: none;"] {
  opacity: 0;
  pointer-events: none; /* disable user interaction */
  user-select: none; /* disable user selection */
}
</style>