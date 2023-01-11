import { FormSchema } from '/@/components/Form';

// const isButton = (type: string) => type === '2';
const basicOptions: LabelValueOptions = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

const CalculationTypeOptions: LabelValueOptions = [
  {
    label: '国标法相对法',
    value: 1,
  },
  {
    label: '自定义法相对法',
    value: 2,
  },
  {
    label: '自定义法预制电容量',
    value: 3,
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'id',
    component: 'InputNumber',
    label: 'id',
    show: false
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
  },
  {
    field: 'bushingId',
    component: 'InputNumber',
    label: 'bushingId',
    defaultValue: null,
  },
  {
    field: 'threePhase',
    component: 'Input',
    label: '三相',
  },

  // {
  //   field: 'sortNum',
  //   component: 'Select',
  //   label: '显示顺序',
  //   defaultValue: [],
  //   componentProps: {
  //     mode: 'multiple',
  //     options: storeTypeOptions,
  //   },
  // },
  {
    field: 'sortNum',
    component: 'InputNumber',
    label: '显示顺序',
    defaultValue: 0,
  },
  {
    field: 'monitorRatioK',
    component: 'InputNumber',
    label: '监测数据变比系数k:',
    defaultValue: null
  },
  {
    field: 'monitorFilterA',
    component: 'InputNumber',
    label: '监测数据滤波系数a',
    defaultValue: null
  },
  {
    field: 'phaseCom',
    component: 'InputNumber',
    label: '相位补偿值',
    defaultValue: null
  },
  {
    field: 'isSelect',
    component: 'RadioGroup',
    label: '是否启用',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
  },

  // {
  //   field: 'bushingId',
  //   component: 'Select',
  //   label: '仓库管理员',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'f4',
  //   component: 'Select',
  //   label: '审批人',
  //   componentProps: {
  //     options: basicOptions,
  //   },
  //   required: true,
  // },
  // {
  //   field: 'f5',
  //   component: 'RangePicker',
  //   label: '生效日期',
  //   required: true,
  // },
  // {
  //   field: 'f6',
  //   component: 'Select',
  //   label: '仓库类型',
  //   componentProps: {
  //     options: storeTypeOptions,
  //   },
  //   required: true,
  // },
];
export const taskSchemas: FormSchema[] = [
  {
    field: 'isPtVolt',
    component: 'RadioGroup',
    label: 'pt电压监测',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'isBoxVolt',
    component: 'RadioGroup',
    label: '分压盒监测',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'voltGroup',
    component: 'InputNumber',
    label: '电压分组',
    ifShow: ({ values }) => {
      return !values.isPtVolt || !values.isBoxVolt;
    },
    defaultValue: null
  },
  {
    field: 'alarmDuration',
    component: 'InputNumber',
    label: '持续触发门限多长时间报警',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss1',
    component: 'InputNumber',
    label: '介损超限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss2',
    component: 'InputNumber',
    label: '介损超限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmLoss3',
    component: 'InputNumber',
    label: '介损超限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isBoxVolt;
    },
    defaultValue: null,
  },

  {
    field: 'isPercentageAlarmCap',
    component: 'RadioGroup',
    label: '电容量报警门限百分数表示',
    componentProps: {
      options: basicOptions,
    },
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: false,
  },
  {
    field: 'capInitial',
    component: 'InputNumber',
    subLabel: '【电容量基准值】',
    label: '',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isPercentageAlarmCap;
    },
    defaultValue: null,
  },
  {
    field: 'alarmCap1',
    component: 'InputNumber',
    label: '电容量超限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmCap2',
    component: 'InputNumber',
    label: '电容量超限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmCap3',
    component: 'InputNumber',
    label: '电容量超限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: null,
  },
  {
    field: 'isSegmentCalibrationLoss',
    component: 'RadioGroup',
    label: '启用介损分段校准',
    componentProps: {
      options: basicOptions,
    },
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: false,
  },
  {
    field: 'segmentCalibrationLossMinRms',
    component: 'InputNumber',
    label: '',
    subLabel: '【电流小于此值进行介损分段补偿】',
    ifShow: ({ values }) => {
      return !values.isPtVolt && values.isSegmentCalibrationLoss;
    },
    defaultValue: null
  },
 
  {
    field: 'isSegmentCalibrationMonitor',
    component: 'RadioGroup',
    label: '启用监测数据分段校准',
    componentProps: {
      options: basicOptions,
    },
    ifShow: ({ values }) => {
      return !values.isPtVolt;
    },
    defaultValue: false,
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
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },

  {
    field: 'relativelyGbOrder',
    component: 'InputNumber',
    label: '',
    subLabel: '【国标法相对计算参考顺序】',
    
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.calculationMethod == 1;
    },
    defaultValue: null
  },
  {
    field: 'rmsGroup',
    component: 'InputNumber',
    label: '',
    subLabel: '【自定义法相对计算分组】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.calculationMethod == 2;
    },
    defaultValue: null,
  },
  {
    field: 'isUseCapInitial',
    component: 'RadioGroup',
    label: '',
    subLabel: '【自定义法使用预制电容量】',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.calculationMethod == 3;
    },
  },

  {
    field: 'capInitial',
    component: 'Input',
    label: '',
    subLabel: '【电容量基准值】',
    ifShow: ({ values }) => {
      return (
        !values.isPtVolt &&
        !values.isBoxVolt &&
        values.calculationMethod == '3' &&
        values.isUseCapInitial
      );
    },
  },

  {
    field: 'isProtectionMonitor',
    component: 'RadioGroup',
    label: '启用监测数据保护',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },

  {
    field: 'monitorReferenceValue',
    component: 'InputNumber',
    label: '',
    subLabel: '【监测数据标准值】',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isProtectionMonitor;
    },
    defaultValue:null
  },
  {
    field: 'monitorProtectionMin',
    component: 'InputNumber',
    label: '',
    subLabel: '【触发保护的最小监测值】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isProtectionMonitor;
    },
    defaultValue: null
  },
  {
    field: 'monitorProtectionRange',
    component: 'InputNumber',
    label: '',
    subLabel: '【监测数据的保护百分比范围】',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isProtectionMonitor;
    },
    defaultValue: null
  },

  {
    field: 'alarmDuration',
    component: 'Input',
    label: '持续触发门限多长时间报警',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },

  {
    field: 'isPercentageAlarmMonitor',
    component: 'RadioGroup',
    label: '监测数据报警上下限显示百分数',
    componentProps: {
      options: basicOptions,
    },
    defaultValue: false,
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },
  {
    field: 'monitorReferenceValue',
    component: 'Input',
    label: '',
    subLabel: '【监测数据标准值】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isPercentageAlarmMonitor;
    },
  },

  {
    field: 'alarmUpperMonitor1',
    component: 'InputNumber',
    label: '监测数据报警上限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperMonitor2',
    component: 'InputNumber',
    label: '监测数据报警上限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperMonitor3',
    component: 'InputNumber',
    label: '监测数据报警上限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },

  {
    field: 'alarmDownMonitor1',
    component: 'InputNumber',
    label: '监测数据报警下限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmDownMonitor2',
    component: 'InputNumber',
    label: '监测数据报警下限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmDownMonitor3',
    component: 'InputNumber',
    label: '监测数据报警下限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },

  {
    field: 'alarmRelativelyLoss1',
    component: 'InputNumber',
    label: '相对介损超限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyLoss2',
    component: 'InputNumber',
    label: '相对介损超限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyLoss3',
    component: 'InputNumber',
    label: '相对介损超限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },

  {
    field: 'alarmRelativelyCap1',
    component: 'InputNumber',
    label: '相对电容量超限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyCap2',
    component: 'InputNumber',
    label: '相对电容量超限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },
  {
    field: 'alarmRelativelyCap3',
    component: 'InputNumber',
    label: '相对电容量超限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
    defaultValue: null,
  },

  {
    field: 'alarmLoss1',
    component: 'Input',
    label: '介损超限等级1',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },
  {
    field: 'alarmLoss2',
    component: 'Input',
    label: '介损超限等级2',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },
  {
    field: 'alarmLoss3',
    component: 'Input',
    label: '介损超限等级3',
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },

  {
    field: 'isHarmonic',
    component: 'RadioGroup',
    label: '是否统计谐波',
    componentProps: {
      options: basicOptions,
    },
    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt;
    },
  },

  {
    field: 'resistanceEvalK',
    component: 'InputNumber',
    label: '',
    subLabel: '【阻性电流等效系数k】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isHarmonic;
    },
    defaultValue: null
  },
  {
    field: 'alarmUpperZeroCurrent1',
    component: 'InputNumber',
    label: '',
    subLabel: '【零序电流超限等级1】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isHarmonic;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperZeroCurrent2',
    component: 'InputNumber',
    label: '',
    subLabel: '【零序电流超限等级2】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isHarmonic;
    },
    defaultValue: null,
  },
  {
    field: 'alarmUpperZeroCurrent3',
    component: 'InputNumber',
    label: '',
    subLabel: '【零序电流超限等级3】',

    ifShow: ({ values }) => {
      return !values.isPtVolt && !values.isBoxVolt && values.isHarmonic;
    },
    defaultValue: null,
  },
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
