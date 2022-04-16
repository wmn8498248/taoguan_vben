<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="transaction|svg" :size="25" />
      <span>XXX设备实时数据</span>
    </div>
    <div class="virtual-scroll-content">
      <div ref="chartRef" :style="{ height, width }"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Icon } from '/@/components/Icon';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      title: {
        text: "XXX设备",
        left: "center",
        top: "top",
        textStyle: {
          fontSize: 18,
          color: '#55acee',
          fontWeight: 'normal',
          lineHeight: 30,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: false,
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'dashed',
            color: 'rgba(226,226,226,0.2)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          max: 80000,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'dashed',
              color: 'rgba(226,226,226,0.2)',
            },
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '35px', bottom: "2%", containLabel: true, borderWidth: 0, borderColor: '#ccc' },
      series: [
        // {
        //   smooth: true,
        //   data: [
        //     111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
        //     11111, 4000, 2000, 500, 333, 222, 111,
        //   ],
        //   type: 'line',
        //   areaStyle: {},
        //   itemStyle: {
        //     color: '#5ab1ef',
        //   },
        // },
        {
          smooth: true,
          data: [
            33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
            198, 60, 30, 22, 11,
          ],
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#019680',
          },
        },
      ],
    });
  });
</script>
<style lang="less" scoped>
  .virtual-scroll {
    &-wrap {
      background-color: #1938bb;
      color: #fff;
      border: 1px solid #245cdf;
      box-shadow: 0 0 0px 3px #021145;
    }
    &-title{
      display: flex;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      // justify-content: center;
      align-items: center;
      span{
        padding-left: 10px;
      }
    }
  
    &-content{
      border-top: 1px solid #2c67f1;

    }

   
  }
</style>
