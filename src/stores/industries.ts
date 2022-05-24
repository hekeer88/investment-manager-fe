import type { IIndustry } from "@/domain/IIndustry";
import { defineStore } from "pinia";

export const useIndustriesStore = defineStore({
  id: "industries",
  state: () => ({
    industries: [] as IIndustry[],
  }),
  getters: { // for doung business logic or smthig with store parameters
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(industry: IIndustry) {
      this.industries.push(industry);
    }
  }
});
