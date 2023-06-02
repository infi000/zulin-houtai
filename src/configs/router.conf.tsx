/*
 * @Author: your name
 * @Date: 2021-01-25 10:55:37
 * @LastEditTime: 2021-02-19 17:50:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/configs/router.conf.tsx
 */
import React, { ReactNode } from 'react';
// import { Routes, RouteConfig as CosmosRouteConfig } from 'cosmos-router';
import {
  Routes,
  RouteConfig as CosmosRouteConfig,
} from 'components/CoreRouter';

export type Extend = {
  /** 菜单的名称 */
  name?: string;
  /** 菜单的icon */
  icon?: string | ReactNode;
  /** 是否在菜单中隐藏 */
  hidden?: boolean;
  /** TODO 菜单的icon 暂时先用图片代替，以后换成iconFont */
  image?: string;
};

export type RouteConfig = CosmosRouteConfig<Extend>;

const config: Routes<Extend> = [
  /* generator router */
  {
    exact: false,
    component: () => <div>404 not found</div>,
  },
];

export default config;
