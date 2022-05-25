<template>
    <h3>Create</h3>
    <h4>Stock</h4>
    <hr />
    <div class="row">
        <div class="col-md-6">
            <section>
                <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                    <ul>
                        <li>{{ errorMsg }}</li>
                    </ul>
                </div>
                <div>

                    <div class="form-group">
                        <label class="control-label" for="contractNumber">Contract Number</label>
                        <input v-model="contractNumber" class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="loanName">Loan Name</label>
                        <input v-model="loanName" class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="borrowerName">Borrower Name</label>
                        <input v-model="borrowerName" class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="amount">Amount</label>
                        <input v-model="amount" class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="interest">Interest</label>
                        <input v-model="interest" class="form-control" type="text" />
                    </div>
                    <hr />
                    <div class="form-group">
                        <input @click="submitClicked()" type="submit" value="Create Stock" class="btn btn-success" />
                    </div>
                </div>
            </section>
        </div>
        <div class="col-md-4 col-md-offset-2">
            <section>
                <div class="form-group">
                    <label class="control-label" for="LoanDate">Loan Date</label>
                    <input v-model="loanDate" class="form-control" type="date" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="LoanDate">Due Date</label>
                    <input v-model="endDate" class="form-control" type="date" />
                </div>

                <div class="form-group">
                    <label class="control-label" for="collateral">Collateral</label>
                    <input v-model="collateral" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="scheduleType">Schedule Type</label>
                    <input v-model="scheduleType" class="form-control" type="text" />
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
            </section>
        </div>




    </div>




    <div>
        <RouterLink to="/loans">Back to List</RouterLink>
    </div>
</template>




<script lang="ts">


import { StockService } from "@/services/StockService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { useRegionsStore } from "@/stores/regions";
import { Options, Vue } from "vue-class-component";
import { RegionService } from "@/services/RegionService";
import { useLoansStore } from "@/stores/loans";
import { now } from "moment";


@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class LoanCreate extends Vue {
    loansStore = useLoansStore();
    portfoliosStore = usePortfoliosStore();
    regionsStore = useRegionsStore();

    stockService = new StockService();
    regionService = new RegionService();

    loanName: string = '';
    borrowerName: string = '';
    contractNumber: string = '';
    collateral: string = '';
    loanDate: Date = new Date();
    endDate: Date = new Date();
    amount: number = 0;
    scheduleType: string = '';
    interest: string = '';
    portfolioId: string = '';
    regionId: string | null = null;
    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {


        // if (this.portfolioId.length == 0) {
        //     this.errorMsg = '⛔️ Choosing portfolio is required';
        // }

        // else if (this.company.length > 0 &&
        //     this.ticker.length > 0) {

        //     var res = await this.stockService.add(
        //         {
        //             company: this.company,
        //             ticker: this.ticker,
        //             comment: this.comment,
        //             regionId: this.regionId,
        //             portfolioId: this.portfolioId,
        //             industryId: this.industryId,
        //         }
        //     );

        //     if (res.status >= 300) {
        //         this.errorMsg = res.status + ' ' + res.errorMsg;
        //     } else {
        //         this.stockStore.$state.stocks =
        //             await this.stockService.getAll();

        //         this.$router.push('/stocks');
        //     }
        // } else {
        //     this.errorMsg = '⛔️ Please enter company name and ticker';
        // }
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.regionsStore.$state.regions =
            await this.regionService.getAll();
    }
}
</script>

