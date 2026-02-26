import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { actions, addRelvCard, deleteRelvCard } from '../slice';
import selectors from '../selectors';
import { ITableItem } from '../types';

const { useState, useMemo } = React;

function RelvCardModal() {
  const dispatch = useDispatch();
  const relvCardModal = useSelector(selectors.relvCardModal);
  const tableData = useSelector(selectors.tableData);
  const loading = useSelector(selectors.loading);
  const { visible, mode, cardId } = relvCardModal;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const title = mode === 'add' ? '添加关联卡' : '删除关联卡';

  // 获取当前卡片的已关联卡 ID 列表
  const currentCard = useMemo(() => {
    return (tableData || []).find((item: ITableItem) => item.id === cardId);
  }, [tableData, cardId]);

  const relatedCardIds = useMemo(() => {
    if (!currentCard?.relesalecards) return [];
    return currentCard.relesalecards.map((card: ITableItem) => card.id);
  }, [currentCard]);

  // 根据模式筛选数据源
  const dataSource = useMemo(() => {
    const filtered = (tableData || []).filter((item: ITableItem) => item.id !== cardId);

    // 删除关联卡模式：只显示已关联的卡
    if (mode === 'delete') {
      return filtered.filter((item: ITableItem) => relatedCardIds.includes(item.id));
    }

    // 添加关联卡模式：显示所有卡（排除当前卡）
    return filtered;
  }, [tableData, cardId, mode, relatedCardIds]);

  // 初始化已选项（添加模式预选已关联的卡，删除模式不预选）
  useMemo(() => {
    if (visible && mode === 'add') {
      setSelectedRowKeys(relatedCardIds);
    } else if (visible && mode === 'delete') {
      setSelectedRowKeys([]);
    }
  }, [visible, mode, relatedCardIds]);

  const columns: ColumnsType<ITableItem> = [
    {
      title: '卡片ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '卡片名称',
      dataIndex: 'cardname',
      key: 'cardname',
      width: 150,
    },
    {
      title: '卡片类型',
      dataIndex: 'cardtype',
      key: 'cardtype',
      width: 100,
    },
    {
      title: '卡价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
  ];

  const handleCancel = () => {
    setSelectedRowKeys([]);
    dispatch(actions.updateRelvCardModal({ visible: false, mode: 'add' }));
  };

  const handleOk = () => {
    if (mode === 'delete') {
      // 删除模式：只删除用户选中的卡
      if (selectedRowKeys.length === 0) return;
      const relvcardids = selectedRowKeys.join(',');
      dispatch(deleteRelvCard({ cardid: cardId, relvcardids }));
    } else {
      // 添加模式：只添加新选中的卡（排除已关联的）
      if (selectedRowKeys.length === 0) return;
      const newCardIds = selectedRowKeys.filter(key => !relatedCardIds.includes(key as number));
      if (newCardIds.length === 0) return;
      const relvcardids = newCardIds.join(',');
      dispatch(addRelvCard({ cardid: cardId, relvcardids }));
    }
    setSelectedRowKeys([]);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      okButtonProps={{ disabled: mode === 'add' && selectedRowKeys.length === 0 }}
      destroyOnClose
    >
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="small"
        scroll={{ y: 400 }}
      />
    </Modal>
  );
}

export default RelvCardModal;
