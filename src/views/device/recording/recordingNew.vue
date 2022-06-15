<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @edit-change="onEditChange">
      <template #toolbar>
        <Tag>采集单元：</Tag>
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
        <a-button size="small" type="primary" @click="handleReloadCurrent">
          获取采集单元录波列表
        </a-button>
        <a-button size="small" type="primary" @click="handleReload">
          更新当前已获得的录波列表
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="createActions(record)" />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-if="column.key === 'tags'">
          <span>
            <a-select v-model:value="idxValue" style="width: 200px">
              <a-select-option
                v-for="(item, index) in record.idx"
                :key="index"
                :value="item"
                :label="item"
              >
              </a-select-option>
            </a-select>
          </span>
        </template>
        <template v-else-if="column.key === 'timeLabels'">
          <span>
            <a-select v-model:value="timeLabelsValue" style="width: 200px">
              <a-select-option
                v-for="(item, index) in record.timeLabels"
                :key="index"
                :value="item.second"
                :label="index"
              >
              </a-select-option>
            </a-select>
          
          </span>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  import {
    deviceBusinessList,
    recordWaveGet,
    recordWaveRead,
    recordWaveOut,
  } from '/@/api/device/manage';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag, Select } from 'ant-design-vue';

  const columns: BasicColumn[] = [
    {
      title: '板子id',
      dataIndex: 'boardId',
      fixed: 'left',
    },
    {
      dataIndex: 'usTrig',
      title: 'usTrig',
    },
    {
      dataIndex: 'frNum',
      title: '周波数量',
    },
    {
      dataIndex: 'idx',
      title: '周波下标索引列表',
      key: 'tags',
    },
    {
      dataIndex: 'timeLabels',
      title: '周波时间索引',
      key: 'timeLabels',
    },
  ];
  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Tag,
      [Select.name]: Select,
      ASelectOption: Select.Option,
    },
    setup() {
      let deviceListData = ref();

      let dataSourcTable = reactive([]);
      let selectValue = ref<string | undefined>(undefined);
      let idxValue = ref<string | undefined>(undefined);
      let timeLabelsValue = ref<string | undefined>(undefined);
      let selectValueChange = ref<string | undefined>(undefined);

      const { createMessage: msgTo } = useMessage();
      const [registerTable] = useTable({
        title: '最新录波列表',
        dataSource: dataSourcTable,
        searchInfo: { boardId: 'b0a0' },
        columns: columns,
        showIndexColumn: false,
        showTableSetting: false, 
        tableSetting: { fullScreen: true },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      // 下发读取波形命令
      async function handleEdit(record: EditRecordRow) {
        if (!idxValue.value) {
          msgTo.error({ content: '请选择周波下标', key: 'saving' });
          return;
        }
        if (!timeLabelsValue.value) {
          msgTo.error({ content: '请选择周波时间', key: 'saving' });
          return;
        }
        console.log(record.boardId);
        let refreshData = {
          boardId: record.boardId,
          idx: idxValue.value,
          second: timeLabelsValue.value,
        };
        const { code, msg } = await recordWaveOut(refreshData); // 获取列表

        if (code == 0) {
          msgTo.success({ content: msg, key: 'saving' });
        }

        console.log(record.boardId, 'record.boardId');
      }

      function createActions(record: EditRecordRow): ActionItem[] {
        return [
          {
            label: '下发读取波形命令',
            onClick: handleEdit.bind(null, record),
          },
        ];
      }

      function onEditChange({ column, value, record }) {
        // 本例
        if (column.dataIndex === 'id') {
          record.editValueRefs.name4.value = `${value}`;
        }
        console.log(column, value, record);
      }

      const handleChange = (value: string, option) => {
        console.log(`selected ${value}`);
        selectValueChange.value = option.label;
        handleReload();
      };

      async function handleReloadCurrent() {
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

      async function handleReload() {
        if (!selectValueChange.value) {
          msgTo.error({ content: '请选择采集单元', key: 'saving' });
          return;
        }
        let refreshData = {
          boardId: selectValueChange.value,
        };
        dataSourcTable = [];
        const { list } = await recordWaveRead(refreshData); // 获取列表

        if (list != undefined) {
          dataSourcTable = list;
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
        deviceListData,
        handleReloadCurrent,
        handleReload,
        selectValue,
        idxValue,
        timeLabelsValue,
        handleChange,
        registerTable,
        handleEdit,
        createActions,
        onEditChange,
      };
    },
  });
</script>
