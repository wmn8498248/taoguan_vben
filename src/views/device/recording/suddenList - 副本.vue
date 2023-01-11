<template>
  <div class="p-4">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess" :pagination="{ page: 3, limit:20 }">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看波形',
              onClick: handleEdit.bind(null, record),
              // auth: 'other', // 根据权限控制是否显示: 无权限，不显示
            },
          ]"
        />
      </template>
    </BasicTable>
    <Modal2
      :deviceName="deviceNameData"
      :timestamp="timestamp"
      :frequencyList="frequencyListData"
      :harmonicList="harmonicListData"
      :monitorValueList="monitorValueListData"
      @register="register2"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
  import Modal2 from './Modal2.vue';
  // import { demoListApi } from '/@/api/demo/table';
  import { useModal } from '/@/components/Modal';

  import { recordSuddenGet, recordSuddenInfo } from '/@/api/device/sudden';

  const columns: BasicColumn[] = [
    {
      title: '录波保存时间',
      dataIndex: 'createTime',
    },
    {
      title: '设备唯一编码',
      dataIndex: 'deviceUniqueId',
    },
    {
      title: '突变接收时间',
      dataIndex: 'fftId',
    },
    {
      title: '周波数量',
      dataIndex: 'waveNum',
    },
    {
      title: '电流值',
      dataIndex: 'monitorValue',
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction, Modal2 },
    setup() {
      let waveListData = ref([]);
      let timestamp = ref(0);
      let deviceNameData = ref('');
      let frequencyListData = ref([]);
      let harmonicListData = ref([]);
      let monitorValueListData = ref([]);

      const [register2, { openModal: openModal2 }] = useModal();
      const [registerTable] = useTable({
        title: '突变列表',
        api: recordSuddenGet,
        columns: columns,
        // dataSource: waveListData,
        bordered: true,
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      async function handleEdit(record: Recordable) {
        openModal2();
        console.log('点击了编辑', record.boardId);
        let infoId = {
          id: record.id,
        };

        const { bushingSuddenWave } = await recordSuddenInfo(infoId);

        deviceNameData.value = record.boardId;

        frequencyListData.value = bushingSuddenWave.frequencyList;
        harmonicListData.value = bushingSuddenWave.harmonicList;
        monitorValueListData.value = bushingSuddenWave.monitorValueList;
        
         timestamp.value = Number(new Date());

        console.log(bushingSuddenWave, 'bushingSuddenWave.frequency__________');
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }
      async function getHomeListApi() {
        let pages = {
          page: 1,
          limit: 99999999,
        };
        const { page } = await recordSuddenGet(pages);
        waveListData.value = page.list;
        console.log(page.list, 'page.list___');
      }
      function onFetchSuccess(res) {
        console.log(res, 'list__________1');
        // 演示默认展开所有表项
      }
      // onMounted(async () => {
      //   getHomeListApi();
      // });

      return {
        onFetchSuccess,
        frequencyListData,
        harmonicListData,
        monitorValueListData,
        deviceNameData,
        timestamp,
        register2,
        openModal2,
        registerTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
