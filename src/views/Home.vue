<template>
  <div class="screen-container">
    <div class="screen-section">
      <div class="loading" v-show="isDataLoading">
        <v-progress-circular :size="100" indeterminate color="purple"></v-progress-circular>
      </div>
      <MapBox :token="accessToken" :layers="geolayers" />
      <Sidebar @toggle="bsheet = !bsheet" :layers="getLayers" />
      <Settings :visuals="getVisualizations" />
      <Pop />
    </div>
  </div>
</template>
<script>
import MapBox from "../components/mapper/MapBox";
import Sidebar from "../components/widgets/Sidebar";
import Settings from "../components/widgets/Settings";
import Pop from "../components/mapper/Pop";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    MapBox,
    Sidebar,
    Settings,
    Pop
  },
  props: {},
  data: () => ({
    geolayers: []
  }),
  computed: {
    ...mapGetters("api", ["getLayers", "getVisualizations", "isDataLoading"]),
    accessToken() {
      return process.env.VUE_APP_TOKEN;
    }
  },
  async mounted() {
    await this.fetchGeoJson();
    await this.fetchScatterplot();
    this.fetchLayers();
  },
  watch: {
    getLayers() {
      this.loadLayers();
    },
    getVisualizations() {
      this.loadLayers();
    }
  },
  methods: {
    ...mapActions("api", [
      "fetchLayers",
      "fetchGeoJson",
      "fetchScatterplot",
      "getActiveGeoLayer"
    ]),
    async loadLayers() {
      this.geolayers = await this.getActiveGeoLayer();
    }
  }
};
</script>
<style lang="scss" scoped>
.screen-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .screen-section {
    display: flex;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
  }
}
</style>