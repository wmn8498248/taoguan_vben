<template>
  <div class="virtual-alarm-wrap">
    <div class="virtual-alarm-title">
      <Icon icon="install|svg" :size="30" />
      <span>设备信息</span>
    </div>
    <div class="virtual-alarm-content">
      <a-descriptions
        bordered
        :size="'small'"
        :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }"
        :labelStyle="{ backgroundColor: '#3d51a3', borderColor: '#041554', color: '#fff' }"
      >
        <a-descriptions-item label="名称">{{ deviceList.name }}</a-descriptions-item>
        <a-descriptions-item label="三相">{{ deviceList.threePhase }}</a-descriptions-item>
        <a-descriptions-item label="电路板ID">{{ deviceList.boardId }}</a-descriptions-item>
        <a-descriptions-item label="通路序号">{{ deviceList.bushingId }}</a-descriptions-item>
        <a-descriptions-item label="计算方式">{{ deviceList.calculationMethod  }}</a-descriptions-item>
        <a-descriptions-item label="滤波系数">{{ deviceList.monitorFilterA }}</a-descriptions-item>
        <a-descriptions-item label="变比系数">{{ deviceList.monitorRatioK }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>
<script lang="ts">
  import { Icon } from '/@/components/Icon';
  import { defineComponent, computed } from 'vue';
  // import type { DescriptionsProps, Descriptions } from 'ant-design-vue';
  import { Card, Empty, Descriptions, Steps, Tabs } from 'ant-design-vue';
  const props = {
    deviceList: {
      type: Object,
      default: {
        min: { type: Boolean, default: 0 }, //最小值
        avg: { type: Boolean, default: 0 },
        max: { type: Boolean, default: 0 },
        name: String,
        boardId: String,
        lu: String, // 第几路
        bushingId: String, //相位
        alarmMax: null || String, //电流上限(mA)
        alarmLoss: null || String, //相对介损上限
        alarmMin: null || String, //电流下限(mA)
        alarmCap: null || String, //相对电容量上限(%)
      },
    }
  };
  export default defineComponent({
    components: {
      Icon,
      [Card.name]: Card,
      Empty,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    props,
    setup(props) {
      const deviceList = computed(() => props.deviceList);
      console.log(deviceList)
      return { deviceList };
    },
  });
</script>
<style lang="less" scoped>
  .virtual-alarm {
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
      align-items: center;
      span {
        padding-left: 10px;
      }
    }

    &-content {
      border-top: 1px solid #2c67f1;
      min-height: 322px;
      overflow: auto;
      color: #fff !important;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      ::v-deep(.ant-descriptions-bordered .ant-descriptions-view) {
        border: 1px solid #2c67f0;
      }
      ::v-deep(.ant-descriptions-bordered .ant-descriptions-row) {
        border: 1px solid #1938bb;
      }
      ::v-deep(.ant-descriptions-bordered .ant-descriptions-item-content) {
        border: none;
        color: #d2d4dd;
      }
    }
  }
</style>
