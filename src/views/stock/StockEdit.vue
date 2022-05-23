<template>
    Portfolio Edit
    <h2>Edit Porfolio: {{ portfoliosStore.portfolio.name }}</h2>
    <hr />
    <div class="row">
        <div class="col-md-12">
            <div>

                <div class="form-group">
                    <label class="control-label" for="name">Name</label>
                    <input class="form-control" type="text" v-model="name" />

                </div>
                <div class="form-group">
                    <label class="control-label" for="description">Description</label>
                    <input class="form-control" type="text" v-model="description" />
                </div>
                <br>
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-primary" />
                    <input @click="deletePortfolio()" type="submit" value="Delete" class="btn btn-danger" />
                </div>


            </div>
        </div>
    </div>

    <div>
        <a href="/Portfolios">Back to List</a>
    </div>


</template>

<script lang="ts">
import type { IPortfolio } from "@/domain/IPortfolio";
import { PortfolioService } from "@/services/PortfolioService";
import { usePortfoliosStore } from "@/stores/portfolios";
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
export default class PortfolioEdit extends Vue {

    portfolioService = new PortfolioService();
    portfoliosStore = usePortfoliosStore();

    portfolio = this.portfoliosStore.portfolio;


    id: string = this.portfolio.id!;
    name: string = this.portfolio.name!;
    description?: string = this.portfolio.description;
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        console.log('submitClicked');

        if (this.name.length > 0) {

            var res = await this.portfolioService.put(
                this.id,
                {
                    id: this.id,
                    name: this.name,
                    description: this.description ?? "",
                }
            );

            if (res.status >= 300) {
                this.errorMsg = res.status + ' ' + res.errorMsg;
            } else {
                this.portfoliosStore.$state.portfolios =
                    await this.portfolioService.getAll();
                this.$router.push('/portfolios');
            }


        } else {
            this.errorMsg = 'Name is too short!';
        }
    }

    async deletePortfolio(): Promise<void> {
        console.log('deleteClicked');
        await this.portfolioService.delete(this.id);

        this.portfoliosStore.$state.portfolios =
            await this.portfolioService.getAll();

        this.$router.push('/portfolios');
    }
}

function emits(arg0: { components: {}; props: { id: StringConstructor; }; }, arg1: { item: any; }, emits: any, arg3: never[]) {
    throw new Error("Function not implemented.");
}
</script>