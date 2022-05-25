<template>
   Loan Edit
    <h2>Edit Loan: {{ loansStore.loan.loanName }}</h2>
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
                    <div class="form-check form-switch">
                        <label class="form-check-label" for="collateral">Collateral loan?</label>
                        <input v-model="collateral" class="form-check-input" type="checkbox" id="collateral">
                    </div>
                    <hr />
                    <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-secondary" />
                    <input @click="deleteStock()" type="submit" value="Delete" class="btn btn-danger" />
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
                <div class="col-12">
                    <label class="control-label" for="portfolioId">Choose portfolio</label>
                    <select v-model="portfolioId" class="form-select" id="portfolioId">
                        <option v-for="portfolio of portfoliosStore.portfolios" v-bind:value="portfolio.id"
                            :key="portfolio.id">
                            {{ portfolio.name }}
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
import type { IIndustry } from "@/domain/IIndustry";
import type { IPortfolio } from "@/domain/IPortfolio";
import type { IRegion } from "@/domain/IRegion";
import type { IStock } from "@/domain/IStock";
import { IndustryService } from "@/services/IndustryService";
import { LoanService } from "@/services/LoanService";
import { RegionService } from "@/services/RegionService";
import { StockService } from "@/services/StockService";
import { useIndustriesStore } from "@/stores/industries";
import { useLoansStore } from "@/stores/loans";
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
export default class LoanEdit extends Vue {
    loansStore = useLoansStore();
    portfoliosStore = usePortfoliosStore();
    regionsStore = useRegionsStore();

    loanService = new LoanService();
    regionService = new RegionService();

    loan = this.loansStore.loan;

    id: string = this.loan.id!;
    loanName: string = this.loan.loanName;
    borrowerName: string = this.loan.borrowerName;
    contractNumber: string = this.loan.contractNumber;
    collateral: boolean = this.loan.collateral;
    loanDate: Date = this.loan.loanDate;
    endDate: Date = this.loan.endDate;
    amount: number = this.loan.amount;
    scheduleType: string = this.loan.scheduleType;
    interest: number = this.loan.interest;
    portfolioId: string = this.loan.portfolioId;
    regionId: string = this.loan.regionId;

    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        console.log('submitClicked');

        if (this.portfolioId.length == 0 || this.regionId.length == 0) {
            this.errorMsg = '⛔️ Choosing portfolio and region is required';
        }

        else if (this.loanName.length > 0 &&
            this.borrowerName.length > 0 &&
            this.contractNumber.length > 0 
        ) {

            var res = await this.loanService.put(
                this.id,
                {
                    id: this.id,
                    loanName: this.loanName,
                    borrowerName: this.borrowerName,
                    contractNumber: this.contractNumber,
                    collateral: this.collateral,
                    loanDate: this.loanDate,
                    endDate: this.endDate,
                    amount: this.amount,
                    scheduleType: this.scheduleType,
                    interest: this.interest,
                    portfolioId: this.portfolioId,
                    regionId: this.regionId,
                    portfolio: null,
                    region: null,
                }
            );

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.loansStore.$state.loans =
                    await this.loanService.getAll();

                this.$router.push('/loans');
            }
        } else {
            this.errorMsg = '⛔️ Please enter loan name, borrower and contract number';
        }
    }

    async deleteStock(): Promise<void> {
        console.log('deleteClicked');
        await this.loanService.delete(this.id);
        this.loansStore.$state.loans =
            await this.loanService.getAll();
        this.$router.push('/loans');
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.regionsStore.$state.regions =
            await this.regionService.getAll();
    }


}

</script>