import React, { useEffect } from 'react';
import { useInjectReducer } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';

import { actions, reducer } from './slice';
import { NAMESPACE, LOGIN_PAGE_URL, PLATFORM_QUERY_CONF } from './constants';

const Logout = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: NAMESPACE, reducer });

  useEffect(() => {
    dispatch(actions.logoutPass());
  }, []);

  const handleGotoLogin = () => {
    window.location.href = LOGIN_PAGE_URL + PLATFORM_QUERY_CONF;
  };

  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <div>Welcome</div>
        <div>Find more surpises here!</div>
        <div>SF-EXPRESS</div>
      </div>
      <div className='login-page-right'>
        <i className='login-logo' />
        <div className='card'>
          <div className='main-text'>LOGOUT...</div>
          <div className='sub-text' onClick={handleGotoLogin}>去登录</div>
          <i className='right-image-decoration-bottom' />
        </div>
      </div>
    </div>
  );
};

export default Logout;
