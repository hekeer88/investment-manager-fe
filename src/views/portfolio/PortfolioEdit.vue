<template>
    Portfolio Edit
    <h1>Edit {{id}}</h1>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
  components:{
  },
  props: {
      id: String
  },
  emits: [],
    })
    export default class PortfolioEdit extends Vue {
        id!: String
    }
</script>