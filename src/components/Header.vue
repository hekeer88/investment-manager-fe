<template>
    <header>
        <nav
            class="container navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">WebApp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link text-dark" active-class="active">Home</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink to="/portfolios" class="nav-link text-dark" active-class="active">Portfolios
                                ({{ portfoliosStore.personCount }} - {{ portfoliosStore.portfolios.length }})</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/contacts" class="nav-link text-dark" active-class="active">Contacts
                            </RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/contacttypes" class="nav-link text-dark" active-class="active">ContactTypes
                            </RouterLink>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link text-dark" href="/Home/Privacy">Privacy</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav">
                        <template v-if="identityStore.$state.jwt == null">
                            <li class="nav-item">
                                <a class="nav-link text-dark" href="/Identity/Account/Register">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-dark" href="/identity/account/login">Login</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <a class="nav-link text-dark" href="/identity/account/logout">Logout</a>
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
    portfoliosStore = usePortfoliosStore();
    identityStore = useIdentityStore();



}
</script>

