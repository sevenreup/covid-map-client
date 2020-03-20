<template>
  <div class="sidebar">
    <template>
      <FadeTransition>
        <v-btn fab @click="menu = !menu" v-show="!menu">
          <v-icon>layers</v-icon>
        </v-btn>
      </FadeTransition>
      <CollapseTransition>
        <v-card v-show="menu">
          <v-list>
            <v-subheader>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Layers</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action @click="menu = false">
                  <v-icon>close</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-subheader>
            <v-list-item v-for="layer in layers" :key="layer.id" @click="setActiveLayer(layer.id)">
              <v-list-item-avatar>
                <v-icon v-if="layer.isActive">visibility</v-icon>
                <v-icon v-else>visibility_off</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <h4>{{ layer.name }}</h4>
                  </v-col>
                  <v-col>
                    <p>{{ layer.value }}</p>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </CollapseTransition>
    </template>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { CollapseTransition } from "vue2-transitions";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    CollapseTransition,
    FadeTransition
  },
  data: () => ({
    menu: false,
    direction: "bottom",
    transition: "slide-y-reverse-transition",
    sitem: null
  }),
  props: {
    layers: Array
  },
  methods: {
    ...mapActions("api", ["setActiveLayer"]),
    togglerControl() {}
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 12px;
  left: 12px;
}
</style>