<template>
  <div class="sidebar">
    <v-btn class="btn-f btn-left" fab :right="true" :top="true" @click="openBtm">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-speed-dial
      class="btn-f"
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
      <v-list rounded>
        <v-list-item-group v-model="sitem" color="primary">
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-avatar>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Confirmed", icon: "chat_bubble", layer: "confirmed" },
      { title: "Recovered", icon: "question_answer", layer: "recovered" },
      { title: "Deaths", icon: "question_answer", layer: "deaths" }
    ],
    hidden: true,
    fab: false,
    direction: "bottom",
    transition: "slide-y-reverse-transition",
    sitem: null
  }), 
  props: {
    layers: Object
  },
  methods: {
    openBtm() {
      this.$emit("toggle");
    },
    layerSwitch(layer) {
      console.log(layer);
    }
  }
};
</script>

<style lang="scss" scoped>
$break-small: 425px;
$break-medium: 800px;
$break-large: 1200px;

.btn-f {
  position: absolute;
  z-index: 100000;
}
.btn-left {
  top: 16px;
  left: 92%;
  @media screen and (max-width: $break-small) {
    left: 80%;
  }
  @media screen and (min-width: $break-medium) {
    left: 88%;
  }
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