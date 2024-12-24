<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-6 shadow-md">
      <div class="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <h1 class="text-3xl font-extrabold tracking-tight">
          Product Search & Filter
        </h1>
        <button
          class="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-200"
        >
          Admin Panel
        </button>
      </div>
    </header>

    <main class="container mx-auto flex-1 px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside class="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Filters</h2>
          <Filters :categories="categories" :on-filter="updateFilters" />
        </aside>

        <section class="lg:col-span-9">
          <div class="mb-6">
            <SearchBar :on-search="updateSearch" />
          </div>
          <div class="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Products</h2>
            <ProductList :products="filteredProducts" :is-admin="isAdmin" />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>



<script>
import { ref, computed, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_PRODUCTS, GET_CATEGORIES } from "./graphql/queries";
import SearchBar from "./components/SearchBar.vue";
import Filters from "./components/Filters.vue";
import ProductList from "./components/ProductList.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    Filters,
    ProductList,
  },
  setup() {
    const searchQuery = ref("");
    const filters = ref({ category: null, minPrice: null, maxPrice: null });
    const isAdmin = ref(true); 

    const { result: productResult, refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
      search: searchQuery.value,
    });

    const { result: categoryResult, loading: loadingCategories } = useQuery(GET_CATEGORIES);

    const products = ref([]);
    const categories = ref([]);

    watchEffect(() => {
      if (productResult.value) {
        products.value = productResult.value.products || [];
      }
    });

    watchEffect(() => {
      if (categoryResult.value) {
        categories.value = categoryResult.value.categories || [];
      }
    });

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesCategory =
          !filters.value.category || product.category[0].id === filters.value.category;
        const matchesMinPrice =
          !filters.value.minPrice || product.price >= filters.value.minPrice;
        const matchesMaxPrice =
          !filters.value.maxPrice || product.price <= filters.value.maxPrice;

        return matchesCategory && matchesMinPrice && matchesMaxPrice;
      });
    });

    const updateSearch = (query) => {
      searchQuery.value = query;
      refetchProducts({ search: query });
    };

    const updateFilters = (newFilters) => {
      filters.value = newFilters;
    };

    return {
      categories,
      filteredProducts,
      isAdmin,
      loadingCategories,
      updateSearch,
      updateFilters,
    };
  },
};
</script>

<style>
</style>
