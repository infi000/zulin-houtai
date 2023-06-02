/*
 * @Author: 董方旭
 * @Date: 2021-02-23 14:31:53
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-03-05 11:24:44
 * @Description: ErrorBoundary
 */
import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { longanDispatchError } from 'longan-sdk';

const ErrorBox = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error_icon {
    font-size: 100px;
    margin-bottom: 20px;
  }
  .refresh_btn {
    margin-left: 10px;
  }
`;

export interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<object, IState> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public componentDidCatch(error: any, info: any) {
    // 错误上报 longan自动收集
    console.log(error, info);
    try {
      longanDispatchError({
        error_message: error.toString(),
        error_content: error.stack,
        error_level: '0',
        error_tag: 'error_boundary',
      });
    } catch (err) {
      console.log(err);
    }
  }

  public handleClick() {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBox>
          <ExclamationCircleOutlined className='error_icon' type='exclamation-circle' />
          <h1>抱歉，系统暂时异常，请稍后再试。</h1>
          <h1>
            您可以尝试
            <Button className='refresh_btn' type='primary' size='small' onClick={this.handleClick}>
              刷新
            </Button>
          </h1>
          <h1>若始终无法正常访问，请联系项目支持人员，感谢配合~</h1>
        </ErrorBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
