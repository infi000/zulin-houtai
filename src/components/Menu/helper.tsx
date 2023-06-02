import * as React from 'react';
import { Menu } from 'antd';

import { menuMessages } from 'utils/messages';
import { getQueryString } from 'utils/utils';
import { GLOBAL_MSG_SCOPE } from 'utils/constants';
import { checkAuth } from 'containers/AuthController/checkAuth';
import MenuTitle from './MenuTitle';
import { getFormattedMessages } from '../../i18n';
import { IMenuDataItem } from './types';

const { SubMenu, Item } = Menu;

const MENU_I18N_PREFIX = `${GLOBAL_MSG_SCOPE}.menu`;

function menuNesting(menuConfig: IMenuDataItem[], authList: Auth.Code[]) {
  const items = menuConfig.map(item => {
    if (item.children && item.visibilityChild !== 'hidden') {
      const childrenNodes = menuNesting(item.children, authList);
      if (childrenNodes.filter((node: any) => node).length) { // 若子节点为空，那么父节点不应该显示
        return (
          checkAuth(item.auth!, authList)(
            <SubMenu
              key={item.key}
              title={(
                <MenuTitle
                  icon={item.icon}
                  text={item.text || ''}
                />
              )}
            >
              { childrenNodes }
            </SubMenu>,
          )
        );
      }
      return '';
    }
    return (
      checkAuth(item.auth!, authList)(
        <Item key={item.key} title={item.text}>
          <MenuTitle
            icon={item.icon}
            route={item.route}
            text={item.text || ''}
          />
        </Item>,
      )
    );
  });
  return items;
}

interface IObj {
  [key: string]: any;
}

export function getText(lang: string, key: string, messages = menuMessages) {
  let msg = (messages as any)[key] || key;
  if (messages) {
    msg = (messages as any)[key] || msg;
  }
  if ((key === 'shiftArrange' && window.location.pathname === '/resourceManage/shiftManage/shiftArrange') || (key === 'shiftOverview' && window.location.pathname === '/resourceManage/shiftManage/shiftOverview')) {
    // 排班页面
    return `${getFormattedMessages(lang, `${MENU_I18N_PREFIX}.${key}`, msg)}: ${getQueryString('shopname')}`;
  }

  return getFormattedMessages(lang, `${MENU_I18N_PREFIX}.${key}`, msg);
}

/**
 * 根据语言将menu.conf进行修改，非纯函数，会改变传入参数的值，需要注意；
 * @param {*} menuData
 * @param {*} lang
 */
export function getMenuLangData(lang: string, menuData: IMenuDataItem[], messages?: any): IMenuDataItem[] {
  menuData.forEach(element => {
    const text = getText(lang, element.key, messages);
    // 如若没有，降级到
    // eslint-disable-next-line no-param-reassign
    element.text = text || element.text;
    if (element.children) {
      getMenuLangData(lang, element.children, messages);
    }
  });
  return menuData;
}

export function getMenuMap(menuData: any[]) {
  let obj: IObj = {};
  menuData.forEach(element => {
    obj[element.key] = element.key;
    if (element.children) {
      const subMap = getMenuMap(element.children);
      obj = {
        ...obj,
        ...subMap,
      };
    }
  });
  return obj;
}

export function searchMenu(key: string, menu: any) {
  const result: any[] = [];
  menu.forEach((value: any) => {
    const item = JSON.parse(JSON.stringify(value));
    if (item.text.indexOf(key) > -1) {
      result.push(item);
    } else if (item.children && item.visibilityChild !== 'hidden') {
      const subMenu = searchMenu(key, item.children);
      if (subMenu.length) {
        item.children = subMenu;
        result.push(item);
      }
    }
  });
  return result;
}

export function getOpenKeys(menu: any) {
  let result: any[] = [];
  menu.forEach((item: any) => {
    if (item.children && item.visibilityChild !== 'hidden') {
      result.push(item.key);
      result = result.concat(getOpenKeys(item.children));
    }
  });
  return result;
}

export default menuNesting;
