<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as store from "./store/index";
export default defineComponent({
  name: "App",
  setup() {
    const items = ref<store.Food[]>([]);
    const mainStore = store.useMainStore();
    onMounted(() => {
      items.value = mainStore.items;
    });
    function createItem() {
      mainStore.createNewItem(mainStore.generateFakeData());
    }
    function deleteItem(id: string) {
      mainStore.deleteItem(id);
    }
    function updateItem(id: string) {
      mainStore.updateItem(id, mainStore.generateFakeData());
    }
    return {
      items,
      createItem,
      deleteItem,
      updateItem,
    };
  },
});
</script>

<template>
  <div>
    <h1>Grocery List App</h1>
    <button @click="createItem">New Item</button>
    <div>
      <div
        v-for="(item, index) in items"
        :key="index"
        style="
          background-color: #f5f5f5;
          padding: 10px;
          margin-bottom: 10px;
          margin-top: 10px;
        "
      >
        <code>{{ item }}</code>
        <button @click="deleteItem(item.id)">Delete</button>
        <button @click="updateItem(item.id)">Update</button>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
