/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-27 23:25:36
 * @FilePath: /houtai/src/configs/dev.router.conf.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { MyIcon } from 'static/icon';
import authMap from './auth.conf';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';


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
    path: 'leasedEquipment',
    icon: <AppstoreOutlined />,
    name: '租赁设备管理',
    children: [
      {
        path: 'equipmentManager',
        name: '设备管理',
        componentName: 'EquipmentManager',
      },
      {
        path: 'experimentManager',
        name: '实验项目管理',
        componentName: 'ExperimentManager',
      },
      {
        path: 'experimentLv2Manager',
        name: '实验项目小分类',
        componentName: 'ExperimentLv2Manager',
        hidden: true,
        isDetail: true,
      },
      // {
      //   path: 'ExperimentLeve2Manager',
      //   name: '实验项目二级页面',
      //   componentName: 'ExperimentLeve2Manager',
      //   hidden: true,
      //   isDetail: true,
      // },
      {
        path: 'toolboxManager',
        name: '工具箱管理',
        componentName: 'ToolboxManager',
      },
      {
        path: 'toolManager',
        name: '工具管理',
        componentName: 'ToolManager',
      },
      {
        path: 'leaseSettimesManager',
        name: '租赁时间',
        componentName: 'LeaseSettimesManager',
      },
    ],
  },
  {
    path: 'order',
    icon: <ContainerOutlined />,
    name: '订单',
    children: [
      {
        path: 'orderManager',
        name: '订单管理',
        componentName: 'OrderManager',
      },
      {
        path: 'orderCzManager',
        name: '充值记录',
        componentName: 'OrderCzManager',
      }

    ]
  },
  {
    path: 'consignmentManager',
    icon: <MailOutlined />,
    name: '寄卖管理',
    children: [
      {
        path: 'consignmentGoodsManager',
        name: '寄卖商品',
        componentName: 'ConsignmentGoodsManager',
      },
      {
        path: 'consignmentOrderManager',
        name: '寄卖订单',
        componentName: 'ConsignmentOrderManager',
      },
    ]
  },
  {
    path: 'settingManager',
    icon: <MenuFoldOutlined />,
    name: '设置管理',
    children: [
      {
        path: 'settingMainManager',
        name: '基础设置',
        componentName: 'SettingMainManager',
      },
    ]
  },
  {
    path: 'yunying',
    icon: <MenuFoldOutlined />,
    name: '运营',
    children: [
      {
        path: 'gztManager',
        name: '工作台列表',
        componentName: 'GztManager',
      },
      {
        path: 'nkkeyManager',
        name: '年卡key管理',
        componentName: 'NkkeyManager',
      },
      {
        path: 'cardsManager',
        name: '会员卡管理',
        componentName: 'CardsManager',
      },
      // {
      //   path: 'rdManager',
      //   name: '入店客户',
      //   componentName: 'RdManager',
      // },
    ]
  },
  {
    path: 'jcList',
    icon: <MenuFoldOutlined />,
    name: '进场列表',
    children: [
      {
        path: 'jcmpList',
        name: '门票',
        componentName: 'JcmpList',
      },
      {
        path: 'jcyyList',
        name: '预约',
        componentName: 'JcyyList',
      },
    ]
  },
  {
    path: 'checkManager',
    icon: <MailOutlined />,
    name: '检查管理',
    children: [
      {
        path: 'checkOpenManager',
        name: '检查内容列表',
        componentName: 'CheckOpenManager',
      },
      {
        path: 'checkedListManager',
        name: '检查记录列表',
        componentName: 'CheckedListManager',
      },
    ]
  },
  {
    path: 'videoManager',
    icon: <PieChartOutlined />,
    name: '视频介绍',
    componentName: 'VideoManager',
  },
  {
    path: 'zllist',
    icon: <PieChartOutlined />,
    name: '租赁列表',
    componentName: 'Zllist',
  },
  {
    path: 'rentManager',
    icon: <PieChartOutlined />,
    name: '出租列表',
    componentName: 'RentManager',
  },
  {
    path: 'teacherManager',
    icon: <PieChartOutlined />,
    name: '老师管理',
    componentName: 'TeacherManager',
    exist: true,
    children: [
      {
        hidden: true,
        isDetail: true,
        path: 'teacherStatusManager',
        componentName: 'TeacherStatusManager',
        name: '老师状态管理',
      },
    ],
  },
  {
    path: 'userInfoManager',
    icon: <DesktopOutlined />,
    name: '用户管理',
    componentName: 'UserInfoManager',
    exist: true,
    children: [
      {
        hidden: true,
        isDetail: true,
        path: 'userCardsManager',
        name: '用户会员卡管理',
      },
    ],
    // children: [
    //   {
    //     path: 'userCardsManager',
    //     name: '用户会员卡管理',
    //     componentName: 'UserCardsManager',
    //     hidden: true,
    //   },
    // ]
  },
];

export default config;
