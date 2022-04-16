<template>
  <div class="virtual-alarm-wrap">
    <div class="virtual-alarm-title">
      <Icon icon="total-sales|svg" :size="30" />
      <span>设备报警</span>
    </div>
    <div class="virtual-scroll-content">
      <Tabs>
        <template v-for="item in listData" :key="item.key">
          <TabPane>
            <template #tab>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
            <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
            <NoticeList :list="item.list" v-else />
          </TabPane>
        </template>
      </Tabs>  
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { tabListData, ListItem } from './data';
  import NoticeList from './yg_noticeList.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Icon } from '/@/components/Icon';

  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList, Icon },
    setup() {
      const { createMessage } = useMessage();
      const listData = ref(tabListData);

     
      function onNoticeClick(record: ListItem) {
        createMessage.success('你点击了通知，ID=' + record.id);
        // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
        record.titleDelete = !record.titleDelete;
      }

      return {
        listData,
        onNoticeClick,
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

    }
    
  }
</style>

