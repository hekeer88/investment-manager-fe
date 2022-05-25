<template>
    <h3>Stocks</h3>

    <p>
        <RouterLink class="btn btn-success" to="/stocks/create">Create new</RouterLink>
    </p>

    <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
            <tr>
                <th>Company</th>
                <th>Ticker</th>
                <th>Region</th>
                <th>Industry</th>
                <th>Portfolio</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of stockStore.stocks" :key="item.id">
                <td>
                    <div class="d-flex align-items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/4222/4222019.png" alt=""
                            style="width: 45px; height: 45px" class="rounded-circle" />
                        <div class="ms-3">
                            <p class="fw-bold mb-1">{{ item.company }}</p>
                            <p class="text-muted mb-0">{{ item.comment }}</p>
                        </div>
                    </div>
                </td>
                <td>{{ item.ticker }}</td>
                <td>{{ item.region?.country }}</td>
                <td>{{ item.industry?.name }}</td>
                <td>{{ item.portfolio?.name }}</td>
                <td>{{ item.quantity }}</td>

                <td>
                    <button @click="addClicked(item)" type="button" class="btn btn-link btn-rounded btn-sm fw-bold"
                        data-mdb-ripple-color="dark">
                        Add
                    </button>
                    |
                    <button @click="updateClicked(item)" type="button" class="btn btn-link btn-rounded btn-sm fw-bold"
                        data-mdb-ripple-color="dark">
                        Update
                    </button>
                    |
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
import { useStocksStore } from "@/stores/stocks";
import type { IPortfolio } from "@/domain/IPortfolio";
import { StockService } from "@/services/StockService";
import type { IStock } from "@/domain/IStock";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class StockIndex extends Vue {
    // id: string = "foobar";

    stockStore = useStocksStore();
    stockService = new StockService();



    /*
      constructor() {
        super();
        
      }
        */

    async editClicked(stock: IStock): Promise<void> {
        console.log('editClicked');
        this.stockStore.$state.stock = stock;
        this.$router.push({name:'stocksedit', params: {id: stock.id}});
    }

    async addClicked(stock: IStock): Promise<void> {
        console.log('addClicked');
        this.stockStore.$state.stock = stock;
        this.$router.push({name:'transactioncreate'});
    }

    async updateClicked(stock: IStock): Promise<void> {
        console.log('updateClicked');
        this.stockStore.$state.stock = stock;
        this.$router.push({name:'pricecreate'});
    }

    async mounted(): Promise<void> {
        console.log("mounted");
        this.stockStore.$state.stocks =
            await this.stockService.getAll();
    }

}

</script>
