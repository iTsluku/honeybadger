<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="select-wrapper" v-show="homePage">
      <select v-model="selected" @change="$emit('change-mode', selected)">
        <option :key="m.id" v-for="m in modes" :value="m.mode">
          {{ m.name }}
        </option>
      </select>
    </div>
    <Button
      v-show="homePage"
      @btn-click="$emit('add-maps')"
      text="Generate"
      color="#495057"
    />
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
  computed: {
    homePage() {
      return this.$route.path === "/";
    },
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