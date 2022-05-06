import { defHttp } from '/@/utils/http/axios';
import { alarmPages, homeParams, homeParamsTime} from './model/homeModel';

enum Api {
  NEW_HOME = '/new/home',
  NEW_HOME_REFRESH = '/new/home/refresh',
  NEW_HOME_DATALIST = '/new/home/dataList',
  NEW_HOME_ALARMLIST = '/new/home/alarmList',
  NEW_LIST = '/new/list',
  NEW_LIST_REFESH = '/new/list/refresh',
  NEW_LIST_HISTORY_REFESH = '/new/list/history/refresh',
  NEW_LIST_HISTORYLIST = '/new/list/historyList',
}

// Get personal center-basic settings
// 首页信息

export const newHomeApi = () => defHttp.get<void>({ url: Api.NEW_HOME });

// 首页定时请求
export const newHomeRefrshApi = (params: homeParams) =>
  defHttp.get<void>({ url: Api.NEW_HOME_REFRESH, params });

// 查询实时数据与历史数据
export const newHomeDataListApi = (params: homeParams) =>
  defHttp.get<void>({ url: Api.NEW_HOME_DATALIST, params });

// 首页报警
export const newHomeAlarmListApi = (params: alarmPages) =>
  defHttp.get<void>({ url: Api.NEW_HOME_ALARMLIST, params });

// 列表数据
export const newListApi = () => defHttp.get<void>({ url: Api.NEW_LIST });

// 列表数据定时刷新
export const newListRefeshApi = () => defHttp.get<void>({ url: Api.NEW_LIST_REFESH });

// 历史数据定时刷新
export const newListHistoryRefeshApi = (params: homeParams) =>
  defHttp.get<void>({ url: Api.NEW_LIST_HISTORY_REFESH, params });

// 历史数据查询
export const newListHistoryListApi = (params: homeParamsTime) => defHttp.get<void>({ url: Api.NEW_LIST_HISTORYLIST, params});
