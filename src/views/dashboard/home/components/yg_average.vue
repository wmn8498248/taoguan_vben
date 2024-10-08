<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <div style="display: flex; align-items: center"
        ><Icon icon="transaction|svg" :size="25" /><span>历史数据统计{{ deviceName }}</span></div
      >
      <div>
        <a-range-picker
          v-model:value="valueTime"
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始时间', '结束时间']"
          @change="onRangeChange"
          @ok="onRangeOk"
        />
        <a-button :type="!switchTime ? 'primary' : 'default'" @click="timingStop">
          查询
        </a-button></div
      >
      <div
        ><a-button :type="switchTime ? 'primary' : 'default'" @click="timingStar">
          实时数据
        </a-button>
        <a-button class="ml-2" @click="customHeader"> 导出 </a-button></div
      >
    </div>
    <div class="virtual-scroll-content">
      <div ref="chartRef" :style="{ height, width }"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, Ref, computed, watch } from 'vue';
  import { jsonToSheetXlsx } from '/@/components/Excel';

  import { basicProps } from './props';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Icon } from '/@/components/Icon';
  import { DatePicker, Button } from 'ant-design-vue';
  import { Dayjs } from 'dayjs';
  let props = {
    ...basicProps,
    isBoxVolt: { type: Boolean, default: true }, //电流/电压，isBoxVolt为true，表示电压(kV)，否则是电流(mA)
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String },
    historyList: { type: null, default: [] },
    fieldsListData: { type: null, default: [] },

    // : {
    //   fftId: String, //时间；横轴
    //   currentRms: Number, //电流(mA)；纵轴
    //   phase: Number, //相对介损
    //   relativeCapacitance: Number, //相对电容量；单位*100%电容量；
    //   padding: String, //无关
    //   timeScale: String, //无关
    //   pressure: String, //无关
    //   bushingId: String, //相位
    // },
  };

  export default defineComponent({
    components: { Icon, ARangePicker: DatePicker.RangePicker, AButton: Button },
    props,
    emits: ['my-click'],
    setup(props: any, contex) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      const width = computed(() => props.width);
      const height = computed(() => props.height);
      let deviceName = computed(() => props.deviceName);
      let timestamp = computed(() => props.timestamp);
      const fieldsAll: any = computed(() => props.fieldsListData);

      let dataTimeObj: [string, string];
      let switchTime: Ref<Boolean> = ref(true);
      let valueTime = ref();

      let fieldsNameList: any[];

      let fieldsName = ref({});
      let xlsxName: string = '';

      // reactive
      const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
        console.log(value);
        dataTimeObj = dateString;
      };

      const onRangeOk = (value: [Dayjs, Dayjs]) => {
        console.log(value);
      };

      function timingStop() {
        switchTime.value = false;

        contex.emit('my-click', dataTimeObj, switchTime);
      }

      function timingStar() {
        switchTime.value = true;
        valueTime.value = undefined;
        contex.emit('my-click', dataTimeObj, switchTime);
      }
      function customHeader() {
        let data: any[] = props.historyList;

        jsonToSheetXlsx({
          data,
          header: fieldsName.value,
          filename: xlsxName + '.xlsx',
          json2sheetOpts: {
            // 指定顺序
            header: ['name', 'id'],
          },
        });
      }

      async function onRangeChart(resData, resDevice) {
        // let fieldsNameList = [];
        let showNameList: Array<string> = new Array<string>();
        fieldsNameList = [];

        xlsxName = resDevice['name'];

        for (let index = 0; index < fieldsAll.value.length; index++) {
          const element = fieldsAll.value[index];
          if (element.state) {
            fieldsName.value[element.fieldsName] =
              element.showName === '数值'
                ? resDevice['isBoxVolt']
                  ? '电压(kV)'
                  : '电流（mA）'
                : element.showName;

            showNameList[index] =
              element.showName === '数值'
                ? resDevice['isBoxVolt']
                  ? '电压(kV)'
                  : '电流（mA）'
                : element.showName;

            fieldsNameList.push({
              data: resData.map((ele: any) => {
                return ele[element.fieldsName];
              }),
              type: 'line',
              name:
                element.showName === '数值'
                  ? resDevice['isBoxVolt']
                    ? '电压(kV)'
                    : '电流（mA）'
                  : element.showName,
            });
          }
        }
        setOptions({
          title: {
            text: resDevice['name'],
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
            boundaryGap: [0, '100%'],
            data: resData.map((ele: { fftId: string }) => {
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
            // name: resDevice['isBoxVolt'] ? '电压(kV)' : '电流（mA）',
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
            top: 52,
            left: 36,
            right: 40,
            bottom: 30,
            containLabel: true,
            borderWidth: 0,
            borderColor: '#ccc',
          },
          dataZoom: [
            {
              type: 'slider', //无滑动条内置缩放   type: 'slider', //缩放滑动条
              show: true, //开启
              xAxisIndex: [0], //X轴滑动
              start: 95,
              end: 100,
              // height: 5,
            },
            {
              type: 'slider', //无滑动条内置缩放   type: 'slider', //缩放滑动条
              show: true, //开启
              yAxisIndex: [0], //Y轴滑动
              left: 0,
              start: 0, //初始化时，滑动条宽度开始标度
              end: 100, //初始化时，滑动条宽度结束标度
              width: 25,
            },
          ],
          legend: {
            // data: [
            //   resDevice['isBoxVolt'] ? '电压(kV)' : '电流（mA）',
            //   '相对电容量',
            //   '相对介损',
            //   '电容量',
            //   '介损',
            // ],
            data: showNameList,
            textStyle: {
              color: '#f1a89f',
            },
            top: 20,
            right: 30, //可设定图例在左、右、居中
            icon: 'circle',
          },
          series: fieldsNameList,
        });
      }

      watch(
        timestamp,
        () => {
          // let fieldsNameList = [];
          fieldsNameList = [];

          for (let index = 0; index < fieldsAll.value.length; index++) {
            const element = fieldsAll.value[index];
            if (element.state) {
              fieldsNameList.push({
                data: props.historyList.map((ele: any) => {
                  return ele[element.fieldsName];
                }),
              });
            }
          }

          setOptions(
            {
              xAxis: {
                data: props.historyList.map((ele: { fftId: string }) => {
                  return ele.fftId.replace(' ', '\n');
                }),
              },
              series: fieldsNameList,
            },
            false,
          );
        },
        { deep: true },
      );

      onMounted(() => {});

      return {
        customHeader,
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
    @media screen and (max-width: 750px) {
      &-title {
        // 去除第3n个的margin-right
        display: block;
      }
    }

    &-content {
      border-top: 1px solid #2c67f1;
    }
  }
</style>
