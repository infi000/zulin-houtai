/*
 * @Author: 李淳
 * @Date: 2020-06-05 15:02:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-05 15:12:57
 * @Description: file content
 */
import { defineMessages } from 'react-intl';

// 与路由保持一致
export const scope = 'cosmos.app.pages.HomePage';

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: '欢迎使用供应链资源平台系统运营',
  },
  copyright: {
    id: `${scope}.copyright`,
    defaultMessage: '供应链科技中心',
  },
});
