<template>
  <div>
    <MapBox :token="accessToken" :layers="layers" />
  </div>
</template>
<script>
import MapBox from "../components/mapper/MapBox";
import { mapActions } from "vuex";


export default {
  name: "Home",
  components: {
    MapBox
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
