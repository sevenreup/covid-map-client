<template>
  <div class="screen-container">
    <div class="screen-section">
      <MapBox :token="accessToken" :layers="layers" />
      <Sidebar @toggle="bsheet = !bsheet" />
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
    console.log(this.$store);
    this.layers = await this.fetchLayers();
  },
  watch: {
    getLayers() {
      this.loadLayers();
    }
  },
  methods: {
    ...mapActions("api", ["fetchLayers", "getActiveLayers",]),
    async loadLayers() {
      this.layers = await this.getActiveLayers();
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