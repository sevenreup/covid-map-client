<template>
  <div class="screen-container">
    <div class="screen-section">
      <MapBox :token="accessToken" :layers="layers" />
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
    layers: [],
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
      console.log("loading");
      this.layers = await this.getActiveGeoLayer();
      console.log(this.layers + " con");
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