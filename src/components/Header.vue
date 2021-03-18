<template>
  <header>
    <h1>{{ title }}</h1>
    <Button @click="genMapPerTier()" text="Generate" color="#495057" />
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
  methods: {
    genMapPerTier() {
      this.$emit("add-maps");
    },
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