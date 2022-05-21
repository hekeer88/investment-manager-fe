<template>
    <h3>Portfolios</h3>

    <p>
        <RouterLink class="btn btn-success" to="/portfolios/create">Create new</RouterLink>
    </p>

    <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
            <tr>
                <th>Name</th>
                <th>Balance</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of portfoliosStore.portfolios" :key="item.id">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/4599/4599792.png" alt=""
                            style="width: 45px; height: 45px" class="rounded-circle" />
                        <div class="ms-3">
                            <p class="fw-bold mb-1">{{ item.name }}</p>
                            <p class="text-muted mb-0">{{ item.description }}</p>
                        </div>
                    </div>
                </td>
                <!-- <td>
                    <p class="fw-normal mb-1">Software engineer</p>
                    <p class="text-muted mb-0">IT department</p>
                </td> -->
                <td>TODO: balance here</td>
                <td>
                    <button @click="editClicked(item)" type="button" class="btn btn-link btn-rounded btn-sm fw-bold"
                        data-mdb-ripple-color="dark">
                        Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import type { IPortfolio } from "@/domain/IPortfolio";
import { PortfolioService } from "@/services/PortfolioService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class PortfolioIndex extends Vue {
    id: string = "foobar";

    portfoliosStore = usePortfoliosStore();
    portfolioService = new PortfolioService();



    /*
      constructor() {
        super();
        
      }
        */

    async editClicked(portfolio: IPortfolio): Promise<void> {
        console.log('editClicked');
        this.portfoliosStore.$state.portfolio = portfolio;
        this.$router.push({name:'portfoliosedit', params: {id: portfolio.id}});
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.portfoliosStore.$state.portfolios =
            await this.portfolioService.getAll();
    }

}

</script>

