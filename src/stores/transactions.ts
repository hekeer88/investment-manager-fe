import type { ITransaction } from "@/domain/ITransaction";
import { TransactionService } from "@/services/TransactionService";
import { defineStore } from "pinia";

export const useTransactionsStore = defineStore({
  id: "transactions",
  state: () => ({
    transactions: [] as ITransaction[],
    transaction: {} as ITransaction,
  }),
  getters: { // for doung business logic or smthig with store parameters
   
  },
  actions: { // if you need to modife state more complex way(in other chase u can also modify directly)
    add(transaction: ITransaction) {
      this.transactions.push(transaction);
    }
  }
});

