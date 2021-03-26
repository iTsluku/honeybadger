<template>
  <Maps :maps="maps" :mode="mode" />
</template>

<script>
import Maps from "../components/Maps";

export default {
  name: "Home",
  components: {
    Maps,
  },
  props: {
    maps: Array,
    mode: String,
  },
};
</script>
