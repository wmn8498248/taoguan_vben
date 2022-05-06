<template>
  <div class="virtual-alarm-wrap">
    <div class="virtual-alarm-title">
      <Icon icon="alarm|svg" :size="23" />
      <!-- <span>设备报警{{alarmData}}</span> -->
      <span>设备报警</span>
    </div>
    <div class="virtual-alarm-content">
      <a-list item-layout="horizontal" :data-source="alarmData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <div class="title"
                  >设备名称：<a-tag class="tag">{{ item.name || '暂无' }}</a-tag></div
                >
                <div class="title"
                  >报警类型：<a-tag class="tag">{{ dataList[item.type] }}</a-tag></div
                >
                <div class="title">
                  报警时间：
                  <a-tag class="tag">
                    {{ item.createTime }}
                  </a-tag>
                </div>
                <div class="title">
                  是否已处理
                  <a-tag class="tag">
                    {{ item.isClear ? '已处理' : '未处理' }}
                  </a-tag>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
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

  const dataList = [
    '无',
    '泄露电流过高',
    '泄露电流过低',
    '相对介损过高',
    '相对电容量过高',
    '零序电流过高1',
    '零序电流过高2',
    '电容量波动过大',
  ];
  const props = {
    alarmPage: Array,
    // alarmPage: {
    //   phase: String, //相对介损
    //   padding: String, //无关
    //   timeScale: String, //无关
    //   currentRms: String, //电流(mA)
    //   pressure: String, //无关
    //   type: Number, //报警类型
    //   isClear: Number, //是否已处理；0未处理，1已处理
    //   bushingId: String, //相位
    //   relativeCapacitance: String, //相对电容量；单位*100%
    //   createTime: String, //时间
    //   name: String, //名称
    //   boardId: String, //电路板id
    // },
  };
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
    props,
    setup(props) {
      const alarmData = computed(() => props.alarmPage);
      console.log(alarmData, 'alarmData___________');
      return {
        dataList,
        data,
        alarmData,
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
    &-title {
      display: flex;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #041554;
      align-items: center;
      span {
        padding-left: 10px;
      }
    }

    &-content {
      border-top: 1px solid #2c67f1;
      height: 178px;
      overflow: auto;
      color: #fff !important;
      .title {
        color: #fff;
        // text-align:center;
        margin: 5px 20px;
      }
      .ant-list-item-meta-title > a {
        color: #fff;
      }
      .ant-list-split .ant-list-item {
        border-bottom: 1px solid #2c67f1;
      }
      .ant-spin-container {
        padding: 0 15px;
      }
      ::v-deep(.ant-list-item-meta-description) {
        color: #fff !important;
      }
      ::v-deep(.ant-empty-description) {
        color: #fff;
      }
    }
  }
</style>
