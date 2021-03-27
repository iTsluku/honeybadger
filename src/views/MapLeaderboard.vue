<template>
  <div class="content">
    <Map :map="map" :mode="mode" />
    <div class="tbl">
      <table>
        <thead>
          <tr>
            <th class="t-place">#</th>
            <th class="p-name">name</th>
            <th class="t-time">time</th>
            <th class="tp">teleports</th>
            <th class="t-date">date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, index) in timesPRO" :key="time.id">
            <td class="t-place">{{ ++index }}</td>
            <td class="p-name">{{ time.player_name }}</td>
            <td class="t-time">{{ time.time_format }}</td>
            <td class="tp"></td>
            <td class="t-date">{{ time.updated_on_format }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th class="t-place">#</th>
            <th class="p-name">name</th>
            <th class="t-time">time</th>
            <th class="tp">teleports</th>
            <th class="t-date">date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, index) in timesTP" :key="time.id">
            <td class="t-place">{{ ++index }}</td>
            <td class="p-name">{{ time.player_name }}</td>
            <td class="t-time">{{ time.time_format }}</td>
            <td class="tp">{{ time.teleports }}</td>
            <td class="t-date">{{ time.updated_on_format }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-link to="/">Go Back</router-link>
  </div>
</template>
<script>
import Map from "../components/Map";
import * as KreedzAPI from "../js/kreedzAPI";

export default {
  name: "MapLeaderboard",
  components: {
    Map,
  },
  props: {
    maps: Array,
    mode: String,
  },
  methods: {
    async getMapName() {
      var path = this.$route.path;
      var mapName = path.slice(13, path.length);
      this.mapName = mapName;
      return mapName;
    },
    getPROTimes() {
      this.getMapName().then((name) => {
        KreedzAPI.getTop20Past30DaysPRO(name, this.mode).then((list) => {
          this.timesPRO = list;
          return list;
        });
      });
    },
    getTPTimes() {
      this.getMapName().then((name) => {
        KreedzAPI.getTop20Past30DaysTP(name, this.mode).then((list) => {
          this.timesTP = list;
          return list;
        });
      });
    },
    getMap() {
      for (var m in this.maps) {
        if (this.maps[m].name === this.mapName) {
          this.map = this.maps[m];
          return this.maps[m];
        }
      }
    },
  },
  data() {
    return {
      timesPRO: this.getPROTimes(),
      timesTP: this.getTPTimes(),
      map: this.getMap(),
    };
  },
};
</script>
<style scoped>
.map {
  margin-bottom: 35px;
}
.tbl {
  margin-top: 25px;
  margin: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
  overflow: scroll;
}
table,
th,
td {
  border: 1px solid black;
}
td {
  color: #495057;
}
th {
  color: #faf9f9;
}
th.p-name {
  width: 130px;
  height: 19px;
  overflow: hidden;
}
td.p-name {
  padding-left: 5px;
}
th.t-place {
  width: 25px;
}
th.tp {
  width: 92px;
}
th.t-time {
  width: 80px;
}
th.t-date {
  width: 100px;
}
td.t-place,
td.tp,
td.t-time,
td.t-date {
  text-align: center;
}
a {
  color: #adb5bd;
}
</style>