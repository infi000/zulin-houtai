import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { Alert } from 'antd';

import { conf as passConfig } from 'configs/pass.conf';
import { getQueryString, setCookie } from 'utils/utils';
import { selectError } from 'store/selectors';
import { actions as globalActions } from 'store/globalSlice';
import loginPic from 'static/images/login_pic.svg';

import { loadPassScript } from './sdkMethods';
import { reducer } from './slice';
import { NAMESPACE } from './constants';
import './index.less';

/* eslint-disable */
const HomeLogin = () => {
  useInjectReducer({ key: NAMESPACE, reducer });
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const autoLoginByCasTicket = () => {
    const handler = (isLoading: boolean, successArgs: any, failArgs: any) => {
      if (successArgs) {
        dispatch(globalActions.operateError(null));
        window.location.href = '//' + window.location.host + '/uiResources/homePage';
      }
      if (failArgs) {
        dispatch(globalActions.operateError(failArgs.errmsg || null));
      }
    }
    const casConifg: any = passConfig.casAddress || {};
    const { host } = window.location;
    let type = casConifg[host] ? casConifg[host].type : 'test';
    const redirectUrl = type === 'test' ? 'http://' + host + casConifg.offline.redirectUrl : casConifg[host].redirectUrl;
    const config = {
      redirectUrl,
      autoSetStoken: true,
    };
    if (!(window as any)._PASSICSDK) {
      loadPassScript().then((Sdk) => {
        console.log(Sdk, 'Sdk1');
        Sdk.autoLoginByCasTicket(handler, config);
      });
    } else {
      (window as any)._PASSICSDK.autoLoginByCasTicket(handler, config);
    }
  }

  useEffect(() => {
    setCookie('tblh-platform', passConfig.platformMap);
    if (getQueryString('ticket')) {
      autoLoginByCasTicket();
    // } else {
    //   dispatch(actions.checkSsnPass());
    }
  }, []);

  const handleGotoCas = () => {
    // 重置结束
    const casConifg: any = passConfig.casAddress || {};
    const { host } = window.location;
    const type = casConifg[host] ? casConifg[host].type : 'test';
    const redirectUrl = type === 'test' ? 'http://' + host + casConifg.offline.redirectUrl : casConifg[host].redirectUrl;
    const config = {
      env: type,
      redirectUrl,
    };
    console.log('cas配置：', config);
    if ((window as any)._PASSICSDK && (window as any)._PASSICSDK.jumpToCasLogin){
      window.history.pushState({}, '', window.location.href);
      (window as any)._PASSICSDK.jumpToCasLogin(config);
    }
  }

  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <div>Welcome</div>
        <div>Find more surpises here!</div>
        <div>SF-EXPRESS</div>
      </div>
      <div className='login-page-right'>
        {/* <i className='login-logo'/> */}
        <img className='login-logo' src={loginPic} alt='logo' />
        { error && <Alert style={{ position: 'relative', top: '340px', left: '85px', width: '74%' }} message={error} type="error" /> }
        <div className='card' onClick={handleGotoCas}>
          <div className='main-text'>点击登录</div>
          <div className='sub-text'>请使用丰声扫码登录</div>
          <i className='right-image-decoration-bottom' />
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;

