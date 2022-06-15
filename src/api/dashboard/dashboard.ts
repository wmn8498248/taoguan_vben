import { defHttp } from '/@/utils/http/axios';
import { alarmPages, homeParams, homeParamsTime, getHomeModel } from './model/homeModel';

enum Api {
  NEW_HOME = '/msg/home',
  NEW_HOME_REFRESH = '/msg/home/refresh',
  NEW_HOME_DATALIST = '/msg/home/dataList',
  NEW_HOME_ALARMLIST = '/msg/home/alarmList',
  NEW_LIST = '/msg/list',
  NEW_LIST_REFESH = '/msg/list/refresh',
  NEW_LIST_HISTORY_REFESH = '/msg/list/history/refresh',
  NEW_LIST_HISTORYLIST = '/msg/list/historyList',
}

// Get personal center-basic settings
// 首页信息

export const newHomeApi = () => defHttp.get<getHomeModel>({ url: Api.NEW_HOME });

// 首页定时请求
export const newHomeRefrshApi = (params: homeParams) =>
  defHttp.get<getHomeModel>({ url: Api.NEW_HOME_REFRESH, params });

// 查询实时数据与历史数据
export const newHomeDataListApi = (params: homeParams) =>
  defHttp.get<getHomeModel>({ url: Api.NEW_HOME_DATALIST, params });

// 首页报警
export const newHomeAlarmListApi = (params: alarmPages) =>
  defHttp.get<getHomeModel>({ url: Api.NEW_HOME_ALARMLIST, params });

// 列表数据
export const newListApi = () => defHttp.get<void>({ url: Api.NEW_LIST });

// 列表数据定时刷新
export const newListRefeshApi = () => defHttp.get<getHomeModel>({ url: Api.NEW_LIST_REFESH });

// 历史数据定时刷新
export const newListHistoryRefeshApi = (params: homeParams) =>
  defHttp.get<getHomeModel>({ url: Api.NEW_LIST_HISTORY_REFESH, params });

// 历史数据查询
export const newListHistoryListApi = (params: homeParamsTime) =>
  defHttp.get<getHomeModel>({ url: Api.NEW_LIST_HISTORYLIST, params });
