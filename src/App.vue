<template>
  <Header />

  <div class="container">
    <main role="main" class="pb-3">
      <RouterView />
    </main>
  </div>

  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { usePortfoliosStore } from "@/stores/portfolios";
import { PortfolioService } from "./services/PortfolioService";


@Options({
  components: {
    Header, Footer
  }
})
export default class App extends Vue {
  portfoliosStore = usePortfoliosStore();
  portfolioService = new PortfolioService();

  /*
    constructor() {
      super();
      
    }
      */

  async mounted(): Promise<void> {
    console.log("mounted");
    this.portfoliosStore.$state.portfolios =
      await this.portfolioService.getAll();
  }
}
</script>


