import type { IStock } from "@/domain/IStock";
import { defineStore } from "pinia";

export const useStocksStore = defineStore({
  id: "stocks",
  state: () => ({
    stocks: [] as IStock[],
    stock: {} as IStock,
  }),
  getters: {  // for doung business logic or smthig with store parameters
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(stock: IStock) {
      this.stocks.push(stock);
    }
  }
});
