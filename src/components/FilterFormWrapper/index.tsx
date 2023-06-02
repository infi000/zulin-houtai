/*
 * @Author: liqingqing
 * @Date: 2021-01-25 10:16:12
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-25 17:50:30
 * @Description: 表格筛选表单样式
 */
import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Button, Col } from 'antd';
import { ColProps } from 'antd/es/col';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import globalMessages from 'utils/messages';
import messages from './messages';

const Wrapper = styled.div`
  padding: 16px 16px 0;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 3px 7px 1px rgba(111,118,129,0.10); 
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;

  .expand-container {
    height: 30px;
    line-height: 30px;
    width: 45px;
    margin-left: 20px;
    margin-right: 0;
    cursor: pointer;
  }
`;

const { useState, useMemo } = React;
// const DEFAULT_ROW_SPAN = 24;

interface IProps extends InjectedIntlProps {
  children: React.ReactNode;
  onSearch: () => void;
  onReset?: () => void;
  // eslint-disable-next-line
  searchButton?: any;
  isShowResetButton?: boolean;
  // defaultShowRows?: number; // TODO 目前还不支持传行数
  defaultShowColsNumber?: number;
}

function FilterFormWrapper(props: IProps) {
  const { intl, isShowResetButton = true, searchButton, defaultShowColsNumber = 3 } = props;
  const [collapsed, setCollapsed] = useState(true);
  let totalSpan = 0;

  const handleSearch = () => {
    props.onSearch();
  };
  const handleReset = () => {
    if (props.onReset) {
      props.onReset();
    }
  };

  const handleExpandClick = () => {
    setCollapsed(!collapsed);
    // 触发resize事件
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  };

  // 获取所有的col
  const colsNodeNumber = useMemo(() => {
    let result: React.ReactNode[];
    // eslint-disable-next-line
    React.Children.forEach(props.children, (child: any) => {
      if (child.props.form) {
        const rowNode = React.Children.only(child.props.children);
        if (rowNode) {
          const colArr = React.Children.toArray(rowNode.props.children);
          result = colArr.filter((item: React.Component<ColProps>) => item);
        }
      }
    });
    return result.length;
  }, [props.children]);

  // 根据collapsed 和 defaultShowColsNumber操作col，使其隐藏或者显示
  const colsDoms = React.Children.map(props.children,
    // eslint-disable-next-line
    (form: any) => React.Children.map(form.props.children,
      // eslint-disable-next-line
      (row: any) => React.Children.map(row.props.children, (col: any, index: number) => {
        if (!col) return col;
        if (collapsed && index >= defaultShowColsNumber) {
          return React.cloneElement(col, {
            style: { display: 'none' },
          });
        }
        const colSpan = (col && Number((col as any).props.span)) || 6;
        if (24 - (totalSpan % 24) < colSpan) {
          // 如果当前行空余位置放不下，那么折行
          totalSpan += 24 - (totalSpan % 24);
        }
        totalSpan += colSpan;
        return col;
      }),
    ),
  );

  // 把Cols塞到Row中
  const rowDoms = React.Children.map(props.children,
    // eslint-disable-next-line
    (form: any) => React.Children.map(form.props.children,
      // eslint-disable-next-line
      (row: any) => React.cloneElement(row, {
        children: colsDoms.concat((
          <Col
            span={6}
            offset={24 - 6 - (totalSpan % 24)}
          >
            <ButtonsWrapper>
              { isShowResetButton ? (<Button style={{ marginRight: '10px' }} onClick={handleReset}>{intl.formatMessage(globalMessages.reset)}</Button>) : null }
              { searchButton || (
                props.onSearch ? (<Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>{intl.formatMessage(globalMessages.search)}</Button>) : ''
              )}
              {
                defaultShowColsNumber < colsNodeNumber ? (
                  <div className='expand-container' onClick={handleExpandClick}>
                    {
                      collapsed ? (
                        <>
                          {intl.formatMessage(messages.expand)}
                          <DownOutlined
                            style={{
                              marginLeft: '0.5em',
                              transition: '0.3s all',
                              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          {intl.formatMessage(messages.collapsed)}
                          <DownOutlined
                            style={{
                              marginLeft: '0.5em',
                              transition: '0.3s all',
                              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
                            }}
                          />
                        </>
                      )
                    }
                  </div>
                ) : null
              }
            </ButtonsWrapper>
          </Col>
        )),
      }),
    ));
  // 把Row塞到form里
  const doms = React.Children.map(props.children,
    // eslint-disable-next-line
    (form: any) => React.cloneElement(form, {
      children: rowDoms,
    }),
  );

  return (
    <Wrapper>
      {
        doms
      }
    </Wrapper>
  );
}

export default injectIntl(FilterFormWrapper);
