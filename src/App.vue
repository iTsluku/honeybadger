<template>
  <div class="container">
    <Header @add-maps="addMaps" title="Honey Badger" />
    <Maps :maps="maps" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Maps from "./components/Maps";
import * as KreedzAPI from "./js/kreedzAPI.js";

export default {
  name: "App",
  components: {
    Header,
    Maps,
  },
  methods: {
    addMaps() {
      KreedzAPI.getMapPerTier().then((response) => (this.maps = response));
    },
  },
  data() {
    return {
      maps: [],
    };
  },
  created() {},
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
