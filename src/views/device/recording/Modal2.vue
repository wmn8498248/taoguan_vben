<template>
  <BasicModal
    v-bind="$attrs"
    :title="deviceName"
    width="900px"
    :canFullscreen="false"
    :showOkBtn="false"
    :defaultFullscreen="false"
  >
    <Card
      :tab-list="tabListTitle"
      v-bind="$attrs"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <p v-if="activeKey === 'tab1'">
        <VisitAnalysis :timestamp="timestamp" :frequencyList="frequencyList" />
      </p>
      <p v-if="activeKey === 'tab2'">
        <VisitAnalysisBar
          :timestamp="timestamp"
          :harmonicList="harmonicList"
          :monitorValueList="monitorValueList"
        />
      </p>
    </Card>
  </BasicModal>
</template>
<script lang="ts">
  import { basicProps } from './props';
  import { BasicModal } from '/@/components/Modal';
</script>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';

  defineProps({
    ...basicProps,
    timestamp: { type: Number, default: 0 },
    deviceName: { type: String, default: '板子Id' },
    frequencyList: { type: null, default: [] },
    harmonicList: { type: null, default: [] },
    monitorValueList: { type: null, default: [] },
    // isBoxVolt: { type: Boolean, default: true }, //电流/电压，isBoxVolt为true，表示电压(kV)，否则是电流(mA)
  });
  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '周波展示图',
    },
    {
      key: 'tab2',
      tab: '谐波展示图',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
