<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="total-sales|svg" :size="30" />
      <span>设备列表</span>
       <a-select
        v-model:value="value"
        mode="multiple"
        style="width: 120px; flex:1; "
        placeholder="可选列"
        :max-tag-count="maxTagCount"
        :options="options"
      >
        <template #maxTagPlaceholder="omittedValues" style="background-color: #fff;">
          <span style="color: #fff">+ {{ omittedValues.length }} ...</span>
        </template>
      </a-select>
    </div>
    <div class="virtual-scroll-content">
      <div class="virtual-scroll__item virtual-scroll_tit">
        <span class="title">名称</span>
        <span class="title">名称</span>
        <span class="title">电流</span>
        <span class="title">同步</span>
        <span class="title">米有</span>
      </div>
      <VScroll :itemHeight="41" :items="data" :height="250" :width="400" :bench="50">
        <template #default="{ item }">
          <div class="virtual-scroll__item" @click="itemListClick(item)">
            <span> {{ item.title }}</span>
            <span>名称</span>
            <span>电流</span>
            <span><Tag color="#669900">已同步</Tag></span>
            <span><Tag color="#990000">未同步</Tag></span>
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
  export default defineComponent({
    components: { VScroll: VScroll, Divider, Tag, Icon, ASelect: Select},
    setup() {
      const options = ref<SelectProps['options']>([
        {
          label: '电流',
          value: 'a11',
        },
        {
          label: '相电压',
          value: 'a12',
        },
        {
          label: '电容',
          value: 'a13',
        },
        {
          label: '介损',
          value: 'a14',
        },
      ]);

      const maxTagCount = ref(1);
      const maxTagTextLength = ref(10);

      async function itemListClick(item: any) {
        console.log(item, "王者荣耀————————")
      }
      return { 
        value: ref(['a11']),
        options,
        maxTagCount,
        maxTagTextLength,
        data: data ,
        itemListClick 
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
    &-title{
      display: flex;
      width: 100%;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      align-items: center;
      justify-items: center;
      ::v-deep(.ant-select-selector){
        background-color: #0e2589;
        border: none;
        border-radius: 0;
      }
      ::v-deep(.ant-select-selection-item){
        background-color: #060c58;
        border: none;
        border-radius: 0;
        color: #fff;
      }
      span{
        padding-left: 10px;
        flex: .8;
      }
    }
  
    &-content{
      border-top: 1px solid #2c67f1;

    }

    &__item {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      border-bottom: 1px solid #0e2589;
      display: flex;
      justify-content: center;
      cursor: pointer;
      span.title{
        color: #05fff6;
      }
      span{
        flex: 1;
      }
    }
    &__item:hover{
      background-color: #0e2589;
    }
  }
</style>
