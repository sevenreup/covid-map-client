<template>
  <v-card
    v-if="getPopupData && getPopupData.show"
    class="popup"
    :style="{ transform: `translate(${getPopupData.x +10}px, ${getPopupData.y +15}px )`}"
  >
    <v-container>
      <p>{{ getPopupData.title }}</p>
      <p>{{ getPopupData.description }}</p>
      <p>{{ getPopupData.deaths }}</p>
      <p>{{ getPopupData.confirmed }}</p>
      <p>{{ getPopupData.recovered }}</p>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("api", ["getPopupData"])
  }
};
</script>
<style lang="scss" scoped>
.popup {
  position: absolute;
  width: 250px;
  background: var(--color-secondary);
  top: 0;
  left: 0;
  box-shadow: 0 15px 15px #1c203b3b;
  border-radius: 5px;
}
</style>