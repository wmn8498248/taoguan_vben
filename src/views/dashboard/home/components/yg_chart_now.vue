<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="transaction|svg" :size="25" />
      <span>历史数据折线图</span>
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
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String, default: '设备名称' },
    isBoxVolt: { type: Boolean, default: true }, //电流/电压，isBoxVolt为true，表示电压(kV)，否则是电流(mA)
    historyList: { type: null, default: [] },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.deviceName,
    () => {
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
        legend: {
          data: [
            props.isBoxVolt ? '电压(kV)' : '电流（mA）',
            '相对电容量',
            '相对介损',
            '电容量',
            '介损',
          ],
          textStyle: {
            color: '#f1a89f',
          },
          top: 35,
          right: 30, //可设定图例在左、右、居中
          icon: 'line',
        },
        series: [
          {
            data: props.historyList.map((ele) => {
              return ele.monitorValue;
            }),
            type: 'line',
            name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
          },
          {
            data: props.historyList.map((ele: { relativelyCap: any }) => {
              return ele.relativelyCap;
            }),
            type: 'line',
            name: '相对电容量',
          },
          {
            data: props.historyList.map((ele: { relativelyLoss: any }) => {
              return ele.relativelyLoss;
            }),
            type: 'line',
            name: '相对介损',
          },
          {
            data: props.historyList.map((ele: { cap: any }) => {
              return ele.cap;
            }),
            type: 'line',
            name: '电容量',
          },
          {
            data: props.historyList.map((ele: { loss: any }) => {
              return ele.loss;
            }),
            type: 'line',
            name: '介损',
          },
        ],
      });
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
      legend: {
        data: [
          props.isBoxVolt ? '电压(kV)' : '电流（mA）',
          '相对电容量',
          '相对介损',
          '电容量',
          '介损',
        ],
        textStyle: {
          color: '#f1a89f',
        },
        top: 35,
        right: 30, //可设定图例在左、右、居中
        icon: 'line',
      },
      series: [
        {
          data: props.historyList.map((ele) => {
            return ele.monitorValue;
          }),
          type: 'line',
          name: props.isBoxVolt ? '电压(kV)' : '电流（mA）',
        },
        {
          data: props.historyList.map((ele: { relativelyCap: any }) => {
            return ele.relativelyCap;
          }),
          type: 'line',
          name: '相对电容量',
        },
        {
          data: props.historyList.map((ele: { relativelyLoss: any }) => {
            return ele.relativelyLoss;
          }),
          type: 'line',
          name: '相对介损',
        },
        {
          data: props.historyList.map((ele: { cap: any }) => {
            return ele.cap;
          }),
          type: 'line',
          name: '电容量',
        },
        {
          data: props.historyList.map((ele: { loss: any }) => {
            return ele.loss;
          }),
          type: 'line',
          name: '介损',
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
      // justify-content: center;
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
