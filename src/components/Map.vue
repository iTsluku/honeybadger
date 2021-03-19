<template>
  <div class="map">
    <h3>{{ map.name }}</h3>
    <img :src="getImageURL()" />
    <p>
      Pro <mark>{{ map.kz_timerPROtime }}</mark> by
      <mark>{{ map.kz_timerPROplayer_name }}</mark>
    </p>
    <p>
      TP <mark>{{ map.kz_timerTPtime }}</mark> by
      <mark>{{ map.kz_timerTPplayer_name }}</mark>
    </p>
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
.map p mark {
  color: #540b0e;
  background: #adb5bd;
  font-weight: bolder;
}
.map img {
  max-width: 100%;
  height: auto;
}
</style>