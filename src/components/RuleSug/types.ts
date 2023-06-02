export interface ISearchCondition {
  rule_id?: string;
  sug_rule: string; // 否 仓库名称/编码
  company_id?: string; // 否 货主id
  is_user?: string; // 1是2否 是否取用户权限内的数据
  rule_type: 1|2|3|4;
}

export interface IItem {
  rule_id: string; // 必须 仓库id
  rule_name: string; // 必须 仓库名称
  rule_code: string; // 必须 仓库编码
}

export interface IPageState {
  dataSource: IItem[];
}
