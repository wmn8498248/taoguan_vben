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
        :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }" 
        :labelStyle="{ backgroundColor: '#3d51a3', borderColor: '#041554', color: '#fff'}">
        <!-- <template #extra>
          <a-button type="primary">Edit</a-button>
        </template> -->
        <a-descriptions-item label="板子编号">b0a0</a-descriptions-item>
        <a-descriptions-item label="三相">A</a-descriptions-item>
        <a-descriptions-item label="位置">110kVⅡ母避雷器B相</a-descriptions-item>
        <a-descriptions-item label="是否可用">可用</a-descriptions-item>
        <a-descriptions-item label="系数K">20.00</a-descriptions-item>
        <a-descriptions-item label="系数A">60.00</a-descriptions-item>
        <a-descriptions-item label="备注">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>

</template>
<script lang="ts">
  import { Icon } from '/@/components/Icon';
  import { defineComponent } from 'vue';
  // import type { DescriptionsProps, Descriptions } from 'ant-design-vue';
  import {  Card, Empty, Descriptions, Steps, Tabs } from 'ant-design-vue';

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
    setup() {
      return {
      };
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
    &-title{
      display: flex;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      align-items: center;
      span{
        padding-left: 10px;
      }
    }
  
    &-content{
      border-top: 1px solid #2c67f1;
      height: 322px;
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

