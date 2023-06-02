export interface IRequestParams {
  sysCode: string;
  tableName: string;
  id: string | number;
  limit?: number;
}

export interface IPageState {
  loading: boolean;
  logList: ILogItem[];
  hasMore: boolean;
  limit: number;
}

export interface ILogItem {
  eventTypeName: string;
  changeDesc: string;
  updateTime: string;
  updateUserName: string;
}
