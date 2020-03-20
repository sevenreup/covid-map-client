<template>
  <div class="settings">
    <v-btn fab class="toggler">
      <v-icon>map</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="value" inset>
      <v-card class="text-center" tile>
        <v-card-title>ass</v-card-title>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  props: ["value"],
  methods: {
    updateDate() {
      this.$emit("something", {});
    }
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
</style>