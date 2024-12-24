<template>
  <div>
    <div
      v-if="products.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center">
            <span
              v-if="!editing[product.id]"
              class="text-lg font-semibold text-gray-800"
            >
              {{ product.name }}
            </span>
            <input
              v-else
              v-model="editingName[product.id]"
              @keyup.enter="updateProduct(product.id)"
              class="border rounded p-2 w-full text-gray-700"
              placeholder="Enter new name"
            />
            <button
              v-if="isAdmin"
              @click="toggleEdit(product.id)"
              class="bg-blue-500 text-white text-sm py-1 px-3 rounded shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            >
              {{ editing[product.id] ? "Save" : "Edit" }}
            </button>
          </div>
          <div class="text-gray-500 text-sm">
            Category: <span class="font-medium">{{ product.category.name }}</span>
          </div>
          <div class="text-gray-800 font-bold text-xl">
            ${{ product.price }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center text-gray-600 text-lg py-10 bg-gray-100 rounded-lg"
    >
      No products match the criteria.
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; 
import { useMutation } from '@vue/apollo-composable';
import { UPDATE_PRODUCT_NAME } from '../graphql/mutations';

export default {
  props: ["products", "isAdmin"],
  setup(props) {
    const editing = ref({});
    const editingName = ref({});
    const { mutate: updateProductMutation } = useMutation(UPDATE_PRODUCT_NAME);
    function toggleEdit(id) {
      if (editing.value[id]) {
        editingName.value[id] = props.products.find(product => product.id === id).name;
      }
      editing.value[id] = !editing.value[id];
    }
    async function updateProduct(id) {
      try {
        const newName = editingName.value[id];
        const product = props.products.find(product => product.id === id);
        if (newName !== product.name) {
          const updatedProduct = { ...product, name: newName };
          await updateProductMutation({ id, name: newName });
          const index = props.products.findIndex(p => p.id === id);
          if (index !== -1) {
            props.products[index] = updatedProduct;
          }
        }
        editing.value[id] = false;
      } catch (error) {
        console.error("Error updating product name:", error);
        alert("Failed to update product name");
      }
    }
    return {
      editing,
      editingName,
      toggleEdit,
      updateProduct
    };
  }
};
</script>

<style scoped>
</style>
