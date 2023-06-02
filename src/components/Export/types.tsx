/*
 * @Author: liqingqing
 * @Date: 2021-06-24 11:06:45
 * @LastEditTime: 2021-07-21 11:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/Export/types.tsx
 */
// export enum ExportType {
//   SELECT = 'select',
//   CONDITION = 'condition',
//   TOTAL = 'total',
// }

// export interface IExportModal {
//   show: boolean;
//   url: string;
//   message: string;
// }

export interface IModalInfo {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
}

export interface IModalParams {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  params?: Dictionary<string>;
}

export interface ILongonButton {
  id: string;
  'data-longan': string;
}

export interface IExportResponseData<T> {
  errno?: number;
  errmsg?: string;
  data?: T;
  st?: number;
  lid?: string;
  logId?: string;
  payload?: {
    errno?: number;
    errmsg?: string;
    data?: T;
    st?: number;
    lid?: string;
    logId?: string;
  };
}

export type TExportMode = 'select' | 'condition' | 'both';

export type TUseExportMode = Exclude<TExportMode, 'both'>;

export interface IExportParams {
  params: any;
  exportNum: number;
  onSuccess?: () => void;
}

export interface IAsyncOrSyncParams {
  url: string;
  params?: any;
  onSuccess?: () => void;
}

export default {};
