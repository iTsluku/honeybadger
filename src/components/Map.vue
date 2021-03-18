<template>
  <div class="map">
    <h3>{{ map.name }}</h3>
    <img :src="getImageURL()" />
    <p>T{{ map.difficulty }}</p>
    <p>{{ map.created_on }}</p>
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
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.map h3 {
  font-family: Verdana;
  padding: 5px;
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