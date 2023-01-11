export interface alarmPages {
  page: number;
  limit: number;
}
export interface homeParams {
  boardId?: string;
  bushingId?: string;
  deviceUniqueId?: string;
}
export interface homeParamsTime {
  deviceUniqueId?: string;
  boardId?: string;
  bushingId?: string;
  startTime?: string;
  endTime?: string;
}

export interface getHomeModel<> {
  code: number;
  msg?: string;
  deviceList?: any;
  historyList?: any;
  realTimeList?: any;
  console?: any;
  showFields?: any;
  todayMv?: any;
  page?: any;
  list?: any;
}
