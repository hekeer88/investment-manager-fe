import ContactIndex from "@/views/contact/ContactIndex.vue";
import ContactTypeIndex from "@/views/contacttype/ContactTypeIndex.vue";
import PersonIndex from "@/views/person/PersonIndex.vue";
import PersonCreate from "@/views/person/PersonCreate.vue";
import PersonEdit from "@/views/person/PersonEdit.vue";
import PersonDelete from "@/views/person/PersonDelete.vue";
import Login from "@/views/identity/Login.vue";

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PortfolioIndex from "@/views/portfolio/PortfolioIndex.vue";
import PortfolioCreate from "@/views/portfolio/PortfolioCreate.vue";
import PortfolioEdit from "@/views/portfolio/PortfolioEdit.vue";
import PortfolioDelete from "@/views/portfolio/PortfolioDelete.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/identity/account/login",
      name: "login",
      component: Login,
    },

    { path: "/portfolios", name: "portfolios", component: PortfolioIndex },
    { path: "/portfolios/index", name: "portfoliosindex", component: PortfolioIndex },
    { path: "/portfolios/create", name: "portfolioscreate", component: PortfolioCreate },
    { path: "/portfolios/edit/:id", name: "portfoliosedit", component: PortfolioEdit, props: true },
    { path: "/portfolios/delete/:id", name: "portfoliosdelete", component: PortfolioDelete, props: true },




    // TODO: delete later
    { path: "/contacts", name: "contacts", component: ContactIndex },
    { path: "/persons", name: "persons", component: PersonIndex},
    { path: "/persons/index", name: "personsindex", component: PersonIndex},
    { path: "/persons/create", name: "personscreate", component: PersonCreate},
    { path: "/persons/edit/:id", name: "personsedit", component: PersonEdit, props: true},
    { path: "/persons/delete/:id", name: "personsdelete", component: PersonDelete, props: true},

    { path: "/contacttypes", name: "contacttypes", component: ContactTypeIndex},
  ]
});

export default router;
