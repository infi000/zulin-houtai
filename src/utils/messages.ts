/* eslint-disable max-lines */
import { defineMessages } from 'react-intl';
import { GLOBAL_MSG_SCOPE } from 'utils/constants';
// 与路由保持一致
export const scope = GLOBAL_MSG_SCOPE;

export default defineMessages({
  create: {
    id: `${scope}.create`,
    defaultMessage: '新建',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: '查看',
  },
  operate: {
    id: `${scope}.operate`,
    defaultMessage: '操作',
  },
  detail: {
    id: `${scope}.detail`,
    defaultMessage: '详情',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: '修改',
  },
  paginationTotal: {
    id: `${scope}.paginationTotal`,
    defaultMessage: '共{total}项',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: '状态',
  },
  selectPlaceholder: {
    id: `${scope}.selectPlaceholder`,
    defaultMessage: '请选择',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: '请输入',
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: '重置',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: '保存',
  },
  ok: {
    id: `${scope}.save`,
    defaultMessage: '确定',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: '删除',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: '确认',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: '取消',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: '退出登录',
  },
  popConfirmTip: {
    id: `${scope}.popConfirmTip`,
    defaultMessage: '确认要进行该操作吗？',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: '查询',
  },
});

export const menuMessages = defineMessages({
  homePage: {
    id: `${scope}.menu.homePage`,
    defaultMessage: '首页',
  },
  customerManage: {
    id: `${scope}.customerManage`,
    defaultMessage: '客户管理',
  },
  placeSearch: {
    id: `${scope}.placeSearch`,
    defaultMessage: '场地查询',
  },
  placeDetail: {
    id: `${scope}.placeDetail`,
    defaultMessage: '场地详情',
  },
  zoneManage: {
    id: `${scope}.zoneManage`,
    defaultMessage: '场地管理',
  },
  freeZoneManage: {
    id: `${scope}.freeZoneManage`,
    defaultMessage: '闲置场地上报',
  },
  zoneInfoManage: {
    id: `${scope}.zoneInfoManage`,
    defaultMessage: '场地信息管理',
  },
  rewardsInfoManage: {
    id: `${scope}.rewardsInfoManage`,
    defaultMessage: '场地奖励机制',
  },
  sysManage: {
    id: `${scope}.sysManage`,
    defaultMessage: '系统管理',
  },
  sysDictManage: {
    id: `${scope}.sysDictManage`,
    defaultMessage: '系统字典管理',
  },
  sysDictDetail: {
    id: `${scope}.sysDictDetail`,
    defaultMessage: '系统字典详情',
  },
  resourceScreen: {
    id: `${scope}.resourceScreen`,
    defaultMessage: '资源大屏',
  },
  resourceSearch: {
    id: `${scope}.resourceSearch`,
    defaultMessage: '资源查询',
  },
  equipmentManage: {
    id: `${scope}.equipmentManage`,
    defaultMessage: '设备管理',
  },
  equipmentSearch: {
    id: `${scope}.equipmentSearch`,
    defaultMessage: '设备查询',
  },
  transSearch: {
    id: `${scope}.transSearch`,
    defaultMessage: '运力查询',
  },
  businessManage: {
    id: `${scope}.businessManage`,
    defaultMessage: '商机需求管理',
  },
  zoneRentManage: {
    id: `${scope}.zoneRentManage`,
    defaultMessage: '场地租赁管理',
  },
  freeEquipmentManage: {
    id: `${scope}.freeEquipmentManage`,
    defaultMessage: '闲置设备上报',
  },
  equipmentInfoManage: {
    id: `${scope}.equipmentInfoManage`,
    defaultMessage: '设备信息管理',
  },
  equipmentFreeManage: {
    id: `${scope}.equipmentFreeManage`,
    defaultMessage: '设备闲置管理',
  },
  equipmentTransferManage: {
    id: `${scope}.equipmentTransferManage`,
    defaultMessage: '设备调拨管理',
  },
  transManage: {
    id: `${scope}.transManage`,
    defaultMessage: '运力管理',
  },
  userManage: {
    id: `${scope}.userManage`,
    defaultMessage: '用户管理',
  },
  authManage: {
    id: `${scope}.authManage`,
    defaultMessage: '权限管理',
  },
  sysLogManage: {
    id: `${scope}.sysLogManage`,
    defaultMessage: '系统日志',
  },
  confManage: {
    id: `${scope}.confManage`,
    defaultMessage: '配置管理',
  },
  taskList: {
    id: `${scope}.taskList`,
    defaultMessage: '数据导入导出',
  },
  leasedEquipment:{
    id: `${scope}.leasedEquipment`,
    defaultMessage: '租赁设备管理',
  },
  houseManager: {
    id: `${scope}.houseManager`,
    defaultMessage: '房间管理',
  },
  experimentManager: {
    id: `${scope}.experimentManager`,
    defaultMessage: '实验项目管理',
  },
  equipmentManager: {
    id: `${scope}.equipmentManager`,
    defaultMessage: '设备管理',
  },
  toolboxManager: {
    id: `${scope}.toolboxManager`,
    defaultMessage: '工具箱管理',
  },
  toolManager: {
    id: `${scope}.toolManager`,
    defaultMessage: '工具管理',
  },
  orderManager: {
    id: `${scope}.orderManager`,
    defaultMessage: '订单管理',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: '订单',
  },
  consignmentManager: {
    id: `${scope}.consignmentManager`,
    defaultMessage: '寄卖管理',
  },
  consignmentGoodsManager: {
    id: `${scope}.consignmentGoodsManager`,
    defaultMessage: '寄卖商品',
  },
  consignmentOrderManager: {
    id: `${scope}.consignmentOrderManager`,
    defaultMessage: '寄卖订单',
  },
  settingManager: {
    id: `${scope}.settingManager`,
    defaultMessage: '设置管理',
  },
  settingMainManager: {
    id: `${scope}.settingMainManager`,
    defaultMessage: '基础设置',
  },
  userInfoManager: {
    id: `${scope}.userInfoManager`,
    defaultMessage: '用户管理',
  },
  zllist: {
    id: `${scope}.zllist`,
    defaultMessage: '租赁列表',
  },
});

export const yesOrNoMessages = defineMessages({
  1: {
    id: `${scope}.yesOrNo.1`,
    defaultMessage: '是',
  },
  2: {
    id: `${scope}.yesOrNo.2`,
    defaultMessage: '否',
  },
}) as ReactIntl.Messages;

export const statusMessages = defineMessages({
  1: {
    id: `${scope}.status.1`,
    defaultMessage: '生效',
  },
  2: {
    id: `${scope}.status.2`,
    defaultMessage: '失效',
  },
}) as ReactIntl.Messages;
