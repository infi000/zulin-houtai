/*
 * @Author: 董方旭
 * @Date: 2021-02-24 15:19:41
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-02-24 15:47:59
 * @Description: LoadingSkeleton loading骨架屏
 */
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  .toolbar {
    background-color: white;
    padding:40px 10px 15px;
    height: 250px;
  }
  .tablebar { 
    margin-top: 10px;
    padding: 10px 15px;
    background-color:#fff;
    height: calc(100vh - 280px);
  }
`;

const RowProps = {
  rows: 4,
  style: {
    height: '20px',
  },
};

const ContentRow = {
  rows: 8,
  style: {
    height: '20px',
  },
};

export const LoadingSkeleton = (props: { loading?: boolean; children?: ReactElement }) => {
  if (props.loading === void 0 || props.loading) {
    return (
      <Wrapper>
        <div className = 'toolbar'>
          <Skeleton active paragraph = {RowProps} title = {false}/>
        </div>
        <div className = 'tablebar'>
          <Skeleton active paragraph = {ContentRow}></Skeleton>
        </div>
      </Wrapper>
    );
  }
  return props.children;
};

export default LoadingSkeleton;
