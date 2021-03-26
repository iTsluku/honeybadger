<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="select-wrapper">
      <select v-model="selected" @change="$emit('change-mode', selected)">
        <option :key="m.id" v-for="m in modes" :value="m.mode">
          {{ m.name }}
        </option>
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
    modes: Array,
  },
  components: {
    Button,
  },
  data() {
    return {
      selected: "kz_timer",
    };
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