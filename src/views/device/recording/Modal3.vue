<template>
  <BasicModal
    v-bind="$attrs"
    :title="deviceName"
    width="900px"
    :canFullscreen="false"
    :defaultFullscreen="false"
    :showOkBtn="false"
  >
    <div ref="chartRef" :style="{ height, width }"></div>
  </BasicModal>
</template>
<script lang="ts">
  import { basicProps } from './props';
  import { BasicModal } from '/@/components/Modal';
</script>

<script lang="ts" setup>
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  let props = defineProps({
    ...basicProps,
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String, default: '板子Id' },
    historyList: { type: null, default: [] },
    // isBoxVolt: { type: Boolean, default: true }, //电流/电压，isBoxVolt为true，表示电压(kV)，否则是电流(mA)
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.timestamp,
    () => {
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
          // data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
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
            data: props.historyList,
            type: 'line',
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
