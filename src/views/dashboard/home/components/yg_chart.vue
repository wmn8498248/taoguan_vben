<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="transaction|svg" :size="25" />
      <span>实时数据</span>
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
  import { onMounted, ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Icon } from '/@/components/Icon';

  let props = defineProps({
    ...basicProps,
    isBoxVolt: { type: Boolean, default: true }, //电流/电压，isBoxVolt为true，表示电压(kV)，否则是电流(mA)
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String, default: '设备名称' },
    historyList: { type: null, default: [] },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.timestamp,
    () => {
      // console.log(props.deviceName,"props.timestamp______")
      setOptions(
        {
          title: {
            text: props.deviceName,
          },
          xAxis: {
            data: props.historyList.map((ele) => {
              return ele.fftId.replace(' ', '\n');
            }),
          },
          yAxis: {
            name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
          },

          series: [
            {
              data: props.historyList.map((ele) => {
                return ele.monitorValue;
              }),
              type: 'line',
              name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
            },
          ],
        },
        false,
      );
    },
    { immediate: true },
  );

  onMounted(() => {
    setOptions({
      title: {
        text: props.deviceName,
        left: 'center',
        top: 'top',
        textStyle: {
          fontSize: 14,
          color: '#55acee',
          fontWeight: 'normal',
          lineHeight: 30,
        },
      },
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
        data: props.historyList.map((ele) => {
          return ele.fftId.replace(' ', '\n');
        }),
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
      yAxis: {
        name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
        nameTextStyle: {
          color: '#3BDFFF',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            color: 'rgba(20, 225, 250, 0.2)',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(20, 225, 250, 0.2)',
          },
        },
      },
      grid: {
        top: 60,
        left: 36,
        right: 40,
        bottom: 50,
        containLabel: true,
        borderWidth: 0,
        borderColor: '#ccc',
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          height: 12,
        },
      ],
      // legend: {
      //   data: [
      //     props.isBoxVolt ? '电压(kV)' : '电流（mA）',
      //   ],
      //   textStyle: {
      //     color: '#f1a89f',
      //   },
      //   top: 35,
      //   right: 30, //可设定图例在左、右、居中
      //   icon: 'none',
      //   itemWidth: 1,
      // },
      series: [
        {
          data: props.historyList.map((ele) => {
            return ele.monitorValue;
          }),
          type: 'line',
          name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
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
    &-title {
      display: flex;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      justify-content: center;
      align-items: center;
      span {
        padding-left: 10px;
      }
    }

    &-content {
      border-top: 1px solid #2c67f1;
    }
  }
</style>
