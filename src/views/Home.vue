<template>
  <div class="screen-container">
    <div class="screen-section">
      <MapBox :token="accessToken" :layers="layers" />
      <Sidebar />
    </div>
  </div>
</template>
<script>
import MapBox from "../components/mapper/MapBox";
import Sidebar from "../components/widgets/Sidebar";
import { mapActions } from "vuex";


export default {
  name: "Home",
  components: {
   MapBox,
    Sidebar
  },
  props: {},
  data: () => ({
    layers: []
  }),
  computed: {
    accessToken() {
      return process.env.VUE_APP_TOKEN;
    }
  },
  async mounted() {
    console.log(this.$store);
    this.fetchLayers();
  },
  methods: {
    ...mapActions('api', ['fetchLayers']),
    async getLayers() {}
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