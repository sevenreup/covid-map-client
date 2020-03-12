<template>
  <div class="map-container">
    <div id="map" ref="map"></div>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "MapBox",
  components: {},
  props: {
    token: String,
    mapstyle: {
      type: String,
      default: null
    }
  },
  data: () => ({
    map: null,
    latitude: 0,
    longitude: 0,
    zoom: 2,
    pitch: 0,
    bearing: 0
  }),
  mounted() {
    this.setupMapBox();
  },
  methods: {
    setupMapBox() {
      console.log(this.mapstyle);
      console.log(this.token);
      this.map = new mapboxgl.Map({
        accessToken: this.token,
        container: this.$refs.map,
        interactive: false,
        style:
          this.mapstyle ||
          "mapbox://styles/sevenreup4ill/ck7og4m040my31ip436cidd9k",
        center: [this.longitude, this.latitude],
        zoom: this.zoom,
        pitch: this.pitch,
        bearing: this.bearing
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  //   position: relative;
  #map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #e5e9ec;
    overflow: hidden;
  }
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style> 