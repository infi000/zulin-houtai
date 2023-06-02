/*
 * @Author: 董方旭
 * @Date: 2021-02-23 14:31:53
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-03-30 16:03:42
 * @Description: 菜单
 */
import React, { memo, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

// import IconFont from 'components/IconFont';
import { selectLoginUserFunctionAuth, selectCachingKeys, selectActiveCacheKey } from 'store/selectors';
import { filterAuthedRoute, concatPath, hasChildren, addFlag2Route } from 'components/CoreRouter';
import { RouteConfig } from 'configs/router.conf';
import routeConfig from 'configs/dev.router.conf';
import { menuMessages } from 'utils/messages';
import { actions } from 'store/globalSlice';

// const SearchMenuBox = styled.div`
//   text-align: center;
//   input {
//     border: none;
//   }
// `;

const validMenuItem = ({ path, hidden }: RouteConfig) => path && !path.match(/:/) && !hidden;

const isStaticPath = ({ path, hidden }: RouteConfig) => !path.match(/:/) && !hidden;

const formatMenuItem = (intl: InjectedIntl, configs: RouteConfig[], parentPath = '') => configs.filter(validMenuItem)
  .map(({ path, children, exist, icon, redirectTo }) => {
    const text = intl.formatMessage((menuMessages as any)[path]);
    const allPath = redirectTo || concatPath(parentPath, path);

    if (hasChildren(children)) {
      const staticChildren = children.filter(isStaticPath);
      if (staticChildren.length) {
        return (
          <Menu.SubMenu
            key={path}
            title={exist ? <Link to={allPath}>{text}</Link> : text}
            icon={icon}
          >
            {formatMenuItem(intl, staticChildren, allPath)}
          </Menu.SubMenu>
        );
      }
    }
    return (
      <Menu.Item
        key={allPath}
        title={text}
        icon={icon}
      >
        {
          redirectTo ? <a href={redirectTo} target='_blank' rel='noopener noreferrer'> {text}</a> : <Link to={allPath}>{text}</Link>
        }
      </Menu.Item>
    );
  });

const CustomMenu = memo((props: InjectedIntlProps) => {
  const { intl } = props;
  const dispatch = useDispatch();
  const authList = useSelector(selectLoginUserFunctionAuth);
  const cachingKeys = useSelector(selectCachingKeys);
  const activeCacheKey = useSelector(selectActiveCacheKey);

  // eslint-disable-next-line
  const checkAuth = (item: any) => (authList || []).indexOf(`${item.auth}`) !== -1;
  const authFlagRoutes = addFlag2Route(routeConfig, checkAuth);
  const routes = filterAuthedRoute(authFlagRoutes);
  const rootSubmenuKeys = routes.filter(item => !!item.children && !item.exist).map(filterItem => filterItem.path);

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const endIndex = activeCacheKey.indexOf('/:');
    setOpenKeys(activeCacheKey.split('/').slice(1));
    if (endIndex === -1) {
      // 不是详情页面
      setSelectedKeys([activeCacheKey]);
    } else {
      // 详情页面
      const key = activeCacheKey.slice(0, endIndex);
      const selectedMenuIndex = key.lastIndexOf('/');
      const selectedMenu = key.slice(0, selectedMenuIndex);
      setSelectedKeys([selectedMenu]);
    }
    // 触发resize事件
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }, [activeCacheKey]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // eslint-disable-next-line
  const onClick = (menuItem: any) => {
    const { key } = menuItem;
    const endIndex = key.indexOf('/:');
    setOpenKeys(key.split('/').slice(1));
    setSelectedKeys([endIndex === -1 ? key : key.slice(0, endIndex)]);
    if (!cachingKeys.includes(key)) {
      dispatch(actions.updateCachingKeys([...cachingKeys, key]));
    }
    if (activeCacheKey !== key) {
      dispatch(actions.updateActiveCacheKey(key));
    }
  };

  return (
    <div>
      {/* <SearchMenuBox>
        <Input.Search />
      </SearchMenuBox> */}
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
      >
        {formatMenuItem(intl, routes, 'uiResources')}
      </Menu>
    </div>
  );
});

export default injectIntl(CustomMenu);
