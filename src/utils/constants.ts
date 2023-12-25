/*
 * @Author: 李淳
 * @Date: 2020-06-15 14:18:50
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-22 23:20:50
 * @Description: file content
 */
// prefix
export const POST_ACTION_PREFIX = '/post';
export const GET_ACTION_PREFIX = '/get';

// suffix
export const FETCH_PENDING_SUFFIX = '/pending';
export const FETCH_FULFILLED_SUFFIX = '/fulfilled';
export const FETCH_REJECTED_SUFFIX = '/rejected';

// 丰景台
export const FENGJINGTAI_HOST_SIT = 'http://cdbi.sit.sf-express.com';
export const FENGJINGTAI_HOST_MASTER = 'http://cdbi.sf-express.com';
export const FENGJINGTAI_APPID = 'TS-RMP-CORE';
export const FENGJINGTAI_TOKEN = 'QUVCRDlGODhGRkMxNkU3OURBREUxNkQ1MDVFMDYwMkUxOEZGMUQyNkI3NUI5Rjg1RTg4MEQ0NzEyODJBNTM1NQ==';

// reg
export const GET_START_REG = new RegExp(`${GET_ACTION_PREFIX}.*(${FETCH_PENDING_SUFFIX})$`);

// scope
export const GLOBAL_MSG_SCOPE = 'cosmos.src.global';

// errno
export const USER_NOT_LOGIN_ERRNO = 100001; // 用户未登陆
export const USER_NOT_EXIST_ERRNO = 110018; // 用户不存在

// operate constant
export const CREATE = 'create';
export const EDIT = 'edit';
export const VIEW = 'view';
export const STATUS = 'status';
export const REVIEW = 'review';
export const APPROVE = 'approve';
export const DELETE = 'delete';
export const CHECK = 'check';
export const DRAFT = 'draft';
export const IMPORT = 'import';
export const LOG = 'log';

// 用于存请求方式和请求接口的url
export const REQUEST_MATERIAL = { requestUrl: '', requestMethod: '' };

// 输入长度
export const nameIptLength = 60;
export const codeIptLength = 30;

export const statusMap = {
  0: '启用',
  1: '禁用',
};

export const yesOrNo = new Map([
  [1, '是'],
  [0, '否'],
]);

export const EQUIPMENT_USE_STATUS_MAP = new Map([[1, '闲置'], [2, '激活'], [3, '下架']]);

// 字典接口字段枚举
export enum EDictMap {
  '仓库类型' = 'warehouse_type',
  '仓库属性' = 'warehouse_attr',
  '仓库所属大区' = 'warehouse_region',
  '仓库状态' = 'warehouse_status',
  '业务区' = 'business_area',
  '区域中心' = 'regional_center',
  '所属BU' = 'belong_bu',
  '经营类型' = 'marketing_type',
  '行业分类' = 'industry_class',
  '融通方式' = 'financing_mode',
  '建筑物属性' = 'building_properties',
  '建筑类型' = 'building_type',
  '建筑结构' = 'building_struct',
  '月台配置' = 'platform_config',
  '地面材质' = 'floor_material',
  '消防等级' = 'building_fire_Level',
  '耐火等级' = 'fire_resistance_rating',
  '业务模块导入模板' = 'biz_template_id',
  '最小面积' = 'area_class',
  '成本中心' = 'cost_center',
  '公司' = 'company',
  '功能位置' = 'functional_location',
  '资产小类' = 'asset_sub_category',
  '使用类型' = 'use_type',
  '职位' = 'position',
  '资产大类' = 'asset_category',
  '资产中类' = 'asset_middle_class',
  '系统状态' = 'system_state',
  '设备来源' = 'equipment_source',
  '设备类型' = 'equipment_type',
  '区部描述' = 'regional_description',
  '设备状态sap' = 'equipment_status',
  '本部描述' = 'durrent_description',
  '任务类型' = 'de_task_type', // 任务列表用
  '处理状态' = 'de_treat_status', // 任务列表用
  '任务结果状态' = 'de_task_result_status', // 任务列表用
  '设备使用状态' = 'device_use_status',
}

export const DICT_IDS = Object.values(EDictMap);

// 导出接口模块id枚举
export enum EExportModuleId {
   '场地信息' = '100',
   '场地奖励信息' = '200',
   '闲置场地信息' = '300',
   '设备信息' = '400',
   '闲置设备记录' = '500',
   '调拨设备记录' = '600',
}

export const card_type = new Map([
  ['1', '年卡'],
  ['2', '季卡'],
  ['3', '月卡'],
  ['4', '次卡'],
]);