import type { IIndustry } from "@/domain/IIndustry";
import type { IRegion } from "@/domain/IRegion";
import { defineStore } from "pinia";

export const useRegionsStore = defineStore({
  id: "regions",
  state: () => ({
    regions: [] as IRegion[],
  }),
  getters: { // for doung business logic or smthig with store parameters
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(region: IRegion) {
      this.regions.push(region);
    }
  }
});
