import type { IPortfolio } from "@/domain/IPortfolio";
import { PortfolioService } from "@/services/PortfolioService";
import { defineStore } from "pinia";

export const usePortfoliosStore = defineStore({
  id: "portfolios",
  state: () => ({
    portfolios: [
    ] as IPortfolio[],
  }),
  getters: {
    personCount: (state) => state.portfolios.length,
  },
  actions: {
    add(portfolio: IPortfolio) {
      this.portfolios.push(portfolio);
    }
  },
});
