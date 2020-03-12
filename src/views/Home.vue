<template>
  <div >
    <MapBox :token="accessToken" />
  </div>
</template>
<script>
import MapBox from "../components/mapper/MapBox";

export default {
  name: "Home",
  components: {
    MapBox
  },
  props: {},
  data: () => ({}),
  computed: {
    accessToken() {
      return process.env.VUE_APP_TOKEN;
    }
  }
};
</script>
