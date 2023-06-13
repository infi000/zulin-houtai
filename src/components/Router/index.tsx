/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-13 23:55:39
 * @FilePath: /houtai/src/components/Router/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { CacheRoute, CacheSwitch } from 'react-router-cache-route';

import LoadingSkeleton from 'components/LoadingSkeleton';
import ErrorBoundary from 'components/ErrorBoundary';
import NotFoundPage from 'components/NotFoundPage';

import { IMenuDataItem, IMenuItem } from './types';

interface IProps {
  prefix?: string;
  menuData: IMenuDataItem[];
}

/**
 * 对Menu数据进行了加工，将叶子节点及其对应的路由进行了自动生成，用以减少新增模块对路由进行的修改
 * @param {} arr 待遍历数据
 * @param {*} keyPath 关键路径
 */
export function traversMenu(arr: IMenuDataItem[], keyPath: string[] = [], prefix: string | null = null) {
  let leafsArray: IMenuItem[] = [];

  arr.forEach(item => {
    const newKeyPath = keyPath.concat([item.path]);
    if (item.children) {
      if (item.exist) {
        leafsArray.push({
          path: item.route || (prefix ? `/${prefix}/${newKeyPath.join('/')}` : `/${newKeyPath.join('/')}`),
          componentName: item.componentName || `${item.path.substring(0, 1).toUpperCase()}${item.path.substring(1)}`,
          isDetail: !!item.isDetail,
        });
      }
      leafsArray = leafsArray.concat(traversMenu(item.children, [...newKeyPath], prefix));
    } else {
      leafsArray.push({
        path: item.route || (prefix ? `/${prefix}/${newKeyPath.join('/')}` : `/${newKeyPath.join('/')}`),
        componentName: item.componentName || `${item.path.substring(0, 1).toUpperCase()}${item.path.substring(1)}`,
        isDetail: !!item.isDetail,
      });
    }
  });
  return leafsArray;
}

export function getLazyComponent(item: IMenuItem) {
  const comp = React.lazy(() => import(`../../pages/${item.componentName}/index.tsx`).catch(err => {
    console.log(err, item);
    // 如果路径不存在，则降级为首页；
    return import('../../pages/HomePage/index');
  }));
  return comp;
}


export const CoreRoute = (props: IProps) => {
  const makePathToComponent = (menu: IMenuDataItem[]): IMenuItem[] => {
    return traversMenu(menu, [], props.prefix);
  }
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingSkeleton />}>
        <CacheSwitch>
          <CacheRoute
            exact
            path='/'
            key='default'
            className='main-content-wrap'
            component={getLazyComponent(makePathToComponent(props.menuData)[0])}
          />
          {
            makePathToComponent(props.menuData).map((item: IMenuItem) => (
              <CacheRoute
                exact
                cacheKey={item.isDetail ? window.location.pathname + window.location.search : item.path}
                multiple={item.isDetail}
                key={item.path}
                className='main-content-wrap'
                path={item.isDetail ? `${item.path}/:id` : item.path}
                component={getLazyComponent(item)}
              />
            ))
          }
          <CacheRoute path='*' component={NotFoundPage} />
        </CacheSwitch>
      </React.Suspense>
    </ErrorBoundary>
  );
}
// export default class CoreRoute2 extends React.PureComponent<IProps, object> {
//   public makePathToComponent(menu: IMenuDataItem[]): IMenuItem[] {
//     return traversMenu(menu, [], this.props.prefix);
//   }

//   public render() {
//     const { menuData } = this.props;

//     const pathToComponentArr = this.makePathToComponent(menuData);
//     return (
//       <ErrorBoundary>
//         <React.Suspense fallback={<LoadingSkeleton />}>
//           <CacheSwitch>
//             <CacheRoute
//               exact
//               path='/'
//               key='default'
//               className='main-content-wrap'
//               component={getLazyComponent(pathToComponentArr[0])}
//             />
//             {
//               pathToComponentArr.map((item: IMenuItem) => (
//                 <CacheRoute
//                   exact
//                   cacheKey={item.isDetail ? window.location.pathname + window.location.search : item.path}
//                   multiple={item.isDetail}
//                   key={item.path}
//                   className='main-content-wrap'
//                   path={item.isDetail ? `${item.path}/:id` : item.path}
//                   component={getLazyComponent(item)}
//                 />
//               ))
//             }
//             <CacheRoute path='*' component={NotFoundPage} />
//           </CacheSwitch>
//         </React.Suspense>
//       </ErrorBoundary>
//     );
//   }
// }
