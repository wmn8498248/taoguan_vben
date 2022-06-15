<template>
  <div class="p-4">
    <BasicTable @register="registerTable"> 
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
    <Modal3
      :deviceName="deviceNameData"
      :timestamp="timestamp"
      :historyList="historyListData"
      @register="register3"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
  import Modal3 from './Modal3.vue';
  import { useModal } from '/@/components/Modal';

  import { recordWaveList, recordWaveInfo } from '/@/api/device/manage';

  const columns: BasicColumn[] = [
    {
      title: '板子id',
      dataIndex: 'boardId',
    },
    {
      title: '录波保存时间',
      dataIndex: 'createTime',
    },
    {
      title: '故障类型判断',
      dataIndex: 'faultType',
    },
    {
      title: 'timeLabelWeek',
      dataIndex: 'timeLabelWeek',
    },
    {
      title: '录波接收second',
      dataIndex: 'timeLabelSecond',
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction, Modal3 },
    setup() {
      let timestamp = ref(0);
      let deviceNameData = ref('');
      let historyListData = ref([]);

      const [register3, { openModal: openModal3 }] = useModal();
      const [registerTable] = useTable({
        title: '本地已保存的录波列表',
        api: recordWaveList,
        columns: columns,
        // dataSource: waveListData,
        bordered: true,
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      async function handleEdit(record: Recordable) {
        openModal3();
        console.log('点击了编辑', record.boardId);
        let infoId = {
          id: record.id,
        };

        const { bushingRecordWave } = await recordWaveInfo(infoId);

        deviceNameData.value = record.boardId;
        historyListData.value = bushingRecordWave.frequency;
        timestamp.value = Number(new Date());
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }

      return {
        historyListData,
        deviceNameData,
        timestamp,
        register3,
        openModal3,
        registerTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
