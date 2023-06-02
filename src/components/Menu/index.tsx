import * as React from 'react';
import { Menu, Input } from 'antd';
import styled from 'styled-components';
import menuNesting, { searchMenu, getOpenKeys, getMenuLangData, getMenuMap } from './helper';
import { ISofaMenuProps } from './types';

const MenuWrapper = styled.div`
  .ant-menu-item .anticon, .ant-menu-submenu-title .anticon,
  .ant-menu-inline-collapsed > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
    font-size: 20px;
    vertical-align: 0;
  }
`;
const SearchMenuBox = styled.div`
  text-align: center;
  input {
    border: none;
  }
`;

const { Search } = Input;
const { useState, useEffect } = React;

function SofaMenu(props: ISofaMenuProps) {
  const { menuData, authList, collapsed, routePrefix, path, onClick, search, ...others } = props;
  const [selectedKeys, setSelectedKeys]: [string[], (keys: string[]) => any] = useState([]);
  const [openKeys, setOpenKeys]: [string[], (keys: string[]) => any] = useState([]);
  const [innerMenuData, setInnerMenuData] = useState(menuData);
  const [searching, setSearching] = useState(false);

  function syncPath(withOpenKeys = true) {
    if (path && (path !== '/' && path !== '/homePage')) {
      const pathArray = path.split('/').filter(Boolean);
      if (withOpenKeys && !collapsed) { // 这样虽然会存在无效的key，但是避免了详情页面无法高亮的问题
        // setOpenKeys(pathArray.slice(0, pathArray.length - 1));
        setOpenKeys(pathArray);
      }
      // setSelectedKeys(pathArray.slice(-1));
      setSelectedKeys(pathArray);
    } else {
      if (withOpenKeys) {
        setOpenKeys([]);
      }
      setSelectedKeys(['homePage']);
    }
  }

  useEffect(() => {
    if (collapsed) {
      setOpenKeys([]);
      syncPath(!searching);
    } else {
      syncPath(!searching);
    }
  }, [path, collapsed]);

  function handleClick({ key = '', keyPath = [''], item = {} }) {
    // eslint-disable-next-line
    const path = [...keyPath];
    path.reverse();
    const pathname = routePrefix ? `/${routePrefix}/${path.join('/')}` : `/${path.join('/')}`;

    const params = {
      key,
      keyPath,
      title: (item as any).props ? (item as any).props.title : key,
    };
    // 判断是否显式提供了路由
    if ((item as any).props.children
      && (item as any).props.children.props
      && (item as any).props.children.props.route) {
      const { route } = (item as any).props.children.props;
      onClick(route.replace(/:key/, key), params);
    } else {
      onClick(pathname, params);
    }
  }

  function handleOpenChange(keys: string[]) {
    setOpenKeys(keys);
  }

  function handleSearch(value: string) {
    if (value) {
      const textMenu = menuData;
      const searchResult = searchMenu(value, textMenu);
      const searchKeys = getOpenKeys(searchResult);
      setInnerMenuData(searchResult);
      setOpenKeys(searchKeys);
      setSearching(true);
    } else {
      setInnerMenuData(menuData);
      syncPath();
      setSearching(false);
    }
  }

  return (
    <MenuWrapper>
      { !collapsed && search !== false && (
        <SearchMenuBox>
          <Search
            onSearch={handleSearch}
            style={{ width: '90%' }}
          />
        </SearchMenuBox>
      ) }
      <Menu
        className="ant-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={selectedKeys}
        openKeys={openKeys}
        defaultOpenKeys={openKeys}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
        {...others}
      >
        { menuNesting(innerMenuData, authList) }
      </Menu>
    </MenuWrapper>
  );
}

export default SofaMenu;

export { getMenuLangData, getMenuMap };
