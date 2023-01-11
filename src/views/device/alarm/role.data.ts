import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '报警等级',
    dataIndex: 'alarmLevel',
    customRender: ({ record }) => {
      const alarmListData = ['无', '提示', '次要', '重要'];

      return alarmListData[record.alarmLevel];
    },
  },
  {
    title: '报警类型',
    dataIndex: 'alarmType',
    customRender: ({ record }) => {
      const dataList = [
        '无',
        '电流过高',
        '电流过低',
        '相对介损过高',
        '相对电容量过高',
        '零序电流过高1',
        '零序电流过高2',
        '电容量超限',
        '介损超限',
        '通讯中断',
      ];
      return dataList[record.alarmType];
    },
  },
  {
    title: '是否处理',
    dataIndex: 'isRead',
    customRender: ({ record }) => {
      let isRead = record.isRead == 1 ? '已读' : '未读';
      return isRead;
    },
  },
  // {
  //   title: '是否处理',
  //   dataIndex: 'isRead',
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.isRead === '1',
  //       checkedChildren: '已处理',
  //       unCheckedChildren: '未处理',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '1' : '0';
  //         const { createMessage } = useMessage();
  //         setRoleStatus(record.id, newStatus)
  //           .then(() => {
  //             record.isRead = newStatus;
  //             createMessage.success(`已成功修改角色状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
  {
    title: '时间',
    dataIndex: 'fftId',
  },
  {
    title: '电容量',
    dataIndex: 'cap',
  },
  {
    title: '设备唯一编号',
    dataIndex: 'deviceUniqueId',
    defaultHidden: true,
  },
  {
    title: '介损',
    dataIndex: 'loss',
  },
  {
    title: '电流值',
    dataIndex: 'monitorValue',
  },
  {
    title: '相对电容量',
    dataIndex: 'relativelyCap',
  },
  {
    title: '相对介损',
    dataIndex: 'relativelyLoss',
  },
  {
    title: '相电压',
    dataIndex: 'volt',
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === '1',
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已禁用',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '1' : '0';
  //         const { createMessage } = useMessage();
  //         setRoleStatus(record.id, newStatus)
  //           .then(() => {
  //             record.status = newStatus;
  //             createMessage.success(`已成功修改角色状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   width: 180,
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
