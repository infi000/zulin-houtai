import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  route?: string;
  icon?: any;
  text: string;
}

const TitleWrapper = styled.span`
  .ant-menu-item .anticon, .ant-menu-submenu-title .anticon {
    vertical-align: 0;
  }
`;

class MenuTitle extends React.PureComponent<IProps, object> {
  public static displayName = 'MenuTitle';

  public render() {
    const { text, icon } = this.props as IProps;

    return (
      <TitleWrapper>
        { icon || '' }
        <span>{ text }</span>
      </TitleWrapper>
    );
  }
}

export default MenuTitle;
