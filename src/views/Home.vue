<template>
  <div class="screen-container">
    <div class="screen-section">
      <MapBox :token="accessToken" :layers="geolayers" />
      <Sidebar @toggle="bsheet = !bsheet" :layers="getLayers" />
      <Settings v-model="bsheet" />
    </div>
  </div>
</template>
<script>
import MapBox from "../components/mapper/MapBox";
import Sidebar from "../components/widgets/Sidebar";
import Settings from "../components/widgets/Settings";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    MapBox,
    Sidebar,
    Settings
  },
  props: {},
  data: () => ({
    geolayers: [],
    bsheet: false
  }),
  computed: {
    ...mapGetters("api", ["getLayers"]),
    accessToken() {
      return process.env.VUE_APP_TOKEN;
    }
  },
  async mounted() {
    await this.fetchGeoJson();
    this.fetchLayers();
  },
  watch: {
    getLayers() {
      this.loadLayers();
    }
  },
  methods: {
    ...mapActions("api", ["fetchLayers", "fetchGeoJson", "getActiveGeoLayer"]),
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
}
</style>