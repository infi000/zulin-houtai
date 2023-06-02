import * as React from 'react';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ErrorBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface IState {
  hasError: boolean;
}

class ErrorBoundaryArea extends React.Component<object, IState> {
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
    // 错误上报
    console.log(error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBox>
          <ExclamationCircleOutlined />
          <p>模块暂无响应</p>
        </ErrorBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryArea;
