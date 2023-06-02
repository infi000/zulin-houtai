/*
 * @Author: liqingqing
 * @Date: 2021-02-01 14:11:11
 * @LastEditTime: 2021-03-24 20:21:54
 * @LastEditors: Please set LastEditors
 * @Description: 可排序表格
 * @FilePath: /janus/src/components/TableHeaderConfModal/dragTable.tsx
 */
import * as React from 'react';
import { Table } from 'antd';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import globMessages from 'utils/messages';
import TableButton from 'components/TableButton';
import TableWrapper from 'components/TableWrapper';
import { IFieldItem } from './types';
import messages from './messages';
import './dragTable.css';

const SortableItem = SortableElement(({ style, ...otherProps }: {style: React.CSSProperties}) => {
  const newStyle = { ...style, cursor: 'move' };
  return <tr {...otherProps} style={newStyle} />;
});
const NewSortableContainer = SortableContainer((props: any) => <tbody {...props} />);

interface IProps extends InjectedIntlProps {
  tableData: IFieldItem[];
  handleDrag: (list: IFieldItem[], key?: string) => void; // 移除行的回调
}

function DragTable(props: IProps) {
  const { intl, tableData } = props;

  // const DragHandle = useMemo(() => SortableHandle(() => (
  //   <TableButton>{intl.formatMessage(messages.move)}</TableButton>
  // )), []);

  // 移除操作
  const handleRemoveRow = (row: IFieldItem) => {
    const newData = tableData.filter(item => item.system_field !== row.system_field);
    props.handleDrag(newData, row.system_field);
  };

  const columns = [
    {
      title: intl.formatMessage(globMessages.index),
      key: 'index',
      className: 'drag-visible',
      width: 60,
      render: (val: undefined, redord: IFieldItem, index: number) => index + 1,
    },
    {
      title: intl.formatMessage(messages.columnName),
      dataIndex: 'column_name',
      className: 'drag-visible',
      width: 120,
    },
    {
      title: intl.formatMessage(globMessages.operate),
      key: 'action',
      className: 'drag-visible',
      width: 100,
      render: (row: IFieldItem) => (
        <>
          <TableButton onClick={() => handleRemoveRow(row)}>{intl.formatMessage(messages.remove)}</TableButton>
          {/* <DragHandle /> */}
        </>
      ),
    }];

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(tableData), oldIndex, newIndex).filter(el => !!el);
      // console.log('Sorted items: ', newData);
      props.handleDrag(newData);
    }
  };

  const DraggableContainer = (dragProps: any) => (
    <NewSortableContainer
      // useDragHandle
      // disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      // pressDelay={200}
      distance={10}
      {...dragProps}
    />
  );

  const DraggableBodyRow = (bodyProps: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = tableData.findIndex((x: any) => x.system_field === bodyProps['data-row-key']);
    return <SortableItem index={index} {...bodyProps} />;
  };

  return (
    <TableWrapper
      height={500}
    >
      <Table
        pagination={false}
        dataSource={tableData}
        columns={columns}
        rowKey='system_field'
        size='middle'
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </TableWrapper>
  );
}

export default injectIntl(DragTable);
