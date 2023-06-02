/*
 * @Author: 董方旭
 * @Date: 2021-02-01 11:14:47
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-10-21 20:23:11
 * @Description: Homepage
 */
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StyledInterface } from 'styled-components';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import styled from 'utils/styled-px2vw';

import messages from './messages';

const HomePageWrapper = (styled as StyledInterface).div`
  height: 100%;
  text-align: center;
  background: #fff;

  .welcome {
    padding-top: 100px;
    font-size: 24px;
    height: 1.5625vw;
    color: #333;
  }
  img {
    width: 375px;
    margin-top: 100px;
  }
  .sub {
    line-height: 18px;
    font-size: 13px;
    font-weight: 400;
    color: #C3C3C3;
    padding-top: 40px;
  } 
`;

function HomePage(props: InjectedIntlProps) {
  const { intl } = props;
  return (
    <HomePageWrapper>
      <div className='welcome'>{intl.formatMessage(messages.welcome)}</div>
      {/* <div className='sub'>Welcome to the operation platform of medical face-to-face customer system</div> */}
      <img src='https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/yilushunxinhomepage-ch.png' alt='首页-插画' />
    </HomePageWrapper>
  );
}

export default compose<React.ComponentClass<{}>>(
  injectIntl,
  withRouter,
)(HomePage);
