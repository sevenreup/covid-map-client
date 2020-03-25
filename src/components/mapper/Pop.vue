<template>
  <v-card
    v-if="getPopupData && getPopupData.show"
    class="popup"
    :style="{ transform: `translate(${getPopupData.x +10}px, ${getPopupData.y +15}px )`}"
  >
    <v-container>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>map</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span>{{ getPopupData.title }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span>{{ getPopupData.description }}</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>Deaths</v-list-item-content>
          <span>{{ getPopupData.deaths }}</span>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>Confirmed</v-list-item-content>
          <span>{{ getPopupData.confirmed }}</span>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>Recovered</v-list-item-content>
          <span>{{ getPopupData.recovered }}</span>
        </v-list-item>
      </v-list>
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
  top: 0;
  left: 0;
  box-shadow: 0 15px 15px #1c203b3b;
  border-radius: 5px;
}
</style>