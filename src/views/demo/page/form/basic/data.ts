import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'alarmCap1',
    component: 'InputNumber',
    label: '电容量报警等级1',
    componentProps: {
      placeholder: '请输入电容量报警等级1',
    },
    required: true,
  },

  {
    field: 'alarmCap2',
    component: 'InputNumber',
    label: '电容量报警等级2',
    componentProps: {
      placeholder: '请输入电容量报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmCap3',
    component: 'InputNumber',
    label: '电容量报警等级2',
    componentProps: {
      placeholder: '请输入电容量报警等级2',
    },
    required: true,
  },

  {
    field: 'alarmDownMonitor1',
    component: 'InputNumber',
    label: '电流下限报警等级1',
    componentProps: {
      placeholder: '请输入电流下限报警等级1',
    },
    required: true,
  },
  {
    field: 'alarmDownMonitor2',
    component: 'InputNumber',
    label: '电流下限报警等级2',
    componentProps: {
      placeholder: '请输入电流下限报警等级12',
    },
    required: true,
  },
  {
    field: 'alarmDownMonitor3',
    component: 'InputNumber',
    label: '电流下限报警等级2',
    componentProps: {
      placeholder: '请输入电流下限报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmDuration',
    component: 'InputNumber',
    label: '持续多久触发报警',
    componentProps: {
      placeholder: '请输入持续多久触发报警',
    },
    required: true,
  },
  {
    field: 'alarmLoss1',
    component: 'InputNumber',
    label: '介损报警等级1',
    componentProps: {
      placeholder: '请输入介损报警等级1',
    },
    required: true,
  },
  {
    field: 'alarmLoss2',
    component: 'InputNumber',
    label: '介损报警等级2',
    componentProps: {
      placeholder: '请输入介损报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmLoss3',
    component: 'InputNumber',
    label: '介损报警等级3',
    componentProps: {
      placeholder: '请输入介损报警等级3',
    },
    required: true,
  },
  {
    field: 'alarmRelativelyCap1',
    component: 'InputNumber',
    label: '相对电容量报警等级1',
    componentProps: {
      placeholder: '请输入相对电容量报警等级1',
    },
    required: true,
  },
  {
    field: 'alarmRelativelyCap2',
    component: 'InputNumber',
    label: '相对电容量报警等级2',
    componentProps: {
      placeholder: '请输入相对电容量报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmRelativelyCap3',
    component: 'InputNumber',
    label: '相对电容量报警等级3',
    componentProps: {
      placeholder: '请输入相对电容量报警等级3',
    },
    required: true,
  },

  {
    field: 'alarmRelativelyLoss1',
    component: 'InputNumber',
    label: '相对介损报警等级1',
    componentProps: {
      placeholder: '请输入相对介损报警等级1',
    },
    required: true,
  },
  {
    field: 'alarmRelativelyLoss2',
    component: 'InputNumber',
    label: '相对介损报警等级2',
    componentProps: {
      placeholder: '请输入相对介损报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmRelativelyLoss3',
    component: 'InputNumber',
    label: '相对介损报警等级3',
    componentProps: {
      placeholder: '请输入相对介损报警等级3',
    },
    required: true,
  },

  {
    field: 'alarmUpperMonitor1',
    component: 'InputNumber',
    label: '电流上限报警等级1',
    componentProps: {
      placeholder: '请输入电流上限报警等级1',
    },
    required: true,
  },
  {
    field: 'alarmUpperMonitor2',
    component: 'InputNumber',
    label: '电流上限报警等级2',
    componentProps: {
      placeholder: '请输入电流上限报警等级2',
    },
    required: true,
  },
  {
    field: 'alarmUpperMonitor3',
    component: 'InputNumber',
    label: '电流上限报警等级3',
    componentProps: {
      placeholder: '请输入电流上限报警等级3',
    },
    required: true,
  },

  {
    field: 'alarmUpperZeroCurrent1',
    component: 'InputNumber',
    label: '零序电流报警上限等级1',
    componentProps: {
      placeholder: '请输入零序电流报警上限等级1',
    },
    required: true,
  },
  {
    field: 'alarmUpperZeroCurrent2',
    component: 'InputNumber',
    label: '零序电流报警上限等级2',
    componentProps: {
      placeholder: '请输入零序电流报警上限等级2',
    },
    required: true,
  },
  {
    field: 'alarmUpperZeroCurrent3',
    component: 'InputNumber',
    label: '零序电流报警上限等级3',
    componentProps: {
      placeholder: '请输入零序电流报警上限等级3',
    },
    required: true,
  },

  {
    field: 'boardId',
    component: 'Input',
    label: '电路板Id',
    componentProps: {
      placeholder: '请输入电路板Id',
    },
    required: true,
  },
  {
    field: 'bushingId',
    component: 'InputNumber',
    label: '通路序号',
    componentProps: {
      placeholder: '请输入通路序号',
    },
    required: true,
  },
  {
    field: 'calculationMethod',
    component: 'InputNumber',
    label: '计算方式',
    componentProps: {
      placeholder: '请输入计算方式',
    },
    required: true,
  },
  {
    field: 'capInitial',
    component: 'InputNumber',
    label: '电容量初始值',
    componentProps: {
      placeholder: '请输入电容量初始值',
    },
    required: true,
  },
  {
    field: 'companyId',
    component: 'InputNumber',
    label: '公司id',
    componentProps: {
      placeholder: '请输入公司id',
    },
    required: true,
  },
  {
    field: 'deviceUniqueId',
    component: 'Input',
    label: '设备唯一编号',
    componentProps: {
      placeholder: '请输入设备唯一编号',
    },
    required: true,
  },
  {
    field: 'rmsGroup',
    component: 'InputNumber',
    label: '相对计算(自定义)分组',
    componentProps: {
      placeholder: '请输入相对计算(自定义)分组',
    },
    required: true,
  },
  {
    field: 'isBoxVolt',
    component: 'RadioGroup',
    label: '是否是分压盒',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isHarmonic',
    component: 'RadioGroup',
    label: '是否统计谐波',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isPercentageAlarmCap',
    component: 'RadioGroup',
    label: '电容量报警门限是否是百分比表示',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },

  {
    field: 'isProtectionMonitor',
    component: 'RadioGroup',
    label: '是否启用电流保护',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isSegmentCalibrationLoss',
    component: 'RadioGroup',
    label: '是否启用介损分段校准',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isSegmentCalibrationMonitor',
    component: 'RadioGroup',
    label: '是否启用电流分段校准',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isSelect',
    component: 'RadioGroup',
    label: '是否启用',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isUseCapInitial',
    component: 'RadioGroup',
    label: '相对计算(自定义)是否使用预制电容量',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'isPtVolt',
    component: 'RadioGroup',
    label: '是否是pt电压',
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    required: true,
  },
  {
    field: 'monitorFilterA',
    component: 'InputNumber',
    label: '滤波系数',
    componentProps: {
      placeholder: '请输入滤波系数',
    },
    required: true,
  },
  {
    field: 'monitorProtectionMin',
    component: 'InputNumber',
    label: '启用电流保护的最小电流触发值',
    componentProps: {
      placeholder: '请输入启用电流保护的最小电流触发值',
    },
    required: true,
  },
  {
    field: 'monitorProtectionRange',
    component: 'InputNumber',
    label: '启用电流保护的保护范围',
    componentProps: {
      placeholder: '请输入启用电流保护的保护范围',
    },
    required: true,
  },
  {
    field: 'monitorRatioK',
    component: 'InputNumber',
    label: '变比系数',
    componentProps: {
      placeholder: '请输入变比系数',
    },
    required: true,
  },
  {
    field: 'monitorReferenceValue',
    component: 'InputNumber',
    label: '电流的标准值',
    componentProps: {
      placeholder: '请输入电流的标准值',
    },
    required: true,
  },
  {
    field: 'name',
    component: 'Input',
    label: '套管名称',
    componentProps: {
      placeholder: '请输入套管名称',
    },
    required: true,
  },
  {
    field: 'phaseCom',
    component: 'InputNumber',
    label: '相位补偿',
    componentProps: {
      placeholder: '请输入相位补偿',
    },
    required: true,
  },
  {
    field: 'relativelyGbOrder',
    component: 'InputNumber',
    label: '相对计算(国标)基准顺序',
    componentProps: {
      placeholder: '请输入相对计算(国标)基准顺序',
    },
    required: true,
  },
  {
    field: 'resistanceEvalK',
    component: 'InputNumber',
    label: '阻性电流等效系数',
    componentProps: {
      placeholder: '请输入阻性电流等效系数',
    },
    required: true,
  },
  {
    field: 'segmentCalibrationLossMinRms',
    component: 'InputNumber',
    label: '分段校准介损的最小电流触发值',
    componentProps: {
      placeholder: '请输入分段校准介损的最小电流触发值',
    },
    required: true,
  },
  {
    field: 'sortNum',
    component: 'InputNumber',
    label: '设备显示顺序',
    componentProps: {
      placeholder: '请输入设备显示顺序',
    },
    required: true,
  },
  {
    field: 'threePhase',
    component: 'InputNumber',
    label: '三相',
    componentProps: {
      placeholder: '请输入三相',
    },
    required: true,
  },
  {
    field: 'voltGroup',
    component: 'InputNumber',
    label: 'pt相电压分组',
    componentProps: {
      placeholder: '请输入pt相电压分组',
    },
    required: true,
  },

  // {
  //   field: 'time',
  //   component: 'RangePicker',
  //   label: '起止日期',
  //   required: true,
  // },
  // {
  //   field: 'target',
  //   component: 'InputTextArea',
  //   label: '目标描述',
  //   componentProps: {
  //     placeholder: '请输入你的阶段性工作目标',
  //     rows: 4,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'metrics',
  //   component: 'InputTextArea',
  //   label: '衡量标准',
  //   componentProps: {
  //     placeholder: '请输入衡量标准',
  //     rows: 4,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'client',
  //   component: 'Input',
  //   label: '客户',
  //   helpMessage: '目标的服务对象',
  //   subLabel: '( 选填 )',
  //   componentProps: {
  //     placeholder: '请描述你服务的客户，内部客户直接 @姓名／工号',
  //   },
  // },
  // {
  //   field: 'inviteer',
  //   component: 'Input',
  //   label: '邀评人',
  //   subLabel: '( 选填 )',
  //   componentProps: {
  //     placeholder: '请直接 @姓名／工号，最多可邀请 5 人',
  //   },
  // },
  // {
  //   field: 'weights',
  //   component: 'InputNumber',
  //   label: '权重',
  //   subLabel: '( 选填 )',
  //   componentProps: {
  //     formatter: (value: string) => (value ? `${value}%` : ''),
  //     parser: (value: string) => value.replace('%', ''),
  //     placeholder: '请输入',
  //   },
  // },
  // {
  //   field: 'disclosure',
  //   component: 'RadioGroup',
  //   label: '目标公开',
  //   itemProps: {
  //     extra: '客户、邀评人默认被分享',
  //   },
  //   componentProps: {
  //     options: [
  //       {
  //         label: '公开',
  //         value: '1',
  //       },
  //       {
  //         label: '部分公开',
  //         value: '2',
  //       },
  //       {
  //         label: '不公开',
  //         value: '3',
  //       },
  //     ],
  //   },
  // },
  // {
  //   field: 'disclosurer',
  //   component: 'Select',
  //   label: ' ',
  //   show: ({ model }) => {
  //     return model.disclosure === '2';
  //   },
  //   componentProps: {
  //     placeholder: '公开给',
  //     mode: 'multiple',
  //     options: [
  //       {
  //         label: '同事1',
  //         value: '1',
  //       },
  //       {
  //         label: '同事2',
  //         value: '2',
  //       },
  //       {
  //         label: '同事3',
  //         value: '3',
  //       },
  //     ],
  //   },
  // },
];
