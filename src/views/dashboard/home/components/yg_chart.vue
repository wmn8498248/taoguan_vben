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
  import { onMounted, ref, Ref, computed, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Icon } from '/@/components/Icon';

  let props = defineProps({
    ...basicProps,
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String, default: '设备名称' },
    historyList: {
      fftId: String, //时间；横轴
      currentRms: Number, //电流(mA)；纵轴
      phase: Number, //相对介损
      relativeCapacitance: Number, //相对电容量；单位*100%电容量；
      padding: String, //无关
      timeScale: String, //无关
      pressure: String, //无关
      bushingId: String, //相位
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  let deviceName = computed(() => props.deviceName);

  let historyList = computed(() => props.historyList);

  watch(
    () => props.timestamp,
    () => {
      // console.log(
      //   props.historyList.map((ele) => {
      //     return ele.currentRms;
      //   },123456),
      // );
      if (props.historyList.deviceName) {
        return;
      }
      setOptions({
        title: {
          text: deviceName,
          left: 'center',
          top: 'top',
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
          name: '电流（mA）',
          nameTextStyle: {
            color: '#3BDFFF',
          },
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(20, 225, 250, 0.2)',
            },
          },
          axisLabel: {
            //x轴文字的配置
            textStyle: {
              color: '#fff',
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
          top: 52,
          left: 40,
          right: 40,
          bottom: 30,
          containLabel: true,
          borderWidth: 0,
          borderColor: '#ccc',
        },
        series: [
          {
            data: props.historyList.map((ele) => {
              return ele.currentRms;
            }),
            type: 'line',
            name: '电流（mA）',
            itemStyle: {
              color: '#5ab1ef',
            },
          },
        ],
      });
    },
    { immediate: true },
  );

  onMounted(() => {
    setOptions({
      title: {
        text: deviceName,
        left: 'center',
        top: 'top',
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
        name: '电流（mA）',
        nameTextStyle: {
          color: '#3BDFFF',
        },
        type: 'value',
        splitLine: {
          lineStyle: {
            color: 'rgba(20, 225, 250, 0.2)',
          },
        },
        axisLabel: {
          //x轴文字的配置
          textStyle: {
            color: '#fff',
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
        top: 52,
        left: 36,
        right: 40,
        bottom: 30,
        containLabel: true,
        borderWidth: 0,
        borderColor: '#ccc',
      },
      series: [
        {
          data: props.historyList.map((ele) => {
            return ele.currentRms;
          }),
          type: 'line',
          name: '电流（mA）',
          itemStyle: {
            color: '#5ab1ef',
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
