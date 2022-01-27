<template>
  <select :value="value" @input="handleChange" required>
    <option v-for="dep in departments" :value="dep" :key="dep">
      {{ dep }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      departments: ["Customer Support", "Engineering", "Sales"],
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style></style>
