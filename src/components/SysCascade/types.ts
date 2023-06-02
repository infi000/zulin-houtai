export interface IItem {
  id?: number;
  sys_code?: string;
  sys_name?: string;
  sub_sys?: {
    id?: number;
    sys_code?: string;
    sys_name?: string;
  }[]
}
export interface IPageState {
  dataSource: IItem[];
}
