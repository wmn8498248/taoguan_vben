<template>
  <div class="virtual-alarm-wrap">
    <div class="virtual-alarm-title">
      <Icon icon="alarm|svg" :size="23" />
      <span>设备报警</span>
    </div>
    <div class="virtual-alarm-content">
      <a-list item-layout="horizontal" :data-source="[]">
          <template #renderItem="{ item }">
            <a-list-item >
              <a-list-item-meta description="设备电压过低">
                <template #title>
                  <a href="#">{{ item.title }}</a>
                </template>
                <template #avatar>
                  <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
      </a-list>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { List, Avatar, Tag, Typography } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  interface DataItem {
    title: string;
  }
  const data: DataItem[] = [
    {
      title: 'xxx设备 1',
    },
    {
      title: 'xxx设备 2',
    },
    {
      title: 'xxx设备 3',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
    {
      title: 'xxx设备 4',
    },
  ];
  export default defineComponent({
    components: {
      Icon,
      [Avatar.name]: Avatar,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      ATypographyParagraph: Typography.Paragraph,
      [Tag.name]: Tag,
    },
    setup() {
      return {
        data,
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
      height: 178px;
      overflow: auto;
      color: #fff !important;
      .ant-list-item-meta-title > a{
        color: #fff;
      }
      .ant-list-split .ant-list-item{
        border-bottom: 1px solid #2c67f1;
      }
      .ant-spin-container{
        padding: 0 15px;
      }
      ::v-deep(.ant-list-item-meta-description) {
        color: #fff !important;
      }
      ::v-deep(.ant-empty-description){
        color: #fff 
      }
    }
  }
</style>

