<template>
  <div class="map">
    <h3>{{ map.name }}</h3>
    <img :src="getImageURL()" />
    <div class="wr">
      <span class="type">Pro</span><mark>{{ map[`${mode}PROtime`] }} </mark> by
      <mark>{{ map[`${mode}PROplayer_name`] }}</mark>
    </div>
    <div class="wr">
      <span class="type">TP</span><mark>{{ map[`${mode}TPtime`] }}</mark> by
      <mark>{{ map[`${mode}TPplayer_name`] }}</mark>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    map: Object,
    mode: String,
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
  padding: 5px 20px;
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
.map .wr {
  font-family: verdana;
  padding: 2px;
}
.map .wr .type {
  display: inline-block;
  width: 32px;
}
.map .wr mark {
  color: #540b0e;
  background: #adb5bd;
  font-weight: bolder;
}
.map img {
  max-width: 100%;
  height: auto;
}
</style>