<template>
  <div class="virtual-scroll-wrap">
    <div class="virtual-scroll-title">
      <Icon icon="total-sales|svg" :size="30" />
      <span>设备列表</span>
      <a-select
        v-model:value="value"
        mode="multiple"
        style="flex: 0.5"
        placeholder="可选列"
        @change="valueChange"
        :max-tag-count="maxTagCount"
      >
        <a-select-option
          v-for="(item, index) in options"
          :key="index"
          :value="item.fieldsName"
          :label="item.showName"
        >
          {{ item.showName }}
        </a-select-option>
        <template #maxTagPlaceholder="omittedValues" style="background-color: #fff">
          <span style="color: #fff">+ {{ omittedValues.length }} ...</span>
        </template>
      </a-select>
      <span style="flex: 0.1; text-align: right">
        <router-link to="/device/parameters">
          <a-tag class="tag"> 更多 </a-tag>
        </router-link></span
      >
    </div>
    <div class="virtual-scroll-content">
      <div class="virtual-scroll__item virtual-scroll_tit">
        <span class="title" v-for="item in value" :title="optionsName[item]">{{
          optionsName[item]
        }}</span>
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
            <span
              v-for="el in value"
              :title="el == 'name' ? item.deviceBusiness.name : item[el] || '暂无'"
            >
              {{ el == 'name' ? item.deviceBusiness.name : item[el] || '暂无' }}</span
            >
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
  import { defineComponent, ref, reactive } from 'vue';
  import { VScroll } from '/@/components/VirtualScroll/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Divider, Select } from 'ant-design-vue';

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
    fieldsList: { type: null, default: [] },
    deviceList: { type: null, default: [] },
    count: { type: Number, default: 60 },
  };

  export default defineComponent({
    components: {
      VScroll: VScroll,
      Divider,
      [Tag.name]: Tag,
      Icon,
      [Select.name]: Select,
      ASelectOption: Select.Option,
    },
    props,
    emits: ['my-click', 'fieldsClick'],
    setup(props, contex) {
      // const { deviceList } = props;

      const options = props.fieldsList;

      let value = ref<any>(['name']);
      let optionsName = reactive({ name: '传感器名称' });

      options.forEach((element: { state: boolean; fieldsName: string; showName: string }) => {
        optionsName[element.fieldsName] = element.showName;
        if (element.state === true) {
          value.value.push(element.fieldsName);
        }
      });

      const maxTagCount = ref(0);
      const maxTagTextLength = ref(10);
      let itemAction = ref(0);

      async function itemListClick(item: any, index: number) {
        console.log(item, 'item__');
        contex.emit('my-click', index);
        itemAction.value = index;
      }
      function valueChange(value: any[]) {
        if (value.length > 4) {
          value.splice(1, value.length - 4);
        }
        contex.emit('fieldsClick', value);
      }

      return {
        itemAction,
        optionsName,
        props,
        value,
        options,
        maxTagCount,
        maxTagTextLength,
        data: data,
        itemListClick,
        valueChange,
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
      width: 100%;
      text-align: center;
      cursor: pointer;
      span.title {
        color: #05fff6;
      }
      span {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
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
