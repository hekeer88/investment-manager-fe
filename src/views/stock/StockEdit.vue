<template>
    Stock Edit
    <h2>Edit Stock: {{ stocksStore.stock.company }}</h2>
    <hr />
    <div class="row">
        <div class="col-md-6">
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
                <br>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-secondary" />
                    <input @click="deleteStock()" type="submit" value="Delete" class="btn btn-danger" />
                </div>


            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/stocks">Back to List</RouterLink>
    </div>


</template>

<script lang="ts">
import type { IStock } from "@/domain/IStock";
import { IndustryService } from "@/services/IndustryService";
import { RegionService } from "@/services/RegionService";
import { StockService } from "@/services/StockService";
import { useIndustriesStore } from "@/stores/industries";
import { usePortfoliosStore } from "@/stores/portfolios";
import { useRegionsStore } from "@/stores/regions";
import { useStocksStore } from "@/stores/stocks";
import { propsToAttrMap } from "@vue/shared";
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
export default class StockEdit extends Vue {
    stocksStore = useStocksStore();
    portfoliosStore = usePortfoliosStore();
    industriesStore = useIndustriesStore();
    regionsStore = useRegionsStore();

    stockService = new StockService();
    regionService = new RegionService();
    industryService = new IndustryService();

    stock = this.stocksStore.stock;

    id: string = this.stock.id!;
    company: string = this.stock.company;
    ticker: string = this.stock.ticker;
    comment: string = this.stock.comment;
    regionId: string | null = this.stock.regionId ?? null;
    portfolioId: string = this.stock.portfolioId;
    industryId: string | null = this.stock.industryId ?? null;
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        console.log('submitClicked');

        if (this.portfolioId.length == 0) {
            this.errorMsg = '⛔️ Choosing portfolio is required';
        }

        else if (this.company.length > 0 &&
            this.ticker.length > 0) {

            var res = await this.stockService.put(
                this.id,
                {
                    id: this.id,
                    company: this.company,
                    ticker: this.ticker,
                    comment: this.comment ?? "",
                    regionId: this.regionId ?? null,
                    portfolioId: this.portfolioId,
                    industryId: this.industryId ?? null,
                }
            );

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.stocksStore.$state.stocks =
                    await this.stockService.getAll();

                this.$router.push('/stocks');
            }
        } else {
            this.errorMsg = '⛔️ Please enter company name and ticker';
        }
    }

    async deleteStock(): Promise<void> {
        console.log('deleteClicked');
        await this.stockService.delete(this.id);
        this.stocksStore.$state.stocks =
            await this.stockService.getAll();
        this.$router.push('/stocks');
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