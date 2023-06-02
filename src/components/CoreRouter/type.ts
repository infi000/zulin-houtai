import { ReactNode, ComponentType, ElementType } from 'react';
import { RouteProps } from 'react-router-dom';

export interface RouteBaseConfig<Extend extends Record<string, unknown> = {}, Auth = number> extends RouteProps {
  path?: string;
  /** 重定向地址 */
  redirectTo?: string;
  /** 组件所在的目录，默认为路由的path */
  catalog?: string;
  /** 进入路由的权限 */
  auth?: Auth;
  /** 是否使用布局，默认 true */
  useLayout?: boolean;
  /** 子路由配置 */
  children?: RouteConfig<Extend, Auth>[];
  /** 加载失败时的内容 */
  fallback?: ReactNode;
  /** 有子路由时，自身是否为路由，默认 false */
  exist?: boolean;
  /** 是否是详情页面，默认 false */
  isDetail?: boolean;
}

export type RouteConfig<Extend extends Record<string, unknown> = {}, Auth = number> = RouteBaseConfig<Extend, Auth> & Extend;

export type Routes<Extend extends Record<string, unknown> = {}, Auth = number> = RouteConfig<Extend, Auth>[];

export type HighOrderRoute<Extend extends Record<string, unknown> = {}, Auth = number> = RouteConfig<Extend, Auth> | Array<HighOrderRoute<Extend, Auth>>;

export type CheckAuth<Extend extends Record<string, unknown> = {}, Auth = number> = (config: RouteConfig<Extend, Auth>) => boolean;

export interface CosmosRouterProps<Extend extends Record<string, unknown> = {}, Auth = number> {
  /** 路由配置项数组 */
  routes: Routes<Extend, Auth>;
  /** 默认的路由配置 */
  defaultConfig?: RouteConfig<Extend, Auth>;
  /** 懒加载时引用组件的方法 */
  lazyLoad?: (path: string) => Promise<{ default: ComponentType; }>;
  /** 路由的布局组件 */
  layout?: ElementType;
  /** 校验权限的方法 */
  checkAuth?: CheckAuth<Extend, Auth>;
  /** 校验结果是否已返回 */
  hasCheckResult?: boolean;
  /** 文件目录结构是否跟随路由结构，默认 false */
  catalogFromRoute?: boolean;
};
