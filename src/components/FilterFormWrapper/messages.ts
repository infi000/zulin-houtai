/*
 * @Author: your name
 * @Date: 2021-02-26 14:51:26
 * @LastEditTime: 2021-02-26 15:15:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/FilterFormWrapper/messages.ts
 */
import { defineMessages } from 'react-intl';
const NAMESPACE = 'FILTERFORMWRAPPER';

// 与路由保持一致
export const scope = `cosmos.src.components.${NAMESPACE}`;

export default defineMessages({
  collapsed: {
    id: `${scope}.collapsed`,
    defaultMessage: '收起',
  },
  expand: {
    id: `${scope}.collapsed`,
    defaultMessage: '展开',
  },
});
