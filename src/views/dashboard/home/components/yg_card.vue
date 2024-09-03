<template>
  <div
    class="md:flex flex-wrap box-lists"
    :style="listHeight ? 'max-height: 250px;' : 'height: auto;'"
  >
    <div
      :class="itemAction == index ? 'box-item box-item-action' : 'box-item'"
      v-for="(item, index) in deviceList"
      :key="index"
      @click="itemListClick(index)"
    >
      <Card
        size="small"
        :bordered="false"
        :headStyle="{ paddingTop: '8px', color: '#16ffff' }"
        :title="item.deviceName"
      >
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">设备</Tag>
          <span class="conut-tx">{{ item.deviceBusiness.name }}</span>
        </div>
        <template v-for="field in fieldsAll">
          <div class="p-1.5 px-4 flex justify-between" v-if="field.state">
            <Tag color="#108ee9">{{
              field.showName === '数值'
                ? item.deviceBusiness.isBoxVolt
                  ? '电压/kV'
                  : '电流/mA'
                : field.showName
            }}</Tag>
            <!-- <span class="conut-tx">{{ item.deviceBusiness[field.fieldsName] }}</span> -->
            <!-- <span class="conut-tx">{{ field.fieldsName }}</span> -->
            <span class="conut-tx">{{
              item[field.fieldsName] !== null ? item[field.fieldsName] : '暂无'
            }}</span>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div class="list-expand"
    ><span @click="autoHeight()">{{ listHeight ? '展开' : '收缩' }}</span></div
  >
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';

  // import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';

  const emit = defineEmits(['my-click']);

  const props = defineProps({
    deviceList: { type: Array as any, default: [] },
    fieldsListData: { type: Array as any, default: [] },
  });

  let itemAction = ref(0);
  let listHeight = ref(true);
  const deviceList = computed(() => props.deviceList);
  const fieldsAll = computed(() => props.fieldsListData);

  async function itemListClick(index) {
    emit('my-click', index);
    itemAction.value = index;
  }
  function autoHeight() {
    listHeight.value = !listHeight.value;
  }
</script>
<style lang="less" scoped>
  .list-expand {
    margin-top: 20px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    box-shadow: 0 -12px 14px 0px #6576b8;
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
    // max-height: 350px;
    overflow: hidden;
    justify-content: center;
    .conut-tx {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ant-card {
      background-image: url(/src/assets/images/box-bg.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: transparent;
      color: #c9d1d9;
    }
    .box-item {
      flex: 1;
      margin: 3px; // 间隙为5px
      // background-color: #999;
      width: calc(
        (100% - 42px) / 7
      ); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
      min-width: calc((100% - 42px) / 7); // 加入这两个后每个item的宽度就生效了
      max-width: calc((100% - 42px) / 7); // 加入这两个后每个item的宽度就生效了
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
        margin: 3px; // 间隙为5px
        width: calc(
          (100% - 30px) / 4
        ); // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
        min-width: calc((100% - 30px) / 4); // 加入这两个后每个item的宽度就生效了
        max-width: calc((100% - 30px) / 4); // 加入这两个后每个item的宽度就生效了
      }
      .box-item:nth-child(6n) {
        // 去除第3n个的margin-right
        margin-right: 0;
      }
    }
    @media screen and (max-width: 750px) {
      .box-item {
        flex: 1;
        margin: 3px; // 间隙为5px
        width: 100%; // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
        min-width: 100%; // 加入这两个后每个item的宽度就生效了
        max-width: 100%; // 加入这两个后每个item的宽度就生效了
      }
    }
  }
</style>
