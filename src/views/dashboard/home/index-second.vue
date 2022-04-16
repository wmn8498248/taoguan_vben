<template>
  <div class="p-4">
    <CasingCard :loading="loading" class="enter-y" />
    <YgAverage class="!mt-4 enter-y" :loading="loading" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import CasingCard from './components/yg_card.vue';
  import YgAverage from './components/yg_average.vue';

  // import VisitSource from './components/VisitSource.vue';
  // import VisitRadar from './components/VisitRadar.vue';
  // import SalesProductPie from './components/SalesProductPie.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
