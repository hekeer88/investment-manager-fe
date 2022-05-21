<template>
    <h1>Portfolios</h1>

    <p>
        <RouterLink to="portfolioscreate">Create new</RouterLink>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item of portfoliosStore.portfolios" :key="item.id">
                <td>
                    {{item.name}}
                </td>
                <td>{{ item.description }}</td>
                <td>
                    <RouterLink :to="{ name: 'portfoliosedit', params: { id: item.id } }">Edit</RouterLink> |
                    <a href="/Persons/Delete/d31d15f4-517c-43b1-a1b8-5dac38c99c01">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { PortfolioService } from "@/services/PortfolioService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class PortfolioIndex extends Vue {
    id: string = "foobar";

    portfoliosStore = usePortfoliosStore();
    portfolioService = new PortfolioService();

    

    /*
      constructor() {
        super();
        
      }
        */

    async mounted(): Promise<void> {
        console.log("mounted");
        this.portfoliosStore.$state.portfolios =
            await this.portfolioService.getAll();
    }

}

</script>

