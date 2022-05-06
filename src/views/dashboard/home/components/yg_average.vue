<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <div style="display: flex; align-items: center"
        ><Icon icon="transaction|svg" :size="25" /><span>历史数据统计{{ deviceName }}</span></div
      >
      <div>
        <span
          ><a-range-picker
            v-model:value="valueTime"
            :show-time="{ format: 'HH:mm:ss' }"
            format="YYYY/MM/DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="onRangeChange"
            @ok="onRangeOk"
        /></span>
        <a-button :type="!switchTime ? 'primary' : 'info'" @click="timingStop">
          查询
        </a-button></div
      >
      <div
        ><a-button :type="switchTime ? 'primary' : 'info'" @click="timingStar">
          实时数据
        </a-button></div
      >
    </div>
    <div class="virtual-scroll-content">
      <div ref="chartRef" :style="{ height, width }"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, Ref, computed, watch } from 'vue';
  import { basicProps } from './props';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Icon } from '/@/components/Icon';
  import { DatePicker } from 'ant-design-vue';
  import { Dayjs } from 'dayjs';
  const props = {
    ...basicProps,
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String },
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
  };

  export default defineComponent({
    components: { Icon, ARangePicker: DatePicker.RangePicker },
    props,
    emits: ['my-click'],
    setup(props, contex) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      const width = computed(() => props.width);
      const height = computed(() => props.height);
      let historyListData = computed(() => props.historyList);
      let deviceName = computed(() => props.deviceNam);
      let timestamp = computed(() => props.timestamp);
      

      let dataTimeObj;
      let switchTime: Ref<Boolean> = ref(true);
      let valueTime = ref([])

      const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
        dataTimeObj = dateString;
      };

      const onRangeOk = (value: [Dayjs, Dayjs]) => {
        console.log('onOk: ', value);
      };

      function timingStop() {
        switchTime.value = false;

        contex.emit('my-click', dataTimeObj, switchTime);
        console.log('switchTime', switchTime.value);
      }

      function timingStar() {
        switchTime.value = true;
        valueTime.value = []
        contex.emit('my-click', dataTimeObj, switchTime);
        console.log('switchTime', switchTime.value);
      }
      // async function onRangeChart(){
      //   switchTime.value = true;
      // }

      async function onRangeChart(res) {
        let historyData = res.value;
        setOptions({
          title: {
            text: props.deviceName,
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
      }

      watch(
        timestamp,
        () => {
          console.log(timestamp,"监听timestamp")
          setOptions({
            title: {
              text: props.deviceName,
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
        },
        { deep: true },
      );

      onMounted(() => {
        setOptions({
          title: {
            text: props.deviceName,
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

      return {
        valueTime,
        switchTime,
        timingStop,
        timingStar,
        onRangeChart,
        deviceName,
        chartRef,
        width,
        height,
        onRangeChange,
        onRangeOk,
      };
    },
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
    &-right {
      float: right;
    }
    &-title {
      display: flex;
      line-height: 40px;
      padding-left: 20px;
      padding-right: 20px;
      border-bottom: 1px solid #041554;
      justify-content: space-between;
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
