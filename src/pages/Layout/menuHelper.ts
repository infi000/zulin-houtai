/*
 * @Author: 董方旭
 * @Date: 2021-03-19 14:50:34
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-03-19 16:47:30
 * @Description: menu utils helper
 */
import { IMenuDataItem } from 'components/Router/types';
import { menuMessages } from 'utils/messages';
import { GLOBAL_MSG_SCOPE } from 'utils/constants';
import { getFormattedMessages } from '../../i18n';

const MENU_I18N_PREFIX = `${GLOBAL_MSG_SCOPE}.menu`;

export function getText(lang: string, key: string, messages = menuMessages) {
  let msg = (messages as any)[key] || key;
  if (messages) {
    msg = (messages as any)[key] || msg;
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
