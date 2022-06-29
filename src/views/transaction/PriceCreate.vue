<template>
    <h3>New Price</h3>
    <h4>Stock: {{ stocksStore.stock.company }}</h4>
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
                    <label class="control-label" for="currentPrice">Current Price</label>
                    <input v-model="currentPrice" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="PriceTime">Price Date</label>
                    <input v-model="priceTime" class="form-control" type="date" />
                </div>
                <hr />
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Add New Price" class="btn btn-success" />
                </div>
            </div>
        </div>
    </div>
    <div>
        <RouterLink to="/stocks">Back to List</RouterLink>
    </div>
</template>


<script lang="ts">


import { useStocksStore } from "@/stores/stocks";

import { Options, Vue } from "vue-class-component";
import { PriceService } from "@/services/PriceService";
import { isNumeric } from "jquery";
import { StockService } from "@/services/StockService";


@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class PriceCreate extends Vue {
    stocksStore = useStocksStore();
    priceService = new PriceService();
    stockService = new StockService();

    stock = this.stocksStore.stock;


    currentPrice: number = 0;
    priceTime: string  = new Date().toISOString().substr(0, 10);
    stockId: string = this.stock.id!;

    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {

        if (!isNumeric(this.currentPrice)) {
            this.errorMsg = '⛔️ Price must be a number';
        }
        else if (this.currentPrice > 0) {
            var res = await this.priceService.add(
                {
                    currentPrice: this.currentPrice,
                    priceTime: new Date(this.priceTime),
                    stockId: this.stockId,
                    stock: null,

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
            this.errorMsg = '⛔️ Price cannot be a zero';
        }
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        // this.industriesStore.$state.industries =
        //     await this.industryService.getAll();
        // this.regionsStore.$state.regions =
        //     await this.regionService.getAll();
    }
}
</script>

