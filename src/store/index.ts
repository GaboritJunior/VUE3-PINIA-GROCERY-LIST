import { defineStore } from "pinia";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

export interface Food {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  createdAt: Date;
  deletedAt?: Date;
}

export const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    items: [] as Food[],
  }),

  actions: {
    generateFakeData(): Food {
      return {
        id: uuid(),
        quantity: Math.random(),
        name: faker.lorem.word(),
        description: faker.lorem.words(),
        createdAt: new Date(),
      };
    },

    createNewItem(item: Food) {
      if (!item) return;

      this.items.push(item);
    },

    updateItem(id: string, payload: Food) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.items[index] = this.generateFakeData();
      }
    },

    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.items.splice(index, 1);
    },

    findIndexById(id: string) {
      return this.items.findIndex((item) => item.id === id);
    },
  },
});
