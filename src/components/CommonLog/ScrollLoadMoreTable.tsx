import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import throttle from 'lodash/throttle';

import globalMessages from 'utils/messages';

import { ILogItem } from './types';
import messages from './messages';

const { useRef } = React;

interface IProps extends InjectedIntlProps {
  loading: boolean;
  dataSource: ILogItem[];
  onLoadMore: () => void;
  hasMore: boolean;
}

function ScrollLoadMoreTable(props: IProps) {
  const { intl, loading, dataSource, onLoadMore, hasMore } = props;
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const tbodyRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback((e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight) {
      // 加载更多的按钮出现
      setShowLoadMoreBtn(true);
    } else {
      setShowLoadMoreBtn(false);
    }
  }, []);

  useEffect(() => {
    tbodyRef.current = document.querySelector('.scroll-table .ant-table-body');

    const throttleScroll = throttle(onScroll, 150);

    tbodyRef.current && tbodyRef.current.addEventListener('scroll', throttleScroll);
    return () => {
      setShowLoadMoreBtn(false);
      tbodyRef.current && tbodyRef.current.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  const columns: ColumnsType<ILogItem> = [
    {
      title: intl.formatMessage(globalMessages.index),
      width: 60,
      key: 'index',
      render: (_, _row: ILogItem, index: number) => index + 1,
    },
    {
      title: intl.formatMessage(messages.eventTypeName),
      key: 'eventTypeName',
      dataIndex: 'eventTypeName',
      width: 100,
    },
    {
      title: intl.formatMessage(messages.operator_content),
      key: 'changeDesc',
      dataIndex: 'changeDesc',
      width: 300,
    },
    {
      title: intl.formatMessage(messages.operator),
      key: 'updateUserName',
      dataIndex: 'updateUserName',
      width: 130,
    },
    {
      title: intl.formatMessage(messages.operator_time),
      key: 'updateTime',
      dataIndex: 'updateTime',
      width: 150,
    },
  ];

  return (
    <>
      <Table
        bordered
        className='scroll-table'
        loading={loading}
        scroll={{ y: 540, scrollToFirstRowOnChange: true }}
        dataSource={dataSource || []}
        columns={columns}
        rowKey={(_record: ILogItem, index: number) => index}
        pagination={false}
      />
      {showLoadMoreBtn ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          {
            hasMore ? (
              <Button onClick={onLoadMore}>
                {intl.formatMessage(messages.loadMore)}
              </Button>
            ) : <span>{intl.formatMessage(messages.loadAll)}</span>
          }
        </div>
      ) : null}
    </>
  );
}

export default injectIntl(ScrollLoadMoreTable);
