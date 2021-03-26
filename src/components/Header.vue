<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="select-wrapper">
      <select name="Mode" v-model="mode" @change="$emit('change-mode', mode)">
        <option value="kz_timer" selected>KZT</option>
        <option value="kz_simple">SKZ</option>
        <option value="kz_vanilla">VNL</option>
      </select>
    </div>
    <Button @btn-click="$emit('add-maps')" text="Generate" color="#495057" />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "NULL",
    },
  },
  components: {
    Button,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
header h1 {
  padding: 10px;
  color: #faf9f9;
}
</style>