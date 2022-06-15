import { defHttp } from '/@/utils/http/axios';
import { devicPages, infoParams, getWaveModel } from './model/homeModel';

enum Api {
  RECORD_SUDDEN_LIST = '/record/sudden/list',
  RECORD_SUDDEN_INFO = '/record/sudden/info', 
}

export const recordSuddenGet = (params: devicPages) =>
  defHttp.get<void>({ url: Api.RECORD_SUDDEN_LIST, params });

export const recordSuddenInfo = (params: infoParams) =>
  defHttp.get<getWaveModel>({ url: Api.RECORD_SUDDEN_INFO + '/' + params.id });
