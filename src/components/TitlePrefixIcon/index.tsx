import React from 'react';
import styled from 'styled-components';

const TitlePrefixIcon = styled.span`
  display: inline-block;
  margin-right: 6px;
  width: 4px;
  height: 12px;
  opacity: 1;
  background: #5179E8;
  border-radius: 0px 2px 2px 0px;
`;

interface IProps {
  title: string;
}

export const ModalTitle = (props: IProps) => (
  <>
    <TitlePrefixIcon />
    {props.title}
  </>
);

export default TitlePrefixIcon;
