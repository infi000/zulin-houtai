/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-13 23:21:46
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-14 00:37:47
 * @FilePath: /houtai/src/components/ImageUpload/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Popconfirm, Space, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import Styled from 'styled-components';
import { getRequest } from 'utils/request';

// 获取列表
export const getDataListService = (params: any, api: string) =>
  getRequest<any, IResponseData<string>>(
    `/${api}`,
    params,
  );
const Wrap = Styled.div`
  .img-box{
    width: 50px;
    height: 50px;
    position: relative;
     img{
      height: 100%;
      width: 100%;
     }
     .del{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 16px;
      background: #ccc6;
      cursor: pointer;
      color: red;
  }
     }
  }
`;

interface IProps {
  data?: {
    'id': string,
    'pic': string,
  }[];
  delParams: {
    params: any,
    api: string
  }
}
const ImageBox = (props: IProps) => {
  const { data, delParams } = props;
  const [imgs, setImgs] = useState(data);
  useEffect(() => {
    if (data) {
      setImgs(data);
    }
  }, [data]);
  const onConfirm = (opt: any) => {
    getDataListService({ ...delParams.params, picid: opt.id }, delParams.api).then((res:any) => {
      console.log('res', res);
      if (res.res == 'succ') {
        setImgs(imgs.filter((item) => item.id !== opt.id));
      }
    });
  };
  return (
    data ? (
      <Wrap>
        <Space size={[8, 16]} wrap>
          {Array.isArray(imgs) && imgs.map((item, index) => {
            const { pic, id } = item;
            return (
              <div className='img-box' key={id}>
                <Popconfirm
                  title='确定删除?'
                  onConfirm={() => onConfirm(item)}
                  okText='确定'
                  cancelText='取消'
                >
                  <DeleteOutlined className='del' />
                </Popconfirm>

                <img src={pic} alt='' />
              </div>
            );
          })}
        </Space>
      </Wrap>
    ) : null
  );
};

export default ImageBox;
