<template>
  <PageWrapper class="virtual-scroll">
    <div class="virtual-scroll-wrap">
      <VScroll :itemHeight="41" :items="data" :height="300" :width="300" :bench="50">
        <template #default="{ item }">
          <div class="virtual-scroll__item">
            <span> {{ item.title }}</span>
            <span>名称</span>
            <span>电流</span>
            <span>已同步</span>
          </div>
        </template>
      </VScroll>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { VScroll } from '/@/components/VirtualScroll/index';

  import { Divider } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  const data: Recordable[] = (() => {
    const arr: Recordable[] = [];
    for (let index = 1; index < 20000; index++) {
      arr.push({
        title: '列表项' + index,
      });
    }
    return arr;
  })();
  export default defineComponent({
    components: { VScroll: VScroll, Divider, PageWrapper },
    setup() {
      return { data: data };
    },
  });
</script>
<style lang="less" scoped>
  .virtual-scroll {
    &-wrap {
      display: flex;
      background-color: @component-background;
      justify-content: center;
    }

    &__item {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      border-bottom: 1px solid @border-color-base;
      display: flex;
      justify-content: center;
      span{
        flex: 1;
      }
    }
  }
</style>
