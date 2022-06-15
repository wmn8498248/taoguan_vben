<template>
  <div class="p-4">
    <BasicTable
      ref="tableRef"
      @register="registerTable"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
    >
      <template #toolbar>
        <PopConfirmButton
          title="是否更新所选为已读？"
          placement="bottom"
          ok-text="是"
          cancel-text="否"
          type="dashed"
          @confirm="getSelectRead"
        >
          更新所选为已读
        </PopConfirmButton>
        <PopConfirmButton
          title="是否更新全部为已读？"
          placement="bottom"
          ok-text="是"
          cancel-text="否"
          type="primary"
          @confirm="getSelectReadAll"
        >
          更新全部为已读
        </PopConfirmButton>
        <PopConfirmButton
          title="是否删除所选？"
          placement="bottom"
          ok-text="是"
          cancel-text="否"
          type="dashed"
          danger
          @confirm="delSelect"
        >
          删除所选
        </PopConfirmButton>
        <PopConfirmButton
          title="是否删除全部报警？"
          placement="bottom"
          ok-text="是"
          cancel-text="否"
          type="primary"
          danger
          @confirm="delSelectAll"
        >
          删除全部报警
        </PopConfirmButton>
        <!-- <a-button type="dashed" @click="getSelectRead">更新所选为已读 </a-button>
        <a-button type="primary" @click="getSelectReadAll">更新全部为已读 </a-button>
        <a-button type="dashed" danger @click="delSelect">删除所选 </a-button>
        <a-button type=" danger @click="delSelectAll">删除全部报警 </a-button> -->
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, unref } from 'vue';

  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import {
    msgAlarmList,
    msgAlarmUpdate,
    msgAlarmUpdateAll,
    msgAlarmDelete,
    msgAlarmDeleteAll,
  } from '/@/api/device/alarm';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PopConfirmButton } from '/@/components/Button';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction, PopConfirmButton },
    setup() {
      let waveListData = ref([]);

      const tableRef = ref<Nullable<TableActionType>>(null);
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();

      const [registerTable, { reload }] = useTable({
        title: '报警列表',
        // api: msgAlarmList,
        dataSource: waveListData,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        // actionColumn: {
        //   width: 80,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        //   fixed: undefined,
        // },
      });

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }
      async function getSelectRead() {
        // createMessage.info('请在控制台查看！');
        // console.log();
        let getId = getTableAction().getSelectRowKeys();
        if (getId.length == 0) {
          createMessage.warning('你没有选择列表');
          return;
        }

        const { code } = await msgAlarmUpdate(getId);
        if (code == 0) {
          getHomeListApi();
          createMessage.success('操作成功');
        }
      }
      async function getSelectReadAll() {
        const { code } = await msgAlarmUpdateAll();
        if (code == 0) {
          getHomeListApi();
          createMessage.success('操作成功');
        }
      }
      async function delSelect() {
        let getId = getTableAction().getSelectRowKeys();

        if (getId.length == 0) {
          createMessage.warning('你没有选择列表');
          return;
        }

        const { code } = await msgAlarmDelete(getId);
        if (code == 0) {
          getHomeListApi();
          createMessage.success('删除成功');
        }

        // const { page } = await msgAlarmList(pages);
      }
      async function delSelectAll() {
        const { code } = await msgAlarmDeleteAll();
        if (code == 0) {
          getHomeListApi();
          createMessage.success('删除成功');
        }
      }
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }
      async function getHomeListApi() {
        let pages = {
          page: 1,
          limit: 99999999,
        };
        const { page } = await msgAlarmList(pages);
        waveListData.value = page.list;
        console.log(page.list, 'page.list___');
      }
      onMounted(async () => {
        getHomeListApi();
      });
      return {
        tableRef,
        getSelectRead,
        getSelectReadAll,
        delSelect,
        delSelectAll,
        registerTable,
        registerDrawer,
        handleCreate,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
