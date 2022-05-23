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
            <h3>Sign Up to Investment Manager</h3>
            <hr />
            <div v-if="errorMsg != null" class="text-danger validation-summary-errors" data-valmsg-summary="true">
                <ul>
                    <li>{{ errorMsg }}</li>
                </ul>
            </div>
            <div class="form-floating">
                <input v-model="firstName" class="form-control" type="firstName" />
                <label class="control-label" for="firstName">FirstName</label>
            </div>
            <div class="form-floating">
                <input v-model="lastName" class="form-control" type="lastName" />
                <label class="control-label" for="lastName">LastName</label>
            </div>
            <div class="form-floating">
                <input v-model="email" class="form-control" type="email" />
                <label class="control-label" for="email">Email</label>
            </div>
            <div class="form-floating">
                <input v-model="password" class="form-control" type="password" />
                <label for="password" class="control-label">Password</label>
            </div>
            <div class="form-floating">
                <input v-model="confirmedPassword" class="form-control" type="password" />
                <label for="control-label" class="control-label">Confirm password</label>
            </div>
            <input @click="register()" type="submit" value="Sign Up" class="w-100 btn btn-lg btn-secondary" />
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
    identityService = new IdentityService();

    email: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    confirmedPassword: string = '';
    errorMsg: string | null = null;

    async register(): Promise<void> {

        if (this.firstName.length < 1 || this.lastName.length < 1) {
            this.errorMsg = '⛔️ Please enter both names'
        }
        else if (this.email.length < 5) {
            this.errorMsg = '⛔️ Valid email is 5 minimum characters'
        }
        else if (this.password.length < 1) {
            this.errorMsg = '⛔️ Minimum password length is 1 character'
        }
        else if (this.password !== this.confirmedPassword) {
            this.errorMsg = '⛔️ The passwords are not the same'
        } else {
            var res = await this.identityService.register({
                email: this.email,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
            }
            );

            
            console.log("register", res.errorMsg)
            // this.$router.push('/portfolios');

            // console.log("res", res.status)
            // console.log("msg", res.errorMsg)
            // console.log("test", res.data.)
    }




    }
    }
</script>

