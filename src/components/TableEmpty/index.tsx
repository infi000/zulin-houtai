import React from 'react';
import { Empty } from 'antd';

export const empty = {
  emptyText: <Empty
    image='https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/science/ot-resources/%E6%9A%82%E6%97%A0%E6%95%B0%E6%8D%AE%403x.png'
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
