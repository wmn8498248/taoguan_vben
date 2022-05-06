<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="total-sales|svg" :size="30" />
      <span>设备列表</span>
      <a-select
        v-model:value="value"
        mode="multiple"
        style="width: 120px; flex: 1"
        placeholder="可选列"
        :max-tag-count="maxTagCount"
        :options="options"
      >
        <template #maxTagPlaceholder="omittedValues" style="background-color: #fff">
          <span style="color: #fff">+ {{ omittedValues.length }} ...</span>
        </template>
      </a-select>
    </div>
    <div class="virtual-scroll-content">
      <div class="virtual-scroll__item virtual-scroll_tit">
        <span class="title" v-for="item in value">{{ optionsName[item] }}</span>
      </div>
      <VScroll :itemHeight="41" :items="deviceList" :height="250" :width="510" :bench="50">
        <template #default="{ item, index }">
          <div
            :class="
              itemAction == index
                ? 'virtual-scroll__item virtual-scroll__action'
                : 'virtual-scroll__item'
            "
            @click="itemListClick(item, index)"
          >
            <span v-for="el in value"> {{ item[el] }}</span>
            <!-- <span
              ><Tag color="#669900">{{ item.deviceName }}</Tag></span
            >
            <span
              ><Tag color="#990000">{{ item.deviceName }}</Tag></span
            > -->
          </div>
        </template>
      </VScroll>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { VScroll } from '/@/components/VirtualScroll/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Divider, Select } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';

  const data: Recordable[] = (() => {
    const arr: Recordable[] = [];
    for (let index = 1; index < 5; index++) {
      arr.push({
        title: '列表项' + index,
      });
    }
    return arr;
  })();

  const props = {
    deviceList: Array,
    count: { type: Number, default: 60 },
  };

  export default defineComponent({
    components: { VScroll: VScroll, Divider, Tag, Icon, ASelect: Select },
    props,
    emits: ['my-click'],
    setup(props, contex) {
      // const { deviceList } = props;
      const optionsName = {
        deviceName: '设备名称',
        phase: '相对介损',
        relativeCapacitance: '相对电容量',
        dielectricLoss: '绝对介损',
        cap: '电容量(pF)',
        volt: '电压(kV)',
        currentRms: '电流(mA)',
      };
      const options = ref<SelectProps['options']>([
        {
          label: '设备名称',
          value: 'deviceName',
        },
        {
          label: '相对介损',
          value: 'phase',
        },
        {
          label: '相对电容量',
          value: 'relativeCapacitance',
        },
        {
          label: '绝对介损',
          value: 'dielectricLoss',
        },
        {
          label: '电容量(pF)',
          value: 'cap',
        },
        {
          label: '电压(kV)',
          value: 'volt',
        },
        {
          label: '电流(mA)',
          value: 'currentRms',
        },
      ]);
      const maxTagCount = ref(1);
      const maxTagTextLength = ref(10);
      let itemAction = ref(0);

      async function itemListClick(item: any, index) {
        contex.emit('my-click', index);
        itemAction.value = index;
      }
      return {
        itemAction,
        optionsName,
        props,
        value: ref(['deviceName', 'phase', 'relativeCapacitance', 'volt', 'currentRms']),
        options,
        maxTagCount,
        maxTagTextLength,
        data: data,
        itemListClick,
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
    &-title {
      display: flex;
      width: 100%;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      align-items: center;
      justify-items: center;
      ::v-deep(.ant-select-selector) {
        background-color: #0e2589;
        border: none;
        border-radius: 0;
      }
      ::v-deep(.ant-select-selection-item) {
        background-color: #060c58;
        border: none;
        border-radius: 0;
        color: #fff;
      }
      span {
        padding-left: 10px;
        flex: 0.8;
      }
    }

    &-content {
      border-top: 1px solid #2c67f1;
    }

    &__item {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      border-bottom: 1px solid #0e2589;
      display: flex;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      span.title {
        color: #05fff6;
      }
      span {
        flex: 1;
      }
    }
    &__item:hover {
      background-color: #0e2589;
    }
    &__action {
      background-color: #0e2589;
    }
  }
</style>
