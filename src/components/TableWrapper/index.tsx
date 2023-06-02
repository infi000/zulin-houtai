/* eslint-disable react/sort-comp */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import styled from 'styled-components';
import { Divider } from 'antd';

import TitlePrefixIcon from 'components/TitlePrefixIcon';

interface IProps extends InjectedIntlProps {
  // eslint-disable-next-line
  children: any;
  height?: number;
  title?: string | React.ReactNode;
  // eslint-disable-next-line
  btns?: any;
  tabs?: React.ReactNode;
  desc?: React.ReactNode;
  isShowTitlePrefixIcon?: boolean;
  wrapClassName?: 'no-padding';
}

interface IState {
  height: number;
}

const Wrapper = styled.div`
  &.no-padding {
    padding: 0;
    .header-container {
      margin-bottom: 0;
    }
  }
  flex: 1;
  padding: 15px 20px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10);

  .header-container {
    height: 30px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    .header-left {
      flex: 1;
      font-size: 15px;
      font-weight: 500;
      text-align: left;
      color: #424656;
      line-height: 30px;
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > button.ant-btn {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }

  }
  // 去掉ant tabs的margin-bottom
  .ant-tabs-top > .ant-tabs-nav {
    margin-bottom: 0;
  }
  .ant-table-cell {
    .ant-tag {
      margin-bottom:8px;
      border: none;
      background: #F5F5F5;
    }
    .ant-tag-primary{
      background-color: #ebf7ff;
      color: #3355FF;
      border-radius: 4px;
    }
  }
`;
class TableWrapper extends React.Component<IProps, IState> {
  // eslint-disable-next-line
  public refDom: any = null;

  public x: number | null = null;

  public top = 0;

  public state = {
    height: 300,
  };

  public componentDidMount() {
    this.resetHeight();
    window.addEventListener('resize', this.resetHeight);
  }

  public componentWillReceiveProps() {
    if (this.refDom) {
      const $tableContainer = ReactDom.findDOMNode(this.refDom);
      // eslint-disable-next-line
      if ($tableContainer && ($tableContainer as any).offsetTop !== this.top) {
        this.resetHeight();
      }
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resetHeight);
  }

  public resetHeight = () => {
    const $table = this.refDom.getElementsByClassName('ant-table')[0];
    if (this.props.height) {
      $table.setAttribute('style', `height: ${this.props.height - 45}px`);
      return;
    }
    const innerHeight = document.body.offsetHeight;
    const $tableContainer = ReactDom.findDOMNode(this.refDom);
    if (!$tableContainer) {
      return;
    }
    // eslint-disable-next-line
    this.top = ($tableContainer as any).offsetTop;
    const height = innerHeight - this.top - 30;

    // 这里的作用仅剩下使分页置底
    $table.setAttribute('style', `height: ${height - 45}px`);

    this.setState({
      height,
    });
  }

  // eslint-disable-next-line
  public getX(columns: any[]) {
    if (this.x) {
      return this.x;
    }
    this.x = (columns || []).reduce((total, item) => {
      const width = item.width || 250;
      // eslint-disable-next-line no-param-reassign
      item.width = width;
      // eslint-disable-next-line no-param-reassign
      total += width;
      return total;
    }, 0);

    // 预留20 buffer
    this.x = (this.x || 0) + 20;
    return this.x;
  }

  public getScroll(
    scroll: {
      x: number;
      y: number;
    },
    // eslint-disable-next-line
    columns: any[],
  ) {
    const { height } = this.state;
    const propsHeight = this.props.height;
    // 当设置了scroll的值时，直接使用设置值，若只设置了x，则自动设置y;
    if (scroll && scroll.x) {
      if (scroll.y) {
        return scroll;
      }
      return { x: scroll.x, y: propsHeight ? propsHeight - 80 : height - 80 };
    }
    return { x: this.getX(columns), y: propsHeight ? propsHeight - 80 : height - 80 };
  }

  public render() {
    const { height } = this.state;
    const propsHeight = this.props.height;
    const { isShowTitlePrefixIcon = false } = this.props;

    return (
      <Wrapper className={this.props.wrapClassName}>
        <div className='header-container' style = {(this.props?.title || this.props?.btns) ? {} : { height: 0 }}>
          <div className='header-left'>
            {
              isShowTitlePrefixIcon ? <TitlePrefixIcon /> : null
            }
            {this.props.title || ''}
          </div>
          <div className='header-right'>
            {this.props?.desc}
            {this.props?.btns}
          </div>
        </div>
        <Divider style={{ margin:'16px 0' }} />
        {this.props?.tabs}
        <div
          className="table-container"
          style = {{ height: propsHeight || height }}
          ref = { ref => { this.refDom = ref; } }
        >
          {
            React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
              key: index,
              scroll: this.getScroll(child.props.scroll, child.props.columns),
            }))
          }
        </div>
      </Wrapper>
    );
  }
}

export default injectIntl(TableWrapper);
