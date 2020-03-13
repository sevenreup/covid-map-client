<template>
  <v-bottom-sheet v-model="value" inset>
    <v-card class="text-center" tile>
      <v-card-title>ass</v-card-title>
    </v-card>
  </v-bottom-sheet>
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