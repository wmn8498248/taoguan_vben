<template>
  <div class="md:flex yg-box">
    <div class="md:w-1/2 w-full mr-2 yg-box-content">
      <Tag color="#55acee">实时数据</Tag><span class="count-text"><CountTo prefix="(A)" :startVal="1" :endVal="34" /></span>
    </div>
    <div class="md:w-1/2 w-full !md:mt-0 mt-2 yg-box-content">
      <Tag color="#cd201f">平局值</Tag><span class="count-text"><CountTo prefix="(A)" :startVal="1" :endVal="34" /></span>
    </div>
    
  </div>
  <div class="md:flex yg-box">
    <div class="md:w-1/2 w-full md:mr-2 mr-0 mt-2 yg-box-content">
      <Tag color="#3b5999">最大值</Tag><span class="count-text"><CountTo prefix="(A)" :startVal="1" :endVal="34" /></span>
    </div>
    <div class="md:w-1/2 w-full !md:mr-0  mt-2 yg-box-content">
      <Tag color="success">最小值</Tag><span class="count-text"><CountTo prefix="(A)" :startVal="1" :endVal="34" /></span>
    </div>
  </div>

   <!-- <CountTo prefix="(A)" :startVal="1" :endVal="34" /> -->
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Tag } from 'ant-design-vue';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
<style lang="less" scoped>
  .yg-box{
    &-content{
      line-height: 60px;
      background-image: url("../../../../assets/images/box-bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span.count-text{
        font-size: 1rem;
        color: #feef00;
      }
    }
  }
</style>
