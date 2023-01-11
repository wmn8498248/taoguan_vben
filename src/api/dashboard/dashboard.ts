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
  MSG_FIELDS_ALL = '/msg/fields/all',
  MSG_FIELDS_UPDATE = '/msg/fields/update',
  MSG_NOT_SHOW= '/msg/notShow',
}

// Get personal center-basic settings
// 设置报警
export const msgNotShow = (params: any) => defHttp.get<any>({ url: Api.MSG_NOT_SHOW, params});


// 获取要展示的字段
export const msgFieldsAllApi = () => defHttp.get<getHomeModel>({ url: Api.MSG_FIELDS_ALL });

// 整体更新需要展示的字段
export const msgFieldsUpdateApi = (data: []) =>
  defHttp.post<getHomeModel>({ url: Api.MSG_FIELDS_UPDATE, data });

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
