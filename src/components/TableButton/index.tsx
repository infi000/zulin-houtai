/*
 * @Author: 董方旭
 * @Date: 2021-01-25 12:16:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-13 11:35:06
 * @Description: TableButton 用于表格操作列的按钮
 */
import * as React from 'react';
import styled from 'styled-components';
import { Popconfirm } from 'antd';
import globalMessages from 'utils/messages';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import useDebounceBefore from 'hooks/useDebounce';

const Wrapper = styled.div`
  display: inline-block;
  margin: 0 8px 0 0px;
`;

const A = styled.a`
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-weight: 500;
  font-size: 12px;
  color: #5179E8;;

  &:active {
    color: #0069d9;
  }
`;

interface IProps extends InjectedIntlProps {
  onClick?: () => void;
  children: any;
  isWrapperConfirm?: boolean;
}

const { useState } = React;

function Button(props: IProps) {
  const { isWrapperConfirm = false, intl } = props;
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const confirm = () => {
    setConfirmVisible(false);
    onClick();
  };

  const handleVisibleChange = (visible: boolean) => {
    if (!visible) {
      setConfirmVisible(visible);
      return;
    }
    if (isWrapperConfirm) {
      setConfirmVisible(visible); // show the popconfirm
    } else {
      confirm(); // next step
    }
  };

  return (
    <Popconfirm
      title={intl.formatMessage(globalMessages.popConfirmTip)}
      visible={confirmVisible}
      onVisibleChange={handleVisibleChange}
      onConfirm={useDebounceBefore(confirm)}
      onCancel={() => setConfirmVisible(false)}
      okText={intl.formatMessage(globalMessages.ok)}
      cancelText={intl.formatMessage(globalMessages.cancel)}
    >
      <Wrapper className="table-button">
        <A>
          {React.Children.toArray(props.children)}
        </A>
      </Wrapper>
    </Popconfirm>
  );
}

export default injectIntl(Button);
