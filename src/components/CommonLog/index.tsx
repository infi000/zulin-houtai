import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { useInjectReducer } from 'utils/redux-injectors';

import globalMessages from 'utils/messages';
import ScrollLoadMoreTable from './ScrollLoadMoreTable';
import { getLogList, actions, reducer } from './slice';
import selectors from './selectors';
import { NAMESPACE, PAGESIZE, SYSCODE } from './constants';

interface IProps extends InjectedIntlProps {
  logId: string | number;
  logType: string; // 表名
  children?: any;
}

const { useState } = React;

function CommonLog(props: IProps) {
  const [visible, setVisible] = useState(false);
  useInjectReducer({ key: NAMESPACE, reducer });
  const dispatch = useDispatch();
  const { intl, logId, logType } = props;
  const limit = useSelector(selectors.limit);
  const logList = useSelector(selectors.logList);
  const hasMore = useSelector(selectors.hasMore);
  const loading = useSelector(selectors.loading);

  // 加载更多
  const handleLoadMore = () => {
    dispatch(actions.updateLimit(limit + PAGESIZE));
    dispatch(actions.updateLoading(true));
    dispatch(getLogList({
      sysCode: SYSCODE,
      tableName: logType,
      id: logId,
      limit,
    }));
  };

  const handleCloseModal = () => {
    // 关闭弹窗时清空store了存储的日志list
    dispatch(actions.updateLogList([]));
    // 重置page为1
    dispatch(actions.updateLimit(PAGESIZE));
    // 重置hasmore
    dispatch(actions.updateHasMore(false));
    setVisible(false);
  };

  const handleOpenModal = () => {
    if (logId) {
      setVisible(true);
      dispatch(actions.updateLoading(true));
      dispatch(getLogList({
        sysCode: SYSCODE,
        tableName: logType,
        id: logId,
        limit: PAGESIZE,
      }));
    }
  };

  return (
    <>
      <Modal
        destroyOnClose
        title='日志'
        centered
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <ScrollLoadMoreTable
          loading={loading}
          dataSource={logList}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </Modal>
      <span onClick={() => handleOpenModal()}>{props.children || intl.formatMessage(globalMessages.log)}</span>
    </>
  );
}

export default injectIntl(CommonLog);
