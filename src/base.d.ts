declare namespace SofaAction {
  // redux action
  type TAction = {
    type: string;
    payload?: any;
    loadingAction?: (loading: boolean) => TAction;
    // 异步Action调用成功后的Action
    success?: (TAction | any);
    error?: any;
  }
  // redux action creator
  type TActionCreator = (params?: any, callback?: any) => TAction;
}

/**
 * 有 value 和 label 的数组
 */
declare interface IValLabelItem {
  value: string | number;
  label: string;
}
