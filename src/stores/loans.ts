import type { ILoan } from "@/domain/ILoan";
import { defineStore } from "pinia";

export const useLoansStore = defineStore({
  id: "loans",
  state: () => ({
    loans: [] as ILoan[],
    loan: {} as ILoan,
  }),
  getters: {  // for doung business logic or smthig with store parameters
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(loan: ILoan) {
      this.loans.push(loan);
    }
  }
});
