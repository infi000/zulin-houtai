/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-13 23:21:46
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-13 23:54:24
 * @FilePath: /houtai/src/components/ImageUpload/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Space, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import Styled from 'styled-components';

const Wrap = Styled.div`
  height: 100%;
  .img-box{
    width: 50px;
    height: 50px;
     img{
      height: 100%;
      width: 100%;
     }
  }
`

interface IProps {
  data?: {
    'id': string,
    'pic': string,
  }[]
}
const ImageBox = (props: IProps) => {
  const { data } = props;
  return (
    <div>
      <Space size={[8, 16]} wrap>
        {new Array(20).fill(null).map((_, index) => (
          <div className="img-box" key={index}>
            <img src='http://dev.tangguostore.com/Uploads/Lease/2023-06-09/64828f5eaccc9.jpg' key={index} >img</img>
          </div>

        ))}
      </Space>
    </div>
  );
};

export default ImageBox;
