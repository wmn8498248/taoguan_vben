<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { watch, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  let props = defineProps({
    ...basicProps,
    timestamp: { type: Number, default: 0 },
    harmonicList: { type: Array, default: [] },
    monitorValueList: { type: Array, default: [] },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);


 watch(
    () => props.timestamp,
    () => {
      // console.log(props.historyList, '___视图');
      // console.log(props.timestamp, '___视图timestamp');
      setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
      },
      yAxis: {
        type: 'value',
        max: 8000,
        splitNumber: 4,
      },
      series: [
        {
          data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
          type: 'bar',
          barMaxWidth: 80,
        },
      ],
    });
    },
    { immediate: true },
  );

</script>
