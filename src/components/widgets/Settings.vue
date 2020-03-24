<template>
  <div class="settings">
    <v-btn fab class="toggler" @click="bottom = !bottom">
      <v-icon>map</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="bottom" inset>
      <v-card class="text-center" tile>
        <v-card-title>
          <v-container>
            <v-row>
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-list>
                      <v-subheader>Visualisations</v-subheader>
                      <v-list-item
                        v-for="visual in visuals"
                        :key="visual.id"
                        :class="['viz-item', { active: visual.isActive }]"
                        @click="setActiveVisualization(visual.id)"
                      >
                        <v-list-item-avatar>
                          <v-icon>{{visual.icon}}</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>{{visual.name}}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-card-title>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    visuals: Array
  },
  data: () => ({
    bottom: false,
    toggle: null
  }),
  methods: {
    ...mapActions("api", ["setActiveVisualization"])
  }
};
</script>
<style lang="scss" scoped>
.settings {
  .toggler {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
.viz-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: var(--color-primary);
  border-left: 3px solid transparent;
  border-bottom: 1px solid var(--border-color);

  i {
    padding: 10px;
    background-color: var(--color-primary-light);
    border-radius: 5px;
    margin-right: 10px;
  }

  &.active {
    color: var(--color-accent);
    border-left: 3px solid var(--color-accent);
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: 0;
  }
  &:hover {
    cursor: pointer;
    background: var(--color-primary-light);
  }
}
</style>