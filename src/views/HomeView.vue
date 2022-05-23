<template>
</template>

<script lang="ts">


import { useIdentityStore } from "@/stores/identity";
import { Vue } from "vue-class-component";

export default class HomeView extends Vue {

  identityStore = useIdentityStore();

  async created(): Promise<void> {
    console.log('created');
    if (this.identityStore.$state.jwt != null) {
      this.$router.push('/portfolios');
    } else {
      this.$router.push('/identity/account/login');
    }
  }
}
</script>