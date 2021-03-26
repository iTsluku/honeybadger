<template>
  <div :key="time.id" v-for="time in times">
    <tr>
      <td>{{ time.player_name }}</td>
      <td>{{ time.time }}</td>
      <td>{{ time.teleports }}</td>
      <td>{{ time.points }}</td>
      <td>{{ time.server_name }}</td>
      <td>{{ time.updated_on }}</td>
    </tr>
  </div>
</template>

<script>

export default {
  name: "Times",
  props: {
    times: Array,
  },
};
</script>