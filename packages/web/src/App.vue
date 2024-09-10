<script setup lang="ts">
import { RouterView } from 'vue-router'
import useGraphql from './composables/useGraphql';
import { provide } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

// const { apolloClient } = useGraphql()
// provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <RouterView />
</template>
