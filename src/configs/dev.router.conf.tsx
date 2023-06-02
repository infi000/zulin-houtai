import React from 'react';
import { MyIcon } from 'static/icon';
import authMap from './auth.conf';

// import authMap from './auth.conf';

const config: Array<any> = [
  {
    path: '',
    icon: <MyIcon type='icon-icn_shouyegaoliang1' />,
    name: '首页',
    text: '首页',
    componentName: 'HomePage',
  },
  {
    path: 'homePage',
    icon: <MyIcon type='icon-icn_shouyegaoliang1' />,
    name: '首页',
  },
  {
    path: 'resourceScreen',
    icon: <MyIcon type='icon-icn_dapinggaoliang' />,
    name: '资源大屏',
    // componentName: 'ResourceScreen',
    redirectTo: 'http://scc-wpm.sf-express.com/#/onlineResourceBoard',
    auth: authMap.AUTH_SCREEN,
  },
  {
    path: 'resourceSearch',
    icon: <MyIcon type='icon-icn_ziyuangaoliang' />,
    name: '资源查询',
    children: [
      {
        path: 'placeSearch',
        name: '场地查询',
        exist: true,
        auth: authMap.AUTH_PLACE_SEARCH,
        children: [
          {
            // exist: true,
            hidden: true,
            isDetail: true,
            path: 'placeDetail',
            name: '场地详情',
          },
        ],
      },
      {
        path: 'equipmentSearch',
        name: '设备查询',
        componentName: 'EquipmentSearch',
        auth: authMap.AUTH_DEVICE_IDLE_NEW_LIST,
      },
      {
        path: 'transSearch',
        name: '运力查询',
        componentName: 'TempPage',
        auth: authMap.AUTH_TRANS_SEARCH,
      },
    ],
  },
  {
    path: 'zoneManage',
    name: '场地管理',
    icon: <MyIcon type='icon-a-icn_changdigaoliang15x' />,
    children: [
      {
        path: 'freeZoneManage',
        name: '闲置场地上报',
        auth: authMap.AUTH_ZONE_LIST,
      },
      {
        path: 'rewardsInfoManage',
        name: '场地奖励机制',
        auth: authMap.AUTH_REWARDSINFO_LIST,
      },
      {
        path: 'zoneInfoManage',
        name: '场地信息管理',
        auth: authMap.AUTH_PLACE_LIST,
      },
      // {
      //   path: 'businessManage',
      //   name: '商机需求管理',
      //   componentName: 'TempPage',
      //   // auth: authMap.AUTH_FUNC_ROLE_VIEW,
      // },
      // {
      //   path: 'zoneRentManage',
      //   name: '场地租赁管理',
      //   componentName: 'TempPage',
      //   // auth: authMap.AUTH_FUNC_ROLE_VIEW,
      // },
    ],
  },
  {
    path: 'equipmentManage',
    name: '设备管理',
    icon: <MyIcon type='icon-icn_shebeigaoliang' />,
    children: [
      // {
      //   path: 'freeEquipmentManage',
      //   name: '闲置设备上报',
      //   componentName: 'TempPage',
      //   // auth: authMap.AUTH_FUNC_ROLE_VIEW,
      // },
      {
        path: 'equipmentFreeManage',
        name: '设备闲置管理',
        componentName: 'EquipmentFreeManage',
        auth: authMap.AUTH_DEVICE_FREE_LIST,
      },
      {
        path: 'equipmentTransferManage',
        name: '设备调拨管理',
        componentName: 'EquipmentTransferManage',
        auth: authMap.AUTH_DEVICE_DISPATCH_LIST,
      },
      {
        path: 'equipmentInfoManage',
        name: '设备信息管理',
        componentName: 'EquipmentInfoManage',
        auth: authMap.AUTH_DEVICE_LIST,
      },

    ],
  },
  {
    path: 'transManage',
    icon: <MyIcon type='icon-a-icn_yunligaoliang15x' />,
    name: '运力管理',
    componentName: 'TempPage',
    auth: authMap.AUTH_TRANS_LIST,
  },
  {
    path: 'sysManage',
    name: '系统管理',
    icon: <MyIcon type='icon-icn_xitonggaoliang' />,
    children: [
      {
        path: 'userManage',
        name: '用户管理',
        componentName: 'TempPage',
        auth: authMap.AUTH_USER_LIST,
      },
      {
        path: 'authManage',
        name: '权限管理',
        componentName: 'TempPage',
        auth: authMap.AUTH_USERPRIVILEGE_LIST,
      },
      {
        path: 'sysLogManage',
        name: '系统日志',
        componentName: 'TempPage',
        auth: authMap.AUTH_SYSLOG_LIST,
      },
      {
        path: 'confManage',
        name: '配置管理',
        componentName: 'TempPage',
        auth: authMap.AUTH_SYSCONF_LIST,
      },
      {
        path: 'taskList',
        name: '数据导入导出',
        // hidden: true,
        componentName: 'TaskListManage',
        auth: authMap.AUTH_IMPORT_LIST,
      },
      {
        path: 'sysDictManage',
        name: '系统字典管理',
        exist: true,
        auth: authMap.AUTH_SYSDICT,
        children: [
          {
            path: 'sysDictDetail',
            hidden: true,
            isDetail: true,
            name: '系统字典详情',
          },
        ],
      },
    ],
  },
];

export default config;
