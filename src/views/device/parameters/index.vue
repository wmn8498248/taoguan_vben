<template>
  <div class="p-4">
    <BasicTable ref="tableRef" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="newList">新建设备 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            // {
            //   icon: 'clarity:info-standard-line',
            //   tooltip: '查看用户详情',
            //   onClick: handleView.bind(null, record),
            // },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { BasicTable, TableActionType, TableAction, useTable } from '/@/components/Table';
  import { getBasicColumns, getBasicShortColumns } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  import { deviceBusinessList, deviceBusinessDelete } from '/@/api/device/manage';
  import { Button } from 'ant-design-vue';

  export default defineComponent({
    components: { BasicTable, TableAction, AButton: Button },
    setup() {
      const go = useGo();
      let waveListData = ref([]);

      const tableRef = ref<Nullable<TableActionType>>(null);
      const { createMessage } = useMessage();

      const [registerTable] = useTable({
        canResize: false,
        title: '设备列表',
        dataSource: waveListData,
        showTableSetting: true,
        tableSetting: { redo: false },
        columns: getBasicColumns(),
        // rowKey: 'id',
        // rowSelection: { type: 'checkbox' },
      });

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      function changeLoading() {
        getTableAction().setLoading(true);
        setTimeout(() => {
          getTableAction().setLoading(false);
        }, 1000);
      }
      function changeColumns() {
        getTableAction().setColumns(getBasicShortColumns());
      }
      function reloadTable() {
        getTableAction().setColumns(getBasicColumns());

        getTableAction().reload({
          page: 1,
        });
      }
      function getColumn() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getColumns());
      }

      function getTableData() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getDataSource());
      }
      function getTableRawData() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getRawDataSource());
      }

      function getPagination() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getPaginationRef());
      }

      function setPaginationInfo() {
        getTableAction().setPagination({
          current: 2,
        });
        getTableAction().reload();
      }
      function getSelectRowList() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getSelectRows());
      }
      function getSelectRowKeyList() {
        createMessage.info('请在控制台查看！');
        console.log(getTableAction().getSelectRowKeys());
      }
      function setSelectedRowKeyList() {
        getTableAction().setSelectedRowKeys(['0', '1', '2']);
      }
      function clearSelect() {
        getTableAction().clearSelectedRowKeys();
      }
      async function delSelect() {
        let getId = getTableAction().getSelectRowKeys();
        if (getId.length == 0) {
          createMessage.warning('你没有选择列表');
          return;
        }

        const { code } = await deviceBusinessDelete(getId);
        if (code == 0) {
          getHomeListApi();
          createMessage.success('删除成功');
        }

        // const { page } = await msgAlarmList(pages);
      }
      async function getHomeListApi() {
        let pages = {
          page: 1,
          limit: 99999999,
        };
        const { page } = await deviceBusinessList(pages);
        waveListData.value = page.list;
        console.log(page.list, 'page.list___');
      }
      function newList() {
        console.log('跳转');
        go('/device/parameter_detail/new');
      }
      function handleEdit(record: Recordable) {
        go('/device/parameter_detail/' + record.id);
        console.log(record.id, 'record.id');
      }

      async function handleDelete(record: Recordable) {
        const { code } = await deviceBusinessDelete([record.id]);
        if (code == 0) {
          getHomeListApi();
          createMessage.success('删除成功');
        }
      }
      function handleView(record: Recordable) {
        console.log(record.id, 'record.id');

        // go('/system/account_detail/' + record.id);
      }

      onMounted(async () => {
        getHomeListApi();
      });

      return {
        registerTable,
        handleView,
        handleEdit,
        handleDelete,
        newList,
        delSelect,
        tableRef,
        waveListData,
        changeLoading,
        changeColumns,
        reloadTable,
        getColumn,
        getTableData,
        getTableRawData,
        getPagination,
        setPaginationInfo,
        getSelectRowList,
        getSelectRowKeyList,
        setSelectedRowKeyList,
        clearSelect,
      };
    },
  });
</script>
