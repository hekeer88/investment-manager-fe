<template>
    <h3>Portfolio: {{ portfoliosStore.portfolio.name }}</h3>
    <div class="row">
        <div class="col-sm-3">
            <div class="card mb-3" style="width: 20rem;">
                <div class="ms-2 card-body">
                    <p class="card-title">Stocks</p>
                    <p class="card-amount">
                        <span class="card-amount">€{{ portfoliosStore.portfolio.stockSum }}</span>
                        <span class="card-text text-muted mb-0">(50.8%)</span>
                    </p>
                    <p class="card-text">
                        <span class="text-danger me-2"><i class="bi bi-caret-down-fill"></i>-2.26%</span>
                        <span class="card-text">Since last month</span>
                    </p>
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card mb-3" style="width: 20rem;">
                <div class="ms-2 card-body">
                    <p class="card-title">Loans</p>
                    <p class="card-amount">
                        <span class="card-amount">€{{ portfoliosStore.portfolio.loanSum }}</span>
                        <span class="card-text text-muted mb-0">(25.1%)</span>
                    </p>
                    <p class="card-text">
                        <span class="text-success me-2"><i class="bi bi-caret-up-fill"></i>1.08%</span>
                        <span class="card-text">Since last month</span>
                    </p>
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
            </div>
        </div>
    </div>

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
    props: {
        id: String,
    },
    emits: [],
})
export default class PortfolioDash extends Vue {

    portfoliosStore = usePortfoliosStore();

}


</script>