<template>
  <div class="md:w-2/3 w-full !md:mr-4">
    <div class="md:flex enter-y">
      <YgList class="!md:mr-4"></YgList>
      <YgChart class="mt-4 md:mt-0 w-full" :loading="loading" />
    </div>
    <div class="w-full enter-y">
      <YgChartNow class="!mt-4 enter-y" :loading="loading" />
    </div>
  </div>
  <div class="md:w-1/3 w-full md:mt-0 mt-4">
    <YgBox></YgBox>
    <YgAlarm class="md:mt-4 mt-4"></YgAlarm>
    <!-- <YgAlarm class="md:mt-4 mt-4"></YgAlarm> -->
    <YgRadar class="md:mt-4 mt-4"></YgRadar>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import YgList from './components/yg_list.vue';
  import YgChart from './components/yg_chart.vue';
  import YgChartNow from './components/yg_chart_now.vue';
  import YgBox from './components/yg_box.vue';
  import YgAlarm from './components/yg_alarm.vue';
  import YgRadar from './components/yg_radar.vue';


  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>