import * as React from 'react';
import { Layout as AntdLayout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CacheRoute } from 'react-router-cache-route';

import { selectLayout, selectCurrentLanguage } from 'store/selectors';
import { actions } from 'store/globalSlice';
import CoreRoute from 'components/Router';
import { menuMessages } from 'utils/messages';
import menuConfig from 'configs/dev.router.conf';
import Login from 'pages/Login';
import Logout from 'pages/Login/logout';
import { conf } from 'configs/pass.conf';
import { setCookie } from 'utils/utils';

import Menu from './components/Menu';
import Logo from './components/Logo';
import { LayoutWrapper } from './components/Wrappers';
import HeaderBar from './modules/HeaderBar';
import { getMenuLangData } from './menuHelper';

const { Content, Sider } = AntdLayout;
const { useEffect } = React;

function Layout() {
  const dispatch = useDispatch();
  const layout = useSelector(selectLayout);
  const lang = useSelector(selectCurrentLanguage);
  const menuData = getMenuLangData(lang, menuConfig, menuMessages);

  // 全局数据初始化
  useEffect(() => {
    dispatch(actions.initGlobalData());
    setCookie('tblh-platform', conf.platformMap);
  }, []);

  const handleCollapse = (collapse: boolean) => {
    dispatch(actions.updateLayoutCollapsed(collapse));
  };

  switch (window.location.pathname) {
    case conf.uri.login:
      return <CacheRoute path='/uiResources/pass/login' key='login' component={Login} />;
    case conf.uri.logout:
      return <CacheRoute path='/uiResources/pass/logout' key='login' component={Logout} />;
    default:
      return (
        <LayoutWrapper>
          <Sider
            collapsible
            width={200}
            collapsedWidth={50}
            collapsed={layout.collapsed}
            onCollapse={handleCollapse}
            trigger={layout.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          >
            <Logo collapsed={layout.collapsed} />
            <Menu />
          </Sider>
          <AntdLayout>
            <HeaderBar />
            <Content style={{ flex: 1 }}>
              <div style={{ height: '100%' }}>
                <CoreRoute menuData={menuData} prefix='uiResources' />
              </div>
            </Content>
          </AntdLayout>
        </LayoutWrapper>
      );
  }
}

export default Layout;
