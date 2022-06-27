<template>
    <h3>Add Transaction</h3>
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
                <div class="col-12">
                    <label class="control-label" for="transactionType">Transaction type</label>
                    <select v-model="transactionType" class="form-select" id="transactionType">
                        <option v-for="transType of transactionTypeKeys" 
                            v-bind:value="transType" :key="transType">
                            {{ transactionTypes[Number(transType)] }}
                        </option>
                    </select>
                </div>


                <div class="form-group">
                    <label class="control-label" for="quantity">Quantity</label>
                    <input v-model="quantity" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="transactionPrice">Price</label>
                    <input v-model="transactionPrice" class="form-control" type="text" />
                </div>
                <!-- <div class="form-group">
                    <label class="control-label" for="type">Type</label>
                    <input v-model="type" class="form-control" type="text" />
                </div> -->
                <hr />
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Add Transaction" class="btn btn-success" />
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
import { TransactionService } from "@/services/TransactionService";
import { StockService } from "@/services/StockService";
import { isNumeric } from "jquery";
import { TransactionType } from "@/domain/ITransaction"


@Options({
    components: {
    },
    props: {},
    emits: [],

})
export default class TransactionCreate extends Vue {
    stocksStore = useStocksStore();
    transactionService = new TransactionService();
    stockService = new StockService();

    transactionTypeKeys = Object.keys(TransactionType).filter((t) => !isNaN(Number(t)));
    transactionTypes = TransactionType;
    

    stock = this.stocksStore.stock;

    quantity: number = 0;
    transactionPrice: number = 0;
    transactionDate: Date = new Date();;
    transactionType: number = 0;
    stockId: string = this.stock.id!;

    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {


        if (!isNumeric(this.quantity) || !isNumeric(this.transactionPrice)) {
            this.errorMsg = '⛔️ Quantity and Price must be a number';
        }

        else if (this.quantity > 0 &&
            this.transactionPrice > 0) {
            var res = await this.transactionService.add(
                {
                    quantity: this.quantity,
                    transactionPrice: this.transactionPrice,
                    transactionDate: this.transactionDate,
                    transactionType: this.transactionType,
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
            this.errorMsg = '⛔️ Please enter price and quantity';
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

function StringIsNumber(StringIsNumber: any) {
    throw new Error("Function not implemented.");
}
</script>

