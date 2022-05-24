<template>
    <!-- <h3>Create</h3>
    <h4>Portfolio</h4>
    <hr /> -->
    <!-- <div class="col-md-4 col-md-offset-2">
        <section> -->


            <div>
            <h3>Create new industry</h3>
            </div>
            <!-- <hr />
            <div class="col-auto">
                <div class="form-outline">
                    <label class="form-label" for="form11Example1">Label</label>
                    <input type="text" id="form11Example1" class="form-control" />
                </div>
            </div>
            <hr />
            <div class="col-auto">
                <button type="submit" class="btn btn-secondary">Submit</button>
            </div> -->




        <!-- </section>
    </div> -->
</template>


<script lang="ts">
import { PortfolioService } from "@/services/PortfolioService";
import { usePortfoliosStore } from "@/stores/portfolios";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

// @Options({
//     components: {
//     },
//     props: {},
//     emits: [],
// })
// export default class PortfolioCreate extends Vue {
//     portfolioStore = usePortfoliosStore();
//     portfolioService = new PortfolioService();


//     name: string = '';
//     description: string = '';
//     errorMsg: string | null = null;


//     async submitClicked(): Promise<void> {
//         console.log('submitClicked');

//         if (this.name.length > 0) {


//             var res = await this.portfolioService.add(
//                 {
//                     name: this.name,
//                     description: this.description,
//                 }
//             );

//             if (res.status >= 300) {
//                 this.errorMsg = res.status + ' ' + res.errorMsg;
//             } else {
//                 this.portfolioStore.$state.portfolios =
//                     await this.portfolioService.getAll();

//                 this.$router.push('/portfolios');
//             }
//         } else {
//             this.errorMsg = '⛔️ Name is too short!';
//         }
//     }
// }
</script>
