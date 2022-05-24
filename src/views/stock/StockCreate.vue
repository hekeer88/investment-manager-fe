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
                        <option v-for="item of portfoliosStore.portfolios" v-bind:value="item.id" :key="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>

                <div class="col-12">

                    <label class="control-label" for="industryId">Choose industry</label>
                    <select v-model="industryId" class="form-select" id="industryId">

                        <!-- <option v-for="item of portfoliosStore.portfolios" v-bind:value="item.id" :key="item.id">
                            {{ item.name }}
                        </option> -->
                    </select>
                </div>



                <div class="col-12">
                    <label class="control-label" for="regionId">Choose region</label>
                    <select v-model="regionId" class="form-select" id="regionId">
                        <!-- <option v-for="item of portfoliosStore.portfolios" v-bind:value="item.id" :key="item.id">
                        {{ item.name }}
                        </option> -->
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

        <a href="/stocks">Back to List</a>
    </div>
</template>


<script lang="ts">

import { StockService } from "@/services/StockService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { useStocksStore } from "@/stores/stocks";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class StockCreate extends Vue {
    stockStore = useStocksStore();
    portfoliosStore = usePortfoliosStore();
    stockService = new StockService();

    industryForm: boolean = false;
    regionForm: boolean = false;

    company: string = '';
    ticker: string = '';
    comment: string = '';
    regionId: string | null = null;
    portfolioId: string = '';
    industryId: string | null = null;
    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {
        console.log('submitClicked');
        console.log(this.company, this.ticker);
        console.log(this.portfoliosStore.portfolios)


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
}
</script>


