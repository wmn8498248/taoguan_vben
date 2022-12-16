import { defHttp } from '/@/utils/http/axios';
import { devicPages, infoParams, getTableModel, boardIdParams } from './model/homeModel';

enum Api {
  DEVICE_BUSINESS_LIST = '/device/business/list',
  DEVICE_BUSINESS_INFO = '/device/business/info',
  DEVICE_BUSINESS_UPDATE = '/device/business/update', 
  DEVICE_BUSINESS_DELETE = '/device/business/delete',
  DEVICE_BUSINESS_SAVE = '/device/business/save',

  RECORD_WAVE_GET = '/record/wave/get',
  RECORD_WAVE_READ = '/record/wave/read',
  RECORD_WAVE_OUT = '/record/wave/out',
  RECORD_WAVE_LIST = '/record/wave/list',
  RECORD_WAVE_INFO = '/record/wave/info',
  RECORD_WAVE_RESET = '/record/wave/reset',

}
export const recordWaveReset = (params: boardIdParams) =>
  defHttp.get<getTableModel>({ url: Api.RECORD_WAVE_RESET, params });

  
export const recordWaveGet = (params: boardIdParams) =>
  defHttp.get<getTableModel>({ url: Api.RECORD_WAVE_GET, params });
export const recordWaveRead = (params: boardIdParams) =>
  defHttp.get<getTableModel>({ url: Api.RECORD_WAVE_READ, params });
export const recordWaveOut = (params: boardIdParams) =>
  defHttp.get<getTableModel>({ url: Api.RECORD_WAVE_OUT, params });
export const recordWaveList = (params: devicPages) => defHttp.get<void>({ url: Api.RECORD_WAVE_LIST, params});
export const recordWaveInfo = (params: infoParams) =>
  defHttp.get<getTableModel>({ url: Api.RECORD_WAVE_INFO + '/' + params.id });

// Get personal center-basic settings
// 业务设备参数列表
export const deviceBusinessList = (params: devicPages) =>
  defHttp.get<getTableModel>({ url: Api.DEVICE_BUSINESS_LIST, params });

// 新建设备参数信息
export const deviceBusinessSave = (params: any) =>
  defHttp.post<getTableModel>({ url: Api.DEVICE_BUSINESS_SAVE, params });

// 获取设备参数信息
export const deviceBusinessInfo = (params: any) =>
  defHttp.get<getTableModel>({ url: Api.DEVICE_BUSINESS_INFO + '/' + params.id });

// 修改设备参数信息
export const deviceBusinessUpdate = (params: any) =>
  defHttp.put<getTableModel>({ url: Api.DEVICE_BUSINESS_UPDATE, params });

// 删除设备
export const deviceBusinessDelete = (params: any) =>
  defHttp.delete<getTableModel>({ url: Api.DEVICE_BUSINESS_DELETE, params });
