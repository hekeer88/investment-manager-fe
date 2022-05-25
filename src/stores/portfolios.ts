import type { IPortfolio } from "@/domain/IPortfolio";
import type { IStock } from "@/domain/IStock";
import { PortfolioService } from "@/services/PortfolioService";
import { defineStore } from "pinia";

export const usePortfoliosStore = defineStore({
  id: "portfolios",
  state: () => ({
    portfolios: [] as IPortfolio[],
    portfolio: {} as IPortfolio,
  }),
  getters: { // for doung business logic or smthig with store parameters
    portfolioCount: (state) => state.portfolios.length,
    getPortfolioById: (state) => {
      return (id: string) => state.portfolios.find((portfolio) => portfolio.id === id)
    },    
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(portfolio: IPortfolio) {
      this.portfolios.push(portfolio);
    }
  }
});

