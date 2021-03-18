<template>
  <div class="container">
    <Header @add-maps="addMaps" title="Honey Badger" />
    <Maps :maps="maps" />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Maps from "./components/Maps";
import * as KreedzAPI from "./js/kreedzAPI.js";

export default {
  name: "App",
  components: {
    Header,
    Footer,
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
  border: 1px solid #495057;
  padding: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: #212529;
}
.btn {
  display: inline-block;
  background: #000;
  color: #faf9f9;
  border: none;
  padding: 10px 20px;
  margin: 10px;
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
