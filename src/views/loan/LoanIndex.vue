Loan<template>
    <h3>Loans</h3>

    <p>
        <RouterLink class="btn btn-success" to="/loans/create">Create new</RouterLink>
    </p>

    <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
            <tr>
                <th>Loan</th> 
                <th>Borrower</th>
                <th>Collateral</th>
                <th>End Date</th>
                <th>Interest</th> 
                <th>Amount</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of loanStore.loans" :key="item.id">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/2660/2660516.png" alt=""
                            style="width: 45px; height: 45px" class="rounded-circle" />
                        <div class="ms-3">
                            <p class="fw-bold mb-1">{{ item.loanName }}</p>
                            <p class="text-muted mb-0">No: {{ item.contractNumber }}</p>
                        </div>
                    </div>
                </td>
                <td>{{ item.borrowerName }}</td>
                <td>{{ item.collateral }}</td>
                <td>{{ formatDate(item.endDate) }}</td>
                <td>{{ item.interest }}%</td>
                <td class="fw-bold mb-1">${{ item.amount }}</td>
                
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

import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";
import { useLoansStore } from "@/stores/loans";
import type { IPortfolio } from "@/domain/IPortfolio";
import { LoanService } from "@/services/LoanService";
import type { ILoan } from "@/domain/ILoan";
import moment from 'moment';


@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class LoanIndex extends Vue {
    // id: string = "foobar";

    loanStore = useLoansStore();
    loanService = new LoanService();

    /*
      constructor() {
        super();
        
      }
        */

    formatDate(date: Date): string {
        return moment(date).format('DD/MM/YYYY');
    }

    async editClicked(loan: ILoan): Promise<void> {
        
        console.log('editClicked');
        this.loanStore.$state.loan = loan;
        this.$router.push({name:'loansedit', params: {id: loan.id}});
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.loanStore.$state.loans =
            await this.loanService.getAll();
    }

}

</script>
