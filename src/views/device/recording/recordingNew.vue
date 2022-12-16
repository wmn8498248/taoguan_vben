<template>
  <div class="p-4">
    <CollapseContainer class="mt-4" title="基本设置">
      <!-- <Tag>采集单元：</Tag> -->
      <a-select
        v-model:value="selectValue"
        show-search
        placeholder="请输入采集单元"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option
          v-for="(item, index) in deviceListData"
          :key="index"
          :value="item.name"
          :label="item.boardId"
        >
        </a-select-option>
      </a-select>
      <!-- type="primary" -->
      <a-button class="ml-4 mr-2" preIcon="mdi:page-next-outline" @click="recordReset"> 重置采集单元录波列表 </a-button>
      <a-button class="mr-2" preIcon="ion:barcode-outline" @click="recordGet">
        获取采集单元录波列表
      </a-button>
      <a-button class="mr-2" preIcon="ion:barcode-outline" @click="recordRead">
        获取redis已读取到的录波列表
      </a-button>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="板子信息" v-if="dataSourcTable !== null">
      <div class="flex justify-items-center flex-wrap">
        <div class="w-full mt-4"><Tag>板子id:</Tag>{{ dataSourcTable.boardId }}</div>
        <div class="w-full mt-4">
          <Tag>fft: </Tag>
          <a-select v-model:value="fftValue" style="width: 200px">
            <a-select-option
              v-for="(item, index) in dataSourcTable.fftList"
              :key="index"
              :value="item"
              :label="item"
            >
            </a-select-option>
          </a-select>
        </div>
        <div class="w-full mt-4">
          <Tag>bushingId: </Tag>
          <a-select v-model:value="bushingId" style="width: 200px">
            <a-select-option v-for="(item, index) in 8" :key="index" :value="index" :label="index">
            </a-select-option>
          </a-select>
        </div>
        <div class="w-full mt-4 mb-4">
          <a-button class="" type="primary" preIcon="mdi:air-filter" @click="handleEdit"> 下发读取波形命令 </a-button>
        </div>
      </div>
    </CollapseContainer>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  import {
    deviceBusinessList,
    recordWaveGet,
    recordWaveRead,
    recordWaveOut,
    recordWaveReset,
  } from '/@/api/device/manage';

  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag, Select } from 'ant-design-vue';
import { nullLiteral } from '@babel/types';

  export default defineComponent({
    components: {
      CollapseContainer,

      Tag,
      [Select.name]: Select,
      ASelectOption: Select.Option,
    },
    setup() {
      let deviceListData = ref();

      let dataSourcTable = ref<any>(null);
      let selectValue = ref<string | undefined>(undefined);
      let bushingId = ref(0);
      let fftValue = ref<string | undefined>(undefined);
      let selectValueChange = ref<string | undefined>(undefined);

      const { createMessage: msgTo } = useMessage();

      // 下发读取波形命令
      async function handleEdit() {
        // if (bushingId.value !==  null) {
        //   msgTo.error({ content: '请选择bushingId', key: 'saving' });
        //   return;
        // }

        if (fftValue.value === undefined) {
          msgTo.error({ content: '请选择fftValue', key: 'saving' });
          return;
        }

        let refreshData = {
          boardId: dataSourcTable.boardId,
          bushingId: bushingId.value,
          fft: fftValue.value,
        };
        const { code, msg } = await recordWaveOut(refreshData); // 获取列表

        if (code == 0) {
          msgTo.success({ content: msg, key: 'saving' });
        }

        console.log(dataSourcTable.boardId, 'record.boardId');
      }

      const handleChange = (value: string, option) => {
        console.log(`selected ${value}`);
        selectValueChange.value = option.label;
      };

      // 重置采集单元录波列表
      async function recordReset() {
        if (!selectValueChange.value) {
          msgTo.error({ content: '请选择采集单元', key: 'saving' });
          return;
        }
        let refreshData = {
          boardId: selectValueChange.value,
        };

        const { code, msg } = await recordWaveReset(refreshData); //

        if (code == 0) {
          msgTo.success({ content: msg, key: 'saving' });
        }
      }

      // 获取采集单元录波列表
      async function recordGet() {
        if (!selectValueChange.value) {
          msgTo.error({ content: '请选择采集单元', key: 'saving' });
          return;
        }
        let refreshData = {
          boardId: selectValueChange.value,
        };

        const { code, msg } = await recordWaveGet(refreshData); // 命令下发

        if (code == 0) {
          msgTo.success({ content: msg, key: 'saving' });
        }
      }

      // 获取redis已读取到的录波列表
      async function recordRead() {
        if (!selectValueChange.value) {
          msgTo.error({ content: '请选择采集单元', key: 'saving' });
          return;
        }
        let refreshData = {
          boardId: selectValueChange.value,
        };

        const { vo } = await recordWaveRead(refreshData); // 获取列表
        if (vo !== undefined) {
          dataSourcTable.value = vo;
        } else {
          msgTo.error({ content: '暂无录波列表', key: 'error' });
        }
      }

      async function getHomeListApi() {
        let pages = {
          page: 1,
          limit: 999999,
        };
        const { page } = await deviceBusinessList(pages);
        deviceListData.value = page.list;
      }
      onMounted(async () => {
        getHomeListApi();
      });

      return {
        dataSourcTable,
        deviceListData,
        recordReset,
        recordGet,
        recordRead,
        selectValue,
        bushingId,
        fftValue,
        handleChange,
        handleEdit,
      };
    },
  });
</script>
