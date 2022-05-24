<template>
    <h3>Create</h3>
    <h4>Stock</h4>
    <hr />
    <div class="row">
        <div class="col-md-6">
            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>
            <div>
                <div class="form-group">
                    <label class="control-label" for="company">Company</label>
                    <input v-model="company" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="ticker">Ticker</label>
                    <input v-model="ticker" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="comment">Comment</label>
                    <input v-model="comment" class="form-control" type="text" />
                </div>

                <div class="col-12">
                    <label class="control-label" for="portfolioId">Choose portfolio</label>
                    <select v-model="portfolioId" class="form-select" id="portfolioId">
                        <option v-for="portfolio of portfoliosStore.portfolios" v-bind:value="portfolio.id"
                            :key="portfolio.id">
                            {{ portfolio.name }}
                        </option>
                    </select>
                </div>
                <div class="col-12">
                    <label class="control-label" for="industryId">Choose industry</label>
                    <select v-model="industryId" class="form-select" id="industryId">
                        <option v-for="industry of industriesStore.industries" v-bind:value="industry.id"
                            :key="industry.id">
                            {{ industry.name }}
                        </option>
                    </select>
                </div>
                <div class="col-12">
                    <label class="control-label" for="regionId">Choose region</label>
                    <select v-model="regionId" class="form-select" id="regionId">
                        <option v-for="region of regionsStore.regions" v-bind:value="region.id" :key="region.id">
                            {{ region.country }}
                        </option>
                    </select>
                </div>
                <hr />
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Create Stock" class="btn btn-success" />
                </div>
            </div>
        </div>
    </div>
    <div>
        <RouterLink to="/stocks">Back to List</RouterLink>
    </div>
</template>


<script lang="ts">

import { StockService } from "@/services/StockService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { useStocksStore } from "@/stores/stocks";
import { useRegionsStore } from "@/stores/regions";
import { useIndustriesStore } from "@/stores/industries";
import { Options, Vue } from "vue-class-component";
import { RegionService } from "@/services/RegionService";
import { IndustryService } from "@/services/IndustryService";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class LoanCreate extends Vue {
    stockStore = useStocksStore();
    portfoliosStore = usePortfoliosStore();
    industriesStore = useIndustriesStore();
    regionsStore = useRegionsStore();

    stockService = new StockService();
    regionService = new RegionService();
    industryService = new IndustryService();

    company: string = '';
    ticker: string = '';
    comment: string = '';
    regionId: string | null = null;
    portfolioId: string = '';
    industryId: string | null = null;
    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {

        if (this.portfolioId.length == 0) {
            this.errorMsg = '⛔️ Choosing portfolio is required';
        }

        else if (this.company.length > 0 &&
            this.ticker.length > 0) {

            var res = await this.stockService.add(
                {
                    company: this.company,
                    ticker: this.ticker,
                    comment: this.comment,
                    regionId: this.regionId,
                    portfolioId: this.portfolioId,
                    industryId: this.industryId,
                }
            );

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.stockStore.$state.stocks =
                    await this.stockService.getAll();

                this.$router.push('/stocks');
            }
        } else {
            this.errorMsg = '⛔️ Please enter company name and ticker';
        }
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.industriesStore.$state.industries =
            await this.industryService.getAll();
        this.regionsStore.$state.regions =
            await this.regionService.getAll();
    }
}
</script>

