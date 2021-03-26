<template>
  <div class="content">
    <h3>{{ mapName }}</h3>
    <table>
      <Times :times="this.timesPRO" />
    </table>
    <table>
      <Times :times="this.timesTP" />
    </table>
    <router-link to="/">Go Back</router-link>
  </div>
</template>
<script>
import Times from "../components/Times";
import * as KreedzAPI from "../js/kreedzAPI";

export default {
  name: "MapLeaderboard",
  components: {
    Times,
  },
  props: {
    mode: String,
  },
  methods: {
    getMapName() {
      var path = this.$route.path;
      var mapName = path.slice(13, path.length);
      return mapName;
    },
    getPROTimes() {
      KreedzAPI.getTop20Past30DaysPRO(this.mapName, this.mode).then((list) => {
        console.log("PRO---------");
        console.log(list);
        console.log(this.mapName);
        console.log(this.mode);
        return list;
      });
    },
    getTPTimes() {
      KreedzAPI.getTop20Past30DaysTP(this.mapName, this.mode).then((list) => {
        console.log("TP---------");
        console.log(list);
        return list;
      });
    },
  },
  data() {
    return {
      mapName: this.getMapName(),
      timesPRO: this.getPROTimes(),
      timesTP: this.getTPTimes(),
    };
  },
};
</script>