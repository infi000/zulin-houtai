import { conf as passConfig } from 'configs/pass.conf';
import { PROMISE_REJECT } from './constants';

import { PLATFORM_CONF } from 'pages/Login/constants';

export function loadPassScript() {
  const projectEnv = process.env.PROJECT_ENV || '';
  const { hostname } = window.location;
  let address = `http://passic.sftcwl.com/sdk/passicsdk.js?platform=${PLATFORM_CONF}`;
  if (projectEnv === 'online' && passConfig.onlineAddress) {
    address = `${passConfig.onlineAddress}?platform=${PLATFORM_CONF}`;
  }
  if (projectEnv === 'uat' && passConfig.uatAddress) {
    address = `${passConfig.uatAddress}?platform=${PLATFORM_CONF}`;
  }
  if (passConfig.envAddress && passConfig.envAddress[hostname]) {
    address = `${passConfig.envAddress[hostname]}?platform=${PLATFORM_CONF}`;
  }
  // buac测试用 //mock
  const scriptDom = document.createElement('script');
  scriptDom.setAttribute('src', address);
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    if (!window._PASSICSDK) {
      document.getElementsByTagName('head')[0].appendChild(scriptDom);
      scriptDom.onload = () => {
        // eslint-disable-next-line
        resolve(window._PASSICSDK);
      };
      scriptDom.onerror = reject;
    }
  });
}


let PASSICSDK = null;
let loadPromise = null;
// eslint-disable-next-line
if (!window._PASSICSDK) {
  loadPromise = loadPassScript().then((Sdk) => {
    PASSICSDK = Sdk;
    return Sdk;
  });
} else {
  // eslint-disable-next-line
  PASSICSDK = window._PASSICSDK;
}

function getSdkPromise() {
  // eslint-disable-next-line
  if(PASSICSDK){
    // eslint-disable-next-line
    return Promise.resolve(PASSICSDK);
  }
  if (loadPromise) {
    return loadPromise;
  }
  return loadPassScript().then((Sdk) => {
    PASSICSDK = Sdk;
    return Sdk;
  });
}

// 退出登录
export function logoutPromise() {
  return new Promise((resolve, reject) => {
    try {
      const successCallback = (args) => {
        resolve({
          type: 'success',
          data: args,
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args,
        });
      };
      const casConifg = passConfig.casAddress || {};
      const { host } = window.location;
      const type = casConifg[host] ? casConifg[host].type : 'test';
      const redirectUrl = type === 'test' ? 'http://' + host + casConifg.offline.redirectUrl : casConifg[host].redirectUrl;
      const config = {
        env: type,
        redirectUrl,
        // isLogoutBuac: true, // 退出B端
        isLogoutCas: true, // 退出Cas
      };
      getSdkPromise().then(PASSICSDK => {
        PASSICSDK.logoutWithBuac(successCallback, failCallback, config, true);
      });
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}

// 获取用户登录状态
export function checkSsnPromise() {
  return new Promise((resolve, reject) => {
    try {
      const validSessionCallback = (args) => {
        resolve({
          type: 'valid',
          data: args,
        });
      };
      const inValidSessionCallback = (args) => {
        resolve({
          type: 'fail',
          data: args,
        });
      };
      const failCallback = (args) => {
        resolve({
          type: 'fail',
          data: args,
        });
      };
      getSdkPromise().then(PASSICSDK => {
        PASSICSDK.checkSsn(validSessionCallback, inValidSessionCallback, failCallback);
      });
    } catch (e) {
      reject({
        type: PROMISE_REJECT,
        data: e,
      });
    }
  });
}