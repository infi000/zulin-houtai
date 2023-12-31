/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-09-06 23:12:27
 * @FilePath: /houtai/src/pages/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
import WordApp from 'pages/WordApp';
import Signature from 'pages/Signature';
import WordAppParent from 'pages/WordAppParent';
import SignatureParent from 'pages/SignatureParent';
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
    case '/uiResources/blank/wordApp':
      return <CacheRoute path='/uiResources/blank/wordApp' key='wordApp' component={WordApp} />;
    case '/uiResources/blank/signature':
      return <CacheRoute path='/uiResources/blank/signature' key='signature' component={Signature} />;
    case '/uiResources/blank/signatureParent':
      return <CacheRoute path='/uiResources/blank/signatureParent' key='signatureParent' component={SignatureParent} />;
    case '/uiResources/blank/wordAppParent':
      return <CacheRoute path='/uiResources/blank/wordAppParent' key='wordAppParent' component={WordAppParent} />;
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
