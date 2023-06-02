/*
 * @Author: 董方旭
 * @Date: 2021-01-26 10:16:12
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-01-28 15:25:47
 * @Description: 大表单面板包组件
 */
import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  title?: any;
  children?: any;
  rightButton?: any;
  rightButtonText?: string;
  handleClickRightButton?: any;
}
const Container = styled.div`
  width: 100%;
  margin-top: 15px;
  .content {
    padding: 10px;
    border: 1px solid #f0f0f0;
  }
`;

const TitlePanel = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: #eee;
  .right_button {
    color: #E3334D;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const ConfigPanel = (props: IProps) => {
  const { title, rightButtonText, handleClickRightButton, rightButton } = props;
  return (
    <Container>
      <TitlePanel>
        <span>{ title }</span>
        { rightButtonText
          ? <span onClick = { handleClickRightButton } className = 'right_button'>{ rightButtonText }</span> : null }
        {rightButton}
      </TitlePanel>
      <div className = 'content'>
        { props.children }
      </div>
    </Container>
  );
};

export default ConfigPanel;
