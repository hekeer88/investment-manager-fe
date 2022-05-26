<template>
    <header>
        <nav
            class="container navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand">Investment Manager</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">

                        <template v-if="identityStore.$state.jwt != null">
                            <li class="nav-item">
                                <RouterLink to="/portfolios" class="nav-link text-dark" active-class="active">Portfolios
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/stocks" class="nav-link text-dark" active-class="active">Stocks
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/loans" class="nav-link text-dark" active-class="active">Loans
                                </RouterLink>
                            </li>
                        </template>

                    </ul>
                    <ul class="navbar-nav">
                        <template v-if="identityStore.$state.jwt == null">
                            <li class="nav-item">
                                <RouterLink to="/identity/account/register" class="nav-link text-dark" active-class="active">Sign Up
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/identity/account/login" class="nav-link text-dark" active-class="active">Login
                                </RouterLink>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item dropdown">
                                <RouterLink to="/" class="nav-link dropdown-toggle text-dark" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">{{
                                            identityStore.jwt?.firstName
                                    }}
                                </RouterLink>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li class="nav-item">

                                        <div class="form-group">
                                            <button @click="logOut()" type="button"
                                                class="nav-link btn btn-link text-dark">
                                                Logout
                                            </button>
                                        </div>
                                        <!-- <RouterLink to="/identity/account/logout" class="nav-link text-dark"
                                            active-class="active">Logout
                                        </RouterLink> -->
                                    </li>

                                </ul>

                            </li>
                        </template>

                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>


<script lang="ts">
import { useIdentityStore } from "@/stores/identity";
import { usePortfoliosStore } from "@/stores/portfolios";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
    components: {
    }
})
export default class Header extends Vue {
    identityStore = useIdentityStore();

    async logOut(): Promise<void> {
        console.log("logout");
        this.identityStore.$state.jwt = null;
        this.$router.push('/');

    }


}
</script>

