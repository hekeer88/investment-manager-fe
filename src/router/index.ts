import ContactIndex from "@/views/contact/ContactIndex.vue";
import ContactTypeIndex from "@/views/contacttype/ContactTypeIndex.vue";
import PersonIndex from "@/views/person/PersonIndex.vue";
import PersonCreate from "@/views/person/PersonCreate.vue";
import PersonEdit from "@/views/person/PersonEdit.vue";
import PersonDelete from "@/views/person/PersonDelete.vue";
import Login from "@/views/identity/Login.vue";

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
