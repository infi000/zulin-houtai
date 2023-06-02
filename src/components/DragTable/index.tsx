import * as React from 'react';
import { Table } from 'antd';
import { SortableContainer, SortableElement, SortableHandle, SortEnd } from 'react-sortable-hoc';
// import {  } from 'react-sortable-hoc/types';
// import styled from 'styled-components';
import arrayMove from 'array-move';
import { MenuOutlined } from '@ant-design/icons';
// import './index.less';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

const NewSortableItem = SortableElement((props: any) => <tr {...props} />);
const NewSortableContainer = SortableContainer((props: any) => <tbody {...props} />);

const { useState } = React;

// interface IProps {
//   // tableData: any[];
//   // handleRemoveRow: () => viod; // 移除行的回调
// }

function DragTable() {
  const [tableData, setTableData] = useState(data);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(tableData), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      setTableData(newData);
    }
  };

  const DraggableContainer = (props: any) => (
    <NewSortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    console.log('restProps', restProps);
    const index = tableData.findIndex((x: any) => x.index === restProps['data-row-key']);
    return <NewSortableItem index={index} {...restProps} />;
  };

  return (
    <Table
      pagination={false}
      dataSource={tableData}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  );
}

export default DragTable;
