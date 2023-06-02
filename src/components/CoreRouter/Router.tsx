import React from 'react';
import { Switch, Redirect, Route, RouteProps } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import { CosmosRouterProps } from './type';
import { routeContext, flatRoutes, addFlag2Route, filterAuthedRoute } from './utils';
import { LazyComponent } from './components/LazyComponent';
import { LayoutWrapper } from './components/LayoutWrapper';

const { Provider } = routeContext;

export function CosmosRouter<Extend extends Record<string, unknown> = {}, Auth = number>(props: CosmosRouterProps<Extend, Auth>) {
  const {
    routes = [], defaultConfig, lazyLoad, layout,
    checkAuth, catalogFromRoute, hasCheckResult
  } = props;
  const authFlagRoutes = addFlag2Route(routes, checkAuth);

  return (
    <Provider value={{ routes: filterAuthedRoute(authFlagRoutes), defaultConfig }}>
      <CacheSwitch>
        {
          flatRoutes(authFlagRoutes)
            .filter(({ authFlag }) => !hasCheckResult || authFlag)
            .map(route => {
              const {
                path, redirectTo, auth, authFlag, useLayout, fallback,
                catalog, allCatalog, allPath, component, render, isDetail, ...rest
              } = {
                exact: true,
                useLayout: true,
                ...defaultConfig,
                ...route
              };

              // 是否使用布局
              const hasLayout = !!(useLayout && layout);
              // 是否是详情页，详情页支持打开多个
              const multiple = isDetail ? true : false;

              if (!authFlag) {
                return (
                  <CacheRoute
                    multiple
                    cacheKey={() => multiple ? window.location.pathname + window.location.search : allPath}
                    key={allPath}
                    path={isDetail ? `${allPath}/:id` : allPath}
                    {...rest}
                  >
                    {
                      hasLayout ?
                        <LayoutWrapper layout={layout!}>{fallback}</LayoutWrapper> :
                        fallback
                    }
                  </CacheRoute>
                );
              }

              // 重定向
              if (redirectTo) {
                return (
                  <Redirect key={allPath} path={allPath} to={redirectTo} exact />
                );
              }

              // 非自动懒加载组件的情况
              if (component || render) {
                return hasLayout ? (
                  <CacheRoute
                    multiple
                    cacheKey={() => multiple ? window.location.pathname + window.location.search : allPath}
                    key={allPath}
                    path={isDetail ? `${allPath}/:id` : allPath}
                    {...rest}
                  >
                    <LayoutWrapper
                      layout={layout!}
                      component={component}
                      render={render}
                    />
                  </CacheRoute>
                ) : (
                  <CacheRoute
                    multiple
                    cacheKey={() => multiple ? window.location.pathname + window.location.search : allPath}
                    key={allPath}
                    path={isDetail ? `${allPath}/:id` : allPath}
                    {...route}
                  />
                )
              }

              const lazyComp = typeof lazyLoad === 'function' ? (
                <LazyComponent lazyLoad={() => lazyLoad(catalogFromRoute ? allCatalog : catalog!)}
                  fallback={fallback}
                />
              ) : null;

              return (
                <CacheRoute
                  multiple
                  cacheKey={() => multiple ? window.location.pathname + window.location.search : allPath}
                  key={allPath}
                  path={isDetail ? `${allPath}/:id` : allPath}
                  {...rest}
                >
                  {
                    hasLayout ?
                      <LayoutWrapper layout={layout!}>{lazyComp}</LayoutWrapper> :
                      lazyComp
                  }
                </CacheRoute>
              )
            })
        }
      </CacheSwitch>
    </Provider>
  )
};