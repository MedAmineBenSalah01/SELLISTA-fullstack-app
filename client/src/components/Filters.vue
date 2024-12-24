<template>
  <div class="flex flex-wrap gap-8 p-6 bg-white rounded-lg shadow-md">
    <div class="flex flex-col w-full sm:w-1/3 md:w-1/4 space-y-4">
      <label for="category" class="text-sm font-medium text-gray-700 mb-2">Category</label>
      <select
        id="category"
        v-model="selectedCategory"
        @change="applyFilters"
        class="border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="flex flex-col w-full sm:w-1/3 md:w-1/4 space-y-4">
      <label for="minPrice" class="text-sm font-medium text-gray-700 mb-2">Min Price</label>
      <input
        id="minPrice"
        type="number"
        v-model.number="minPrice"
        @input="applyFilters"
        placeholder="0"
        class="border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
      />
    </div>

    <div class="flex flex-col w-full sm:w-1/3 md:w-1/4 space-y-4">
      <label for="maxPrice" class="text-sm font-medium text-gray-700 mb-2">Max Price</label>
      <input
        id="maxPrice"
        type="number"
        v-model.number="maxPrice"
        @input="applyFilters"
        placeholder="0"
        class="border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
      />
    </div>
  </div>
</template>



  
  <script>
  export default {
    props: ["categories", "onFilter"],
    data() {
      return {
        selectedCategory: "",
        minPrice: null,
        maxPrice: null,
      };
    },
    methods: {
      applyFilters() {
        this.onFilter({
          category: this.selectedCategory,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        });
        console.log(this.selectedCategory)
      },
    },
  };
  </script>
  