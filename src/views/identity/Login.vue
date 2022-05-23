<style>
.col-md-4 {
margin: auto;
width: 50%;
padding: 10px;

}
</style>

<template>
    <div class="row">
        <div class="col-md-4">
            <h3>Login to Investment Manager</h3>
            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>

            <div>
                <div class="form-group">
                    <label class="control-label" for="email">email</label>
                    <input v-model="email" class="form-control" type="text" />
                </div>
                <div class="form-group">
                    <label class="control-label" for="password">password</label>
                    <input v-model="password" class="form-control" type="password" />
                </div>
                <br>
                <div class="form-group">
                    <input @click="loginClicked()" type="submit" value="Login" class="btn btn-success" />
                    <RouterLink to="register" class="btn btn-secondary" active-class="active">Sign Up
                    </RouterLink>
                </div>

            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { IdentityService } from "@/services/IdentityService";
import { useIdentityStore } from "@/stores/identity";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class Login extends Vue {
    identityStore = useIdentityStore();

    email: string = '';
    password: string = '';
    errorMsg: string | null = null;


    identityService = new IdentityService();

    async loginClicked(): Promise<void> {
        console.log('submitClicked');
        var res = await this.identityService.login(this.email, this.password);
        console.log(res);
        this.identityStore.$state.jwt = res.data!;
        this.$router.push('/portfolios');

    }

}
</script>

