<template>
  <div
    class="md:flex flex-wrap box-lists"
    :style="listHeight ? 'height: 250px;' : 'height: auto;'"
    v-if="deviceList.length > 0"
  >
    <div
      :class="itemAction == index ? 'box-item box-item-action' : 'box-item'"
      v-for="(item, index) in deviceList"
      :key="index"
      @click="itemListClick(item, index)"
    >
      <Card
        size="small"
        :bordered="false"
        :headStyle="{ paddingTop: '8px', color: '#16ffff' }"
        :title="item.deviceName"
      >
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">设备</Tag>
          <span>{{ item.deviceBusiness.name }}</span>
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">{{ item.deviceBusiness.isBoxVolt ? '电压/kV' : '电流/mA' }}</Tag>
          <span>{{ item.monitorValue == null ? '暂无' : item.monitorValue }}</span>
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">相对电容量(%)</Tag>
          <span>{{ item.relativelyCap == null ? '暂无' : item.relativelyCap }}</span>
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">相对介损</Tag>
          <span>{{ item.relativelyLoss == null ? '暂无' : item.relativelyLoss }}</span>
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">电容量(pF)</Tag>
          <span>{{ item.cap == null ? '暂无' : item.cap }}</span>
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">介损</Tag>
          <span>{{ item.loss == null ? '暂无' : item.loss }}</span>
        </div>
      </Card>
    </div>
  </div>
  <div class="list-expand"
    ><span @click="autoHeight()">{{ listHeight ? '展开' : '收缩' }}</span></div
  >
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';

  const props = {
    deviceList: { type: null, default: [] },
  };

  export default defineComponent({
    components: { CountTo, Tag, Card },
    emits: ['my-click'],
    props,
    setup(props, contex) {
      let itemAction = ref(0);
      let listHeight = ref(true);
      const deviceList = computed(() => props.deviceList);

      async function itemListClick(item: any, index) {
        console.log(item);
        contex.emit('my-click', index);
        itemAction.value = index;
      }
      function autoHeight() {
        listHeight.value = !listHeight.value;
      }

      return { deviceList, itemAction, itemListClick, autoHeight, listHeight };
    },
  });
</script>
<style lang="less" scoped>
  .list-expand {
    text-align: center;
    color: #fff;
    line-height: 40px;
    span {
      padding: 3px 10px;
      border: 1px solid #c9d1d9;
      background-color: #09266f;
      font-size: 12px;
      border-radius: 2px;
      cursor: pointer;
    }
    span:hover {
      background-color: #1938bb;
    }
  }
  .box-lists {
    height: 250px;
    overflow: hidden;
    .ant-card {
      background-image: url(/src/assets/images/box-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: transparent;
      color: #c9d1d9;
    }
    .box-item {
      flex: 1;
      margin: 0 5px 5px 0; // 间隙为5px
      // background-color: #999;
      width: calc(
        (100% - 35px) / 7
      ); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
      min-width: calc((100% - 35px) / 7); // 加入这两个后每个item的宽度就生效了
      max-width: calc((100% - 35px) / 7); // 加入这两个后每个item的宽度就生效了
      cursor: pointer;
    }
    .box-item:hover {
      background-color: #000;
    }
    .box-item-action {
      background-color: #000;
    }
    @media screen and (min-width: 1366px) {
      .box-item:nth-child(8n) {
        // 去除第3n个的margin-right
        margin-right: 0;
      }
    }

    @media screen and (max-width: 1366px) {
      .box-item {
        flex: 1;
        margin: 0 5px 5px 0; // 间隙为5px
        width: calc(
          (100% - 25px) / 4
        ); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
        min-width: calc((100% - 25px) / 4); // 加入这两个后每个item的宽度就生效了
        max-width: calc((100% - 25px) / 4); // 加入这两个后每个item的宽度就生效了
      }
      .box-item:nth-child(6n) {
        // 去除第3n个的margin-right
        margin-right: 0;
      }
    }
    @media screen and (max-width: 750px) {
      .box-item {
        flex: 1;
        margin: 0 5px 5px 0; // 间隙为5px
        width: 100%; // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
        min-width: 100%; // 加入这两个后每个item的宽度就生效了
        max-width: 100%; // 加入这两个后每个item的宽度就生效了
      }
    }
  }
</style>
