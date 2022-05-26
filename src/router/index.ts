

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/views/identity/Register.vue";
import Login from "@/views/identity/Login.vue";
import PortfolioIndex from "@/views/portfolio/PortfolioIndex.vue";
import PortfolioCreate from "@/views/portfolio/PortfolioCreate.vue";
import PortfolioEdit from "@/views/portfolio/PortfolioEdit.vue";
import StockIndex from "@/views/stock/StockIndex.vue";
import StockCreate from "@/views/stock/StockCreate.vue";
import StockEdit from "@/views/stock/StockEdit.vue";
import LoanIndex from "@/views/loan/LoanIndex.vue";
import LoanCreate from "@/views/loan/LoanCreate.vue";
import LoanEdit from "@/views/loan/LoanEdit.vue";
import TransactionCreate from "@/views/transaction/TransactionCreate.vue";
import PriceCreate from "@/views/transaction/PriceCreate.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "https://distributed22.azurewebsites.net/api/v1",
    //   name: "index",
    //   component: HomeView,
    // },
    {
      path: "/identity/account/login",
      name: "login",
      component: Login,
    },
    {
      path: "/identity/account/register",
      name: "register",
      component: Register,
    },

    { path: "/portfolios", name: "portfolios", component: PortfolioIndex },
    { path: "/portfolios/index", name: "portfoliosindex", component: PortfolioIndex },
    { path: "/portfolios/create", name: "portfolioscreate", component: PortfolioCreate },
    { path: "/portfolios/edit/:id", name: "portfoliosedit", component: PortfolioEdit, props: true },

    { path: "/stocks", name: "stocks", component: StockIndex },
    { path: "/stocks/index", name: "stocksindex", component: StockIndex },
    { path: "/stocks/create", name: "stockscreate", component: StockCreate },
    { path: "/stocks/edit/:id", name: "stocksedit", component: StockEdit, props: true },

    { path: "/loans", name: "loans", component: LoanIndex },
    { path: "/loans/index", name: "loansindex", component: LoanIndex },
    { path: "/loans/create", name: "loanscreate", component: LoanCreate },
    { path: "/loans/edit/:id", name: "loansedit", component: LoanEdit, props: true },

    { path: "/tranaction/create", name: "transactioncreate", component: TransactionCreate},
    { path: "/price/create", name: "pricecreate", component: PriceCreate},
    

  ]
});

export default router;
