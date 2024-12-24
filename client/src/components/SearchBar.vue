<template>
    <input
      type="text"
      v-model="query"
      @input="onInput"
      class="border p-2 w-full"
      placeholder="Search products..."
    />
  </template>
  
  <script>
  export default {
    props: ["onSearch"],
    data() {
      return {
        query: "",
        timeout: null,
      };
    },
    methods: {
      onInput() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.onSearch(this.query);
        }, 300); // Debounce
      },
    },
  };
  </script>
  