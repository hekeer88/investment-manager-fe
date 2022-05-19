import type { IPortfolio } from "@/domain/IPortfolio";
import { PortfolioService } from "@/services/PortfolioService";
import { defineStore } from "pinia";

export const usePortfoliosStore = defineStore({
  id: "portfolios",
  state: () => ({
    portfolios: [
      {
        id: '1/23/',
        name: "port name",
        description: 'test descrition'
      }
    ] as IPortfolio[],
  }),
  getters: {
    portfolioCount: (state) => state.portfolios.length,
  },
  actions: {
    add(portfolio: IPortfolio) {
      this.portfolios.push(portfolio);
    }
  },
});
