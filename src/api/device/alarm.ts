import { defHttp } from '/@/utils/http/axios';
import { devicPages, getTableModel } from './model/homeModel';

enum Api {
  MSG_ALARM_LIST = '/msg/alarm/list',
  MSG_ALARM_UPDATE = '/msg/alarm/update',
  MSG_ALARM_UPDATE_ALL = '/msg/alarm/update/all', 
  MSG_ALARM_DELETE = '/msg/alarm/delete',
  MSG_ALARM_DELETE_ALL = '/msg/alarm/delete/all',
}
// 报警列表
export const msgAlarmList = (params: devicPages) =>
  defHttp.get<getTableModel>({ url: Api.MSG_ALARM_LIST, params });
// 更新所选为已读
export const msgAlarmUpdate = (params: any) =>
  defHttp.put<getTableModel>({ url: Api.MSG_ALARM_UPDATE, params });
//更新全部为已读
export const msgAlarmUpdateAll = () => defHttp.put<getTableModel>({ url: Api.MSG_ALARM_UPDATE_ALL });
// 删除所选
export const msgAlarmDelete = (params: any) =>
  defHttp.delete<getTableModel>({ url: Api.MSG_ALARM_DELETE, params });
// 删除全部报警
export const msgAlarmDeleteAll = () => defHttp.delete<getTableModel>({ url: Api.MSG_ALARM_DELETE_ALL });
