import { FormSchema } from '/@/components/Form';

// const isButton = (type: string) => type === '2';
const basicOptions: LabelValueOptions = [
  {
    label: '电流监测',
    value: 1,
  },
  {
    label: 'pt电压检测',
    value: 2,
  },
  {
    label: '分压盒检测',
    value: 3,
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
];

const CalculationTypeOptions: LabelValueOptions = [
  // {
  //   label: '绝对法',//国标法相对法
  //   value: 1,
  // },
  {
    label: '相对法(国标)',//自定义法相对法
    value: 2,
  },
  {
    label: '相对法(自定义)',//自定义法预制电容量
    value: 3,
  },
];

export const schemas: FormSchema[] = [
  // {
  //     field: 'fac',
  //     component: 'InputGroup',
  //     label: '收款账户',
  //     required: true,
  //     defaultValue: 'test@example.com',
  //     slot: 'fac',
  //   },
  {
    field: 'id',
    component: 'InputNumber',
    label: 'id',
    show: false,
  },
  {
    field: 'name',
    component: 'Input',
    label: '名称',
  },
  {
    field: 'boardId',
    component: 'Input',
    label: '板子编号',
    slot: 'boardId',
  },
  {
    field: 'threePhase',
    component: 'Select',
    label: '三相',
    componentProps: {
      options: storeTypeOptions,
    },
  },
  {
    field: 'bushingId',
    component: 'InputNumber',
    label: 'bushingId',
    defaultValue: null,
    slot: 'boardId',
  },
  {
    field: 'sortNum',
    component: 'InputNumber',
    label: '显示顺序',
    helpMessage: ['数字越大排序越后！'],
    defaultValue: 0,
  },
  {
    field: 'monitorRatioK',
    component: 'InputNumber',
    label: '监测数据变比系数k:',
    // label: '监测数据变比系数k:',
    defaultValue: null,
  },
  {
    field: 'monitorFilterA',
    component: 'InputNumber',
    label: '监测数据滤波系数a',
    defaultValue: null,
  },
  {
    field: 'phaseCom',
    component: 'InputNumber',
    label: '相位补偿值',
    defaultValue: null,
  },
  {
    field: 'isSelect',
    label: '是否启用',
    component: 'Switch',
    defaultValue: false,
  },
  {
    field: 'isPtVolt',
    label: 'pt电压监测',
    component: 'Switch',
    defaultValue: false,
    show: false,
  },
  {
    field: 'isBoxVolt',
    label: '分压盒监测',
    component: 'Switch',
    defaultValue: false,
    show: false,
  },
  {
    field: 'isCurrent',
    label: '电流监测',
    component: 'Switch',
    defaultValue: false,
    show: false,
  },

  {
    field: 'MontiType',
    label: '检测类型',
    component: 'Select',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: 1,
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '额外参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
  },
  {
    field: 'voltGroup',
    component: 'InputNumber',
    label: '电压分组',
    ifShow: ({ values }) => {
      return values.MontiType;
    },
    defaultValue: null,
  },

  {
    field: 'alarmDuration',
    component: 'InputNumber',
    label: '触发门限报警',
    helpMessage: ['持续触发门限多长时间报警!'],
    componentProps: {
      addonBefore: '持续',
      addonAfter: '秒',
    },
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss1',
    component: 'InputNumber',
    label: '介损超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 3;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss2',
    component: 'InputNumber',
    label: '介损超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 3;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss3',
    component: 'InputNumber',
    label: '介损超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 3;
    },
    defaultValue: null,
  },
  {
    field: 'isPercentageAlarmCap',
    component: 'Switch',
    label: '电容量报警门限百分数',

    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: false,
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '启用电容量报警门限百分数表示-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isPercentageAlarmCap;
    },
  },

  {
    field: 'capInitial',
    component: 'InputNumber',
    label: '电容量基准值',
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isPercentageAlarmCap;
    },
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    defaultValue: null,
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isPercentageAlarmCap;
    },
  },

  {
    field: 'alarmCap1',
    component: 'InputNumber',
    label: '电容量超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },

    defaultValue: null,
  },
  {
    field: 'alarmCap2',
    component: 'InputNumber',
    label: '电容量超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: null,
  },
  {
    field: 'alarmCap3',
    component: 'InputNumber',
    label: '电容量超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: null,
  },
  {
    field: 'isSegmentCalibrationLoss',
    component: 'Switch',
    label: '启用介损分段校准',
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: false,
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '启用介损分段校准-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isSegmentCalibrationLoss;
    },
  },

  {
    field: 'segmentCalibrationLossMinRms',
    component: 'InputNumber',
    label: '电流小于此值进行介损分段补偿',
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isSegmentCalibrationLoss;
    },
    componentProps: {
      addonBefore: '小于',
      addonAfter: 'mA',
    },
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    defaultValue: null,
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType !== 2 && values.isSegmentCalibrationLoss;
    },
  },

  {
    field: 'companyId',
    component: 'InputNumber',
    label: '公司ID',
    show: false,
    defaultValue: 1,
  },

  {
    field: 'calculationMethod',
    component: 'Select',
    label: '计算方法',
    labelWidth: 80,
    componentProps: {
      options: CalculationTypeOptions,
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '计算方法-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.calculationMethod;
    },
  },

  {
    field: 'relativelyGbOrder',
    component: 'InputNumber',
    label: '国标法相对计算参考顺序',

    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.calculationMethod == 2;
    },
    defaultValue: null,
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
  },
  {
    field: 'rmsGroup',
    component: 'InputNumber',
    label: '自定义法相对计算分组',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.calculationMethod == 3;
    },
    defaultValue: null,
    colProps: {
      xl: {
        span: 8,
        offset: 0,
      },
      xxl: {
        span: 6,
        offset: 0,
      },
    },
  },
  {
    field: 'isUseCapInitial',
    component: 'Switch',
    label: '自定义法使用预制电容量',
    // componentProps: {
    //   options: basicOptions,
    // },
    defaultValue: false,
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.calculationMethod == 3;
    },
    colProps: {
      xl: {
        span: 8,
        offset: 0,
      },
      xxl: {
        span: 6,
        offset: 0,
      },
    },
  },

  {
    field: 'capInitial',
    component: 'Input',
    label: '电容量基准值',
    ifShow: ({ values }) => {
      return (
        values.MontiType !== 2 &&
        !values.isBoxVolt &&
        values.calculationMethod == 3 &&
        values.isUseCapInitial
      );
    },
    colProps: {
      xl: {
        span: 8,
        offset: 0,
      },
      xxl: {
        span: 6,
        offset: 0,
      },
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.calculationMethod;
    },
  },

  {
    field: 'isProtectionMonitor',
    component: 'Switch',
    label: '启用监测数据保护',
    // componentProps: {
    //   options: basicOptions,
    // },
    defaultValue: false,
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '启用监测数据保护-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isProtectionMonitor;
    },
  },

  {
    field: 'monitorReferenceValue',
    component: 'InputNumber',
    label: '监测数据标准值',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isProtectionMonitor;
    },
    defaultValue: null,
  },
  {
    field: 'monitorProtectionMin',
    component: 'InputNumber',
    label: '触发保护的最小监测值',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isProtectionMonitor;
    },
    defaultValue: null,
  },
  {
    field: 'monitorProtectionRange',
    component: 'InputNumber',
    label: '监测数据的保护百分比范围',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isProtectionMonitor;
    },
    defaultValue: null,
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isProtectionMonitor;
    },
  },

  // {
  //   field: 'alarmDuration',
  //   component: 'Input',
  //   label: '持续触发门限多长时间报警',
  //   ifShow: ({ values }) => {
  //     return values.MontiType === 1;
  //   },
  // },

  {
    field: 'isPercentageAlarmMonitor',
    component: 'Switch',
    label: '监测数据报警上下限显示百分数',
    defaultValue: false,
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },

  {
    field: 'divider-linked',
    component: 'Divider',
    label: '启用监测数据报警上下限显示百分数-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isPercentageAlarmMonitor;
    },
  },

  {
    field: 'monitorReferenceValue',
    component: 'InputNumber',
    label: '监测数据标准值',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isPercentageAlarmMonitor;
    },
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isPercentageAlarmMonitor;
    },
  },
  {
    field: 'alarmUpperMonitor1',
    component: 'InputNumber',
    label: '监测数据报警上限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperMonitor2',
    component: 'InputNumber',
    label: '监测数据报警上限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperMonitor3',
    component: 'InputNumber',
    label: '监测数据报警上限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },

  {
    field: 'alarmDownMonitor1',
    component: 'InputNumber',
    label: '监测数据报警下限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmDownMonitor2',
    component: 'InputNumber',
    label: '监测数据报警下限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmDownMonitor3',
    component: 'InputNumber',
    label: '监测数据报警下限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },

  {
    field: 'alarmRelativelyLoss1',
    component: 'InputNumber',
    label: '相对介损超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyLoss2',
    component: 'InputNumber',
    label: '相对介损超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyLoss3',
    component: 'InputNumber',
    label: '相对介损超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },

  {
    field: 'alarmRelativelyCap1',
    component: 'InputNumber',
    label: '相对电容量超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyCap2',
    component: 'InputNumber',
    label: '相对电容量超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyCap3',
    component: 'InputNumber',
    label: '相对电容量超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
    defaultValue: null,
  },

  {
    field: 'alarmLoss1',
    component: 'Input',
    label: '介损超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },
  {
    field: 'alarmLoss2',
    component: 'Input',
    label: '介损超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },
  {
    field: 'alarmLoss3',
    component: 'Input',
    label: '介损超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },

  {
    field: 'isZeroCal',
    component: 'Switch',
    label: '是否零序计算',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '开启零序计算-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
  },
  {
    field: 'zeroGroup',
    component: 'InputNumber',
    label: '零序计算分组',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
    defaultValue: null,
  },

  {
    field: 'alarmUpperZeroCurrent1',
    component: 'InputNumber',
    label: '零序电流超限等级1',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperZeroCurrent2',
    component: 'InputNumber',
    label: '零序电流超限等级2',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperZeroCurrent3',
    component: 'InputNumber',
    label: '零序电流超限等级3',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
    defaultValue: null,
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isZeroCal;
    },
  },

  {
    field: 'isHarmonic',
    component: 'Switch',
    label: '是否统计谐波',
    ifShow: ({ values }) => {
      return values.MontiType === 1;
    },
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '开启统计谐波-参数',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isHarmonic;
    },
  },

  {
    field: 'resistanceEvalK',
    component: 'InputNumber',
    label: '阻性电流等效系数k',
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isHarmonic;
    },
    defaultValue: null,
  },
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '',
    colProps: {
      xl: {
        span: 24,
        offset: 0,
      },
      xxl: {
        span: 24,
        offset: 0,
      },
    },
    ifShow: ({ values }) => {
      return values.MontiType === 1 && values.isHarmonic;
    },
  },
  {
    field: 'isSegmentCalibrationMonitor',
    component: 'Switch',
    label: '启用监测数据分段校准',
    ifShow: ({ values }) => {
      return values.MontiType !== 2;
    },
    defaultValue: false,
  },
];

export const taskSchemas: FormSchema[] = [
  // {
  //   field: 'fac',
  //   component: 'InputGroup',
  //   label: '收款账户',
  //   required: true,
  //   defaultValue: 'test@example.com',
  //   slot: 'fac',
  // },
  // {
  //   field: 'pay',
  //   component: 'Input',
  //   label: '',
  //   defaultValue: 'relativelyGbOrder',
  //   show: false,
  // },
  // {
  //   field: 't2',
  //   component: 'Input',
  //   label: '任务描述',
  // },
  // {
  //   field: 't3',
  //   component: 'Select',
  //   label: '执行人',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 't4',
  //   component: 'Select',
  //   label: '责任人',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 't5',
  //   component: 'TimePicker',
  //   label: '生效日期',
  //   required: true,
  //   componentProps: {
  //     style: { width: '100%' },
  //   },
  // },
  // {
  //   field: 't6',
  //   component: 'Select',
  //   label: '任务类型',
  //   componentProps: {
  //     options: storeTypeOptions,
  //   },
  //   required: true,
  // },
];
