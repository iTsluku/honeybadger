<template>
  <div class="map" style="cursor: pointer" @click="redirectToMapLeaderboard">
    <h3>{{ map.name }}</h3>
    <img :src="getImageURL()" />
    <div class="wr">
      <span class="type">Pro</span>
      <div class="mark-time">{{ map[`${mode}PROtime`] }}</div>
      by
      <div class="mark-name">{{ map[`${mode}PROplayer_name`] }}</div>
    </div>
    <div class="wr">
      <span class="type">TP</span>
      <div class="mark-time">{{ map[`${mode}TPtime`] }}</div>
      by
      <div class="mark-name">{{ map[`${mode}TPplayer_name`] }}</div>
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
    redirectToMapLeaderboard() {
      var pathStr = "/leaderboard/" + this.map.name;
      this.$router.push({
        path: pathStr,
      });
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
.map .wr .mark-time {
  color: #540b0e;
  background: #adb5bd;
  font-weight: bolder;
  display: inline-block;
  width: 82px;
}
.map .wr .mark-name {
  color: #540b0e;
  background: #adb5bd;
  font-weight: bolder;
  display: inline-block;
  width: 235px;
  height: 19px;
  vertical-align: bottom;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.map img {
  max-width: 100%;
  height: auto;
}
</style>