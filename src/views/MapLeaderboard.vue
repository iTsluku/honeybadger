<template>
  <div class="content">
    <h3>{{ mapName }}</h3>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>time</th>
          <th>teleports</th>
          <th>points</th>
          <th>server name</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timesPRO" :key="time.id">
          <td>{{ time.player_name }}</td>
          <td>{{ time.time }}</td>
          <td>{{ time.teleports }}</td>
          <td>{{ time.points }}</td>
          <td>{{ time.server_name }}</td>
          <td>{{ time.updated_on }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>time</th>
          <th>teleports</th>
          <th>points</th>
          <th>server name</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timesTP" :key="time.id">
          <td>{{ time.player_name }}</td>
          <td>{{ time.time }}</td>
          <td>{{ time.teleports }}</td>
          <td>{{ time.points }}</td>
          <td>{{ time.server_name }}</td>
          <td>{{ time.updated_on }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/">Go Back</router-link>
  </div>
</template>
<script>
import * as KreedzAPI from "../js/kreedzAPI";

export default {
  name: "MapLeaderboard",
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
  },
  data() {
    return {
      timesPRO: this.getPROTimes(),
      timesTP: this.getTPTimes(),
    };
  },
};
</script>
<style scoped>
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
a {
  color: #adb5bd;
}
</style>