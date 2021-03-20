<template>
  <div :key="map.id" v-for="map in maps">
    <Map :map="map" :mode="mode" />
  </div>
</template>

<script>
import Map from "./Map";

export default {
  name: "Maps",
  props: {
    maps: Array,
    mode: String,
  },
  components: {
    Map,
  },
};
</script>