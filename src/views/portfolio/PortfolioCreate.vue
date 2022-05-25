<template>
    <h3>Create</h3>
    <h4>Portfolio</h4>
    <hr />
    <div class="row">
        <div class="col-md-12">

            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>

            <div>
                <div class="form-group">
                    <label class="control-label" for="name">Name</label>
                    <input v-model="name" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="description">Description</label>
                    <input v-model="description" class="form-control" type="text" />
                </div>
                <hr />
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Create Portfolio" class="btn btn-success" />
                </div>
            </div>
        </div>
    </div>

    <div>
        <RouterLink to="/portfolios">Back to List</RouterLink>
    </div>
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
export default class PortfolioCreate extends Vue {
    portfolioStore = usePortfoliosStore();
    portfolioService = new PortfolioService();


    name: string = '';
    description: string = '';
    errorMsg: string | null = null;


    async submitClicked(): Promise<void> {
        console.log('submitClicked');

        if (this.name.length > 0) {


            var res = await this.portfolioService.add(
                {
                    name: this.name,
                    description: this.description,
                    stockSum: 0,
                    loanSum: 0,
                }
            );

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.portfolioStore.$state.portfolios =
                    await this.portfolioService.getAll();

                this.$router.push('/portfolios');
            }
        } else {
            this.errorMsg = '⛔️ Name is too short!';
        }
    }
}
</script>
