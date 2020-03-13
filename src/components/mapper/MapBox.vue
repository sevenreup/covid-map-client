<template>
  <div class="deck-container">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Deck } from "@deck.gl/core";
import mapboxgl from "mapbox-gl";

export default {
  name: "MapBox",
  components: {},
  props: {
    token: String,
    mapstyle: {
      type: String,
      default: null
    },
    layers: Array
  },
  data: () => ({
    map: null,
    deck: null,
    view: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      pitch: 0,
      bearing: 0
    }
  }),
  watch: {
    layers(value) {
      this.deck.setProps({
        layers: value
      });
    }
  },
  mounted() {
    this.setupMapBox();
    this.setupDeckGl();
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
        center: [this.view.longitude, this.view.latitude],
        zoom: this.view.zoom,
        pitch: this.view.pitch,
        bearing: this.view.bearing
      });
    },
    setupDeckGl() {
      this.deck = new Deck({
        canvas: this.$refs.canvas,
        width: "100%",
        height: "100%",
        initialViewState: this.view,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          this.map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          });
          this.$emit("mapviewChanged");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.deck-container {
  width: 100%;
  height: 100%;
  position: relative;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e5e9ec;
  overflow: hidden;
}
#deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style> 