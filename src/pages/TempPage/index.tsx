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

const HomePageWrapper = (styled as StyledInterface).div`
  height: 100%;
  text-align: center;
  background: #fff;

  .welcome {
    // padding-top: 100px;
    font-size: 16px;
    // height: 33px;
    color: #999999;
    // line-height: 33px;
  }
  img {
    width: 280px;
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
      {/* <img src='https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/yilushunxinhomepage-ch.png' alt='首页-插画' /> */}
      <img style={{ width: '280px' }} src='https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/science/ot-resources/%E6%9A%82%E6%97%A0%E6%95%B0%E6%8D%AE%403x.png' alt='模块建设中' />
      <div style={{ fontSize: '16px', lineHeight: '16px' }} className='welcome'>模块建设中</div>
    </HomePageWrapper>
  );
}

export default compose<React.ComponentClass<{}>>(
  injectIntl,
  withRouter,
)(HomePage);
