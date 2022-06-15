export interface getTableModel<> {
  code: number;
  msg?: string;
  bushingRecordWave?: any;
  bushingDeviceBusiness?: any;
  page?: any;
  list?: [];
}

export interface getWaveModel<> {
  code: number;
  msg?: string;
  bushingSuddenWave?: any ;
}

export interface boardIdParams {
  boardId: string;
  second?: string;
  idx?: string;
}
export interface devicPages {
  page: number;
  limit: number;
}
export interface infoParams {
  id: string;
}
export interface devicParams {
  alarmCap1: number; //电容量报警等级1
  alarmCap2: number; //电容量报警等级2
  alarmCap3: number; //电容量报警等级3
  alarmDownMonitor1: number; //电流下限报警等级1
  alarmDownMonitor2: number; //电流下限报警等级2
  alarmDownMonitor3: number; //电流下限报警等级3
  alarmDuration: number; //持续多久触发报警
  alarmLoss1: number; //介损报警等级1
  alarmLoss2: number; //介损报警等级2
  alarmLoss3: number; //介损报警等级3
  alarmRelativelyCap1: number; // 相对电容量报警等级1
  alarmRelativelyCap2: number; //相对电容量报警等级2
  alarmRelativelyCap3: number; //相对电容量报警等级3
  alarmRelativelyLoss1: number; //相对介损报警等级1
  alarmRelativelyLoss2: number; // 相对介损报警等级2
  alarmRelativelyLoss3: number; //相对介损报警等级3
  alarmUpperMonitor1: number; //电流上限报警等级1
  alarmUpperMonitor2: number; //电流上限报警等级2
  alarmUpperMonitor3: number; //电流上限报警等级3
  alarmUpperZeroCurrent1: number; //零序电流报警上限等级1
  alarmUpperZeroCurrent2: number; //零序电流报警上限等级2
  alarmUpperZeroCurrent3: number; //零序电流报警上限等级3
  boardId: number; //电路板Id
  bushingId: number; //通路序号
  calculationMethod: number; //计算方式
  capInitial: number; //电容量初始值
  companyId: number; //公司id
  deviceUniqueId: number; //设备唯一编号
  rmsGroup: number; //相对计算(自定义)分组
  isBoxVolt: boolean; //是否是分压盒
  isHarmonic: boolean; //是否是分压盒
  isPercentageAlarmCap: boolean; //是否是分压盒
  isPercentageAlarmMonitor: boolean; //是否是分压盒
  isProtectionMonitor: boolean; //是否是分压盒
  isSegmentCalibrationLoss: boolean; //是否是分压盒
  isSegmentCalibrationMonitor: boolean; //是否是分压盒
  isSelect: boolean; //是否是分压盒
  isUseCapInitial: boolean; //是否是分压盒
  isPtVolt: boolean; //是否是分压盒
  monitorFilterA: number; //是否是分压盒
  monitorProtectionMin: number; //是否是分压盒
  monitorProtectionRange: number; //是否是分压盒
  monitorRatioK: number; //是否是分压盒
  monitorReferenceValue: number; //电流的标准值
  name: string; //套管名称
  phaseCom: number; //相位补偿
  relativelyGbOrder: number; //相对计算(国标)基准顺序
  resistanceEvalK: number; //阻性电流等效系数
  segmentCalibrationLossMinRms: number; //分段校准介损的最小电流触发值
  sortNum: Array<[]>; //设备显示顺序
  threePhase: string; //三相
  voltGroup: number; //pt相电压分组
  id?: number; //设备id；必选
}
