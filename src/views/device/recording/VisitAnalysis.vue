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
    frequencyList: { type: undefined, default: [] },
  });

  const chartRef = ref<HTMLDivElement | null>(null);

  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.timestamp, 
    () => {
      // let aaaa:any = props.frequencyList
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: props.frequencyList,
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
