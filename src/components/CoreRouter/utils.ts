import { createContext } from 'react';
import flattenDeep from 'lodash/flattenDeep';
import trim from 'lodash/trim';

import { Routes, RouteConfig, HighOrderRoute, CheckAuth } from './type';

export const routeContext = createContext<{ routes: Routes<any, any>; defaultConfig?: RouteConfig<any, any>; }>({ routes: [] });

export const concatPath = (...paths: string[]) => {
  return '/' + paths.map(path => trim(path, '/')).filter(Boolean).join('/');
}

/** 路由配置项目是否有 children */
export const hasChildren = <Extend extends Record<string, unknown>, Auth = number>(children?: RouteConfig<Extend, Auth>[]) => !!(Array.isArray(children) && children.length);

/** 将path转成文件目录 */
export const path2Catalog = (path: string) => {
  return path ? (path[0].toUpperCase() + path.slice(1)) : '';
}

/** 格式化路由，返回一个高阶数组 */
const formatRoutes = <E extends Record<string, unknown> = {}>(routes: RouteConfig<E>[] = [], parentPath: string = '', parentCatalog: string = ''): HighOrderRoute<E & { allPath: string; allCatalog: string; }>[] => {
  return routes.map((route: any) => {
    const { children, ...rest } = route;
    const { exist, path = '', catalog, redirectTo } = rest;

    const currentCatalog = typeof catalog === 'undefined' ? path2Catalog(path) : catalog;
    const allPath = concatPath(parentPath, path);
    const allCatalog = concatPath(parentCatalog, currentCatalog);

    const pathResolvedRoute = {
      ...rest,
      catalog: currentCatalog,
      allPath,
      allCatalog,
      redirectTo: redirectTo && concatPath(parentPath, redirectTo),
    };

    if (hasChildren(children)) {
      if (exist) {
        return [pathResolvedRoute, ...formatRoutes(children, allPath, allCatalog)]
      } else {
        return formatRoutes(children, allPath, allCatalog);
      }
    } else {
      return pathResolvedRoute;
    }
  })
}

/** 扁平化配置项数组*/
export const flatRoutes = <E extends Record<string, unknown>>(routes: Routes<E>) => {
  return flattenDeep(formatRoutes(routes));
}

/** 给路由添加授权结果标识 */
export const addFlag2Route = <Extend extends Record<string, unknown> = {}, Auth = number>(configs: Routes<Extend, Auth>, checkAuth: CheckAuth<Extend, Auth> = () => true) => {

  /** 过滤出没有权限的路由和子集全部没有权限的路由 */
  const addFlag = (_configs: RouteConfig<Extend, Auth>[], parentFlag: boolean = true): RouteConfig<{ authFlag: boolean; }>[] => {
    return _configs.map(config => {

      const { auth, children } = config;

      const currentFlag = typeof auth === 'undefined' || checkAuth(config);
      const authFlag = parentFlag && currentFlag;

      if (hasChildren(children)) {
        return {
          ...config,
          authFlag,
          children: addFlag(children!, authFlag)
        }
      };

      return {
        ...config,
        authFlag
      };

    }) as RouteConfig<{ authFlag: boolean; }>[];
  };

  return addFlag(configs);
}

/** 过滤出授权成功的路由 */
export const filterAuthedRoute = (configs: Routes<{ authFlag: boolean; }>) => {

  /** 过滤出没有权限的路由和子集全部没有权限的路由 */
  const filterAuthed = (_configs: RouteConfig<{ authFlag: boolean; }>[]): RouteConfig<{ authFlag: boolean; }>[] => {
    return _configs.map(config => {

      const { authFlag, children } = config;

      if (authFlag && hasChildren(children)) {
        const authedChildren = filterAuthed(children!);
        if (authedChildren.length) {
          return {
            ...config,
            children: authedChildren
          }
        } else {
          return null;
        }
      };

      return authFlag && config;
    }).filter(Boolean) as RouteConfig<{ authFlag: boolean; }>[];
  };

  return filterAuthed(configs);
}
