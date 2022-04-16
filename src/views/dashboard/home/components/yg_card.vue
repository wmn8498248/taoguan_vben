<template>
  <div class="md:flex flex-wrap box-lists">
    <div  class="box-item" v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :bordered="false"
        :headStyle="{paddingTop: '8px', color: '#16ffff'}"
        :title="item.title + index"
      >
        <!-- <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template> -->
       
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">电流</Tag>
          <CountTo prefix="(A)" :startVal="1" :endVal="item.total" />
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">相电压</Tag>
          <CountTo prefix="(V)" :startVal="1" :endVal="item.total" />
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">电容</Tag>
          <CountTo prefix="(C)" :startVal="1" :endVal="item.total" />
        </div>
        <div class="p-1.5 px-4 flex justify-between">
          <Tag color="#108ee9">介损</Tag>
          <CountTo prefix="(W)" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { CountTo } from '/@/components/CountTo/index';
  import { Tag, Card } from 'ant-design-vue';
  import { growCardList } from '../data';

  export default defineComponent({
    components: { CountTo, Tag, Card, },
    setup(props) {

      const loading = props

      return{ growCardList, loading}
      
    }
  });
</script>
<style lang="less" scoped>
.box-lists{
  // ::v-deep(.ant-card-head-title) {
  //   color: #fff;
  // }
  .ant-card{
    background-image: url(/src/assets/images/box-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    color: #c9d1d9;
  }
  .box-item{
    flex: 1;
    margin: 0 5px 5px 0; // 间隙为5px
    // background-color: #999;
    width: calc((100% - 35px) / 8);  // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
    min-width: calc((100% - 35px) / 8); // 加入这两个后每个item的宽度就生效了
    max-width: calc((100% - 35px) / 8); // 加入这两个后每个item的宽度就生效了
  }
  @media screen and (min-width: 1366px) {
    .box-item:nth-child(8n) { // 去除第3n个的margin-right
      margin-right: 0;
    }
  }
 
  @media screen and (max-width: 1366px) {
    .box-item{
      flex: 1;
      margin: 0 5px 5px 0; // 间隙为5px
      width: calc((100% - 25px) / 6);  // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
      min-width: calc((100% - 25px) / 6); // 加入这两个后每个item的宽度就生效了
      max-width: calc((100% - 25px) / 6); // 加入这两个后每个item的宽度就生效了
    }
  .box-item:nth-child(6n) { // 去除第3n个的margin-right
      margin-right: 0;
    }
  }
  @media screen and (max-width: 750px) {
    .box-item{
      flex: 1;
      margin: 0 5px 5px 0; // 间隙为5px
      width: 100%;  // 这里的10px = (分布个数3-1)*间隙5px, 可以根据实际的分布个数和间隙区调整
      min-width: 100%; // 加入这两个后每个item的宽度就生效了
      max-width: 100%; // 加入这两个后每个item的宽度就生效了
    }
  }
}

</style>
