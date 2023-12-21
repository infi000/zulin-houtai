import React from 'react';
import { Empty } from 'antd';
import emp from 'static/images/empty.png';

export const empty = {
  emptyText: <Empty
    image={emp}
    imageStyle={{
      height: 120,
      width: 120,
      marginLeft: 'calc(50% - 60px)',
    }}
    description={
      <div style={{ marginBottom: '20px' }}>亲，暂时还没有数据哦～</div>
    }
  />,
};
