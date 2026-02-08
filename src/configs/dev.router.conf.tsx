/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
<<<<<<< HEAD
 * @LastEditTime: 2023-08-20 23:31:34
=======
 * @LastEditTime: 2023-12-25 23:12:59
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
 * @FilePath: /houtai/src/configs/dev.router.conf.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
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
    icon: <AppstoreOutlined />,
    name: '首页',
    text: '首页',
    componentName: 'HomePage',
  },
  {
    path: 'homePage',
    icon: <AppstoreOutlined />,
    name: '首页',
  },
  {
    path: 'leasedEquipment',
    icon: <DesktopOutlined />,
    name: '租赁设备管理',
    auth: 123456,
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
        path: 'toolboxManager',
        name: '工具箱管理',
        componentName: 'ToolboxManager',
      },
      {
        path: 'toolManager',
        name: '工具管理',
        componentName: 'ToolManager',
      },
    ],
  },
  {
    path: 'order',
    icon: <PieChartOutlined />,
    name: '订单',
    auth: 123456,
    children: [
      {
        path: 'orderManager',
        name: '订单管理',
        componentName: 'OrderManager',
      }
    ]
  },
  {
    path: 'consignmentManager',
    icon: <MailOutlined />,
    name: '寄卖管理',
    auth: 123456,
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
    icon: <DesktopOutlined />,
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
<<<<<<< HEAD
    icon: <MenuFoldOutlined />,
=======
    icon: <PieChartOutlined />,
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
    name: '运营',
    children: [
      {
        path: 'gztManager',
        name: '工作台列表',
        componentName: 'GztManager',
<<<<<<< HEAD
=======
        auth: 123456,
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
      },
      {
        path: 'nkkeyManager',
        name: '年卡key管理',
        componentName: 'NkkeyManager',
<<<<<<< HEAD
=======
        auth: 123456,
      },
      {
        path: 'cardsManager',
        name: '会员卡管理',
        componentName: 'CardsManager',
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
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
<<<<<<< HEAD
    icon: <MenuFoldOutlined />,
=======
    icon: <ContainerOutlined />,
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
    name: '进场列表',
    children: [
      {
        path: 'jcmpList',
        name: '门票',
        componentName: 'JcmpList',
<<<<<<< HEAD
=======
        auth: 123456,
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
      },
      {
        path: 'jcyyList',
        name: '预约',
        componentName: 'JcyyList',
<<<<<<< HEAD
=======
        auth: 123456,
      },
      {
        path: 'smjcjl',
        name: '扫码进场记录',
        componentName: 'Smjcjl',
>>>>>>> 6fadbeb242a5d3e53cf7493a1506da0123f0b23e
      },
    ]
  },
  {
    path: 'zllist',
    icon: <PieChartOutlined />,
    name: '租赁列表',
    componentName: 'Zllist',
    auth: 123456,
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
  {
    path: 'importCardsManager',
    icon: <PieChartOutlined />,
    name: '导入卡管理',
    componentName: 'ImportCardsManager',
  },
  // {
  //   path: 'userCardsManager',
  //   icon: <DesktopOutlined />,
  //   name: '用户会员卡管理',
  //   componentName: 'UserCardsManager',
  //   isDetail: true,

  //   // hidden: true,
  // },
];

export default config;
