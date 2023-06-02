/*
 * @Author: 李淳
 * @Date: 2020-06-05 15:02:35
 * @LastEditors: 李淳
 * @LastEditTime: 2020-06-29 21:18:13
 * @Description: file content
 */
import { defineMessages } from 'react-intl';

// 与路由保持一致
export const scope = 'cosmos.app.pages.NotFoundPage';

export default defineMessages({
  notFoundText: {
    id: `${scope}.notFoundText`,
    defaultMessage: '找不到当前路由',
  },
});
