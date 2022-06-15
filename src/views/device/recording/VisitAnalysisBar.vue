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
      let harList: Array<any> = []
      if (props.harmonicList.length > 0) {
        props.harmonicList.forEach((res, index) => {
          harList.push({
            name: '谐波值 ' + props.monitorValueList[index],
            smooth: true,
            data: res,
            type: 'bar',
          });
        });
      }
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
        legend: {
          selectedMode: 'single',
          data: props.monitorValueList.map((item) => {
            return '谐波值 ' + item;
          }),
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 30,
          },
        ],
        grid: {
          top: 52,
          left: 66,
          right: 30,
          bottom: 70,
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
        series: harList,
      });
    },
    { immediate: true },
  );
</script> 
 