<template>
  <div class="map">
    <h3>{{ map.name }}</h3>
    <img :src="getImageURL()" />
    <p>T{{ map.difficulty }}</p>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    map: Object,
  },
  methods: {
    getImageURL: function () {
      return (
        "https://raw.githubusercontent.com/KZGlobalTeam/map-images/public/images/" +
        this.map.name +
        ".jpg"
      );
    },
  },
};
</script>

<style scope>
.map {
  background: #adb5bd;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.map h3 {
  /* 1 pixel black shadow to left, top, right and bottom */
  text-shadow: -1px 0 #6c757d, 0 1px #6c757d, 1px 0 #6c757d, 0 -1px #6c757d;
  font-family: Verdana;
  color: #343a40;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.map p {
  font-family: verdana;
}
.map img {
  max-width: 100%;
  height: auto;
}
</style>