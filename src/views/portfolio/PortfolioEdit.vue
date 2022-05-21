<template>
    Portfolio Edit
    <h2>Edit Porfolio: {{ portfoliosStore.getPortfolioById(id)?.name }}</h2>
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
                <div class="form-group">
                    <input @click="submitClicked()" type="submit" value="Edit" class="btn btn-primary" />
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

    portfolio = this.portfoliosStore.getPortfolioById('3e97a4bb-62c2-496f-9adf-0442536d349c');


    id: string = "this.portfolio!.id!";
    name: string = "this.props.toString()";
    description: string = "this.portfolio!.description";
    errorMsg: string | null = null;

    async submitClicked(): Promise<void> {
        console.log('submitClicked');

        if (this.name.length > 0) {

            var res = await this.portfolioService.put(
                this.id,
                {
                    id: this.id,
                    name: this.name,
                    description: this.description,
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

}

function emits(arg0: { components: {}; props: { id: StringConstructor; }; }, arg1: { item: any; }, emits: any, arg3: never[]) {
    throw new Error("Function not implemented.");
}
</script>