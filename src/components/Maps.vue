<template>
  <div :key="map.id" v-for="map in maps">
    <Map :map="map" />
  </div>
</template>

<script>
import Map from "./Map";

export default {
  name: "Maps",
  props: {
    maps: Array,
  },
  components: {
    Map,
  },
};
</script>