/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-09 00:17:16
 * @FilePath: /houtai/src/configs/pass.conf.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCookie } from 'utils/utils';

const PLATFORM_COOKIE = 'tblh-platform';

export const conf = {
  enable: true,
  uri: {
    login: '/uiResources/pass/login',
    logout: '/uiResources/pass/logout',
  },
  platformMap: 'TS-RESOURCES|MTA0OA',
  onlineAddress: 'https://passportic-online.sf-express.com/sdk/passicsdk.js',
  uatAddress: 'https://uat-pass.sf-express.com/sdk/passicsdk.js',
  casAddress: {
    'ts-rmp.sf-express.com': {
      type: 'online',
      redirectUrl: 'https://ts-rmp.sf-express.com/uiResources/pass/login',
    },
    'tsic.sftcwl.com.cn': {
      type: 'uat',
      redirectUrl: 'https://tsic.sftcwl.com.cn/uiResources/pass/login',
    },
    'offline': {
      type: 'test',
      redirectUrl: '/uiResources/pass/login',
    },
  },
  browserRouterPrefix: '/uiResources/pass',
};

export const gotoPass = (type) => {
  if (conf.enable && conf.uri[type]) {
    const platform = getCookie(PLATFORM_COOKIE) || conf.platformMap;
    window.location.href = `${conf.uri[type]}`;
    window.location.href = `${conf.uri[type]}`;
  }
};
