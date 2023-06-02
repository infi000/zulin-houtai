/*
 * @Author: 李淳
 * @Date: 2020-07-23 11:39:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-24 21:38:16
 * @Description: file content
 */
import styled from 'styled-components';
import { Layout } from 'antd';

export const LayoutWrapper = styled(Layout)`
  height: 100vh;
  overflow: hidden;
  .scroll-content {
    height: 100px;
    flex-grow: 1;
    flex-shrink: 0;
    overflow-y: scroll;
  }
  .main-content-wrap {
    height: 100%;
  }
`;

export const HeaderWrapper = styled(Layout.Header)`
  line-height: 49px !important;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  box-shadow: 4px 5px 12px 0px rgba(0,0,0,0.04);
  z-index: 999;

  .menu-tabs {
    height: 49px;
    flex: 1;
    overflow: hidden;
  }

  .global-action {
    width: 170px;
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-left: 30px;
      cursor: pointer;

      &:first-child {
        margin-left: 0px;
      }
    }

    .ant-radio-group {
      display: block;
    }
  }
`;

export const LogoWrapper = styled.div`
  .header-left {
    width: 100%;
    height: 49px;
    line-height: 49px;
    // text-align: center;
    font-size: 16px;
    font-weight: 500;
    margin-bottom:14px;
    margin-top:14px;
    margin-left:14px;
    .logo {
      height: 50px;
      // margin-top: 10px;
      // margin-left: 20px;
    }

    &.collapsed {
      width: 55px;
      margin-left:10px;
      padding-right: 10px;
      .logoS {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export const MultipleTabsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .tabs {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: auto;
    height: 50px;

    .ant-tabs {
      .ant-tabs-nav {
        margin-bottom: 0;
      }
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      /* color: #424656; */
      font-weight: 500;
      text-shadow: none;
    }
    .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
      border-radius: 4px;
    }
  }
`;

export default {
  LayoutWrapper, HeaderWrapper, LogoWrapper, MultipleTabsWrapper,
};
