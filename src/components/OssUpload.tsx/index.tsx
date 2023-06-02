import React, { useState, forwardRef, useEffect } from 'react';
import { Form, Upload, message, Button } from 'antd';
import Icon, { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { isArray, random } from 'lodash';
import styled from 'styled-components';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import cosInstance from 'utils/cosUtils';
import Dragger from 'antd/lib/upload/Dragger';

type TRes = {
  key: string; // key
  originalFile: string; // 文件名
  sign: string; // 临时签名
  url: string; // 文件上传的地址
}
const Wrap: any = styled.span`
  .ant-upload-list{    
    max-width: 700px;
    background: #fafafa;
    border: ${props => props.theme.border};
    margin: ${props => props.theme.margin};
    padding-bottom: ${props => props.theme.paddingBottom};
}`;

interface IProps {
  value: string[];
  onChange: Function;
  maxLen?: number;
  maxSize?: number;
  title?: string;
  domType?: 'Button' | 'Dragger',
  domMsg?: string;
  [key: string]: any;
}

const OssUpload = (props: IProps, ref: any) => {
  const { value, onChange, maxSize = 1024, maxLen = 1, title, domType = 'Button', domMsg = '', ...rest } = props;
  const initialValue = value;
  const [fileList, setFileList] = useState<any>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const triggerChange = (fileListData: any[]) => {
    let format = [];
    if (onChange) {
      format = ([...fileListData].length > 0) ? [...fileListData].map(item => item.url) : [];
      onChange(format);
      setFileList([...fileListData]);
    }
  };

  // 上传之前
  const check = (file: RcFile): any => new Promise((resolve, reject) => {
    const isMaxLen = fileList.length <= (maxLen - 1);
    if (!isMaxLen) {
      message.error(`最多支持上传${maxLen}个附件!`);
    }
    const isMaxSize = file.size / 1024 / 1024 < maxSize;
    // 检查文件大小
    if (!isMaxSize) {
      message.error(`文件大小不得超过${maxSize || 20}MB!`);
    }
    if (isMaxLen && isMaxSize) {
      resolve(file);
    } else {
      reject(false);
    }
  });

  // 上传onChange
  const uploadOnChange = async (file: RcFile, flist: RcFile[]) => {
    const fileListData: any = [...fileList];
    try {
      const fileKey = await cosInstance.uploadFile(file);
      (file as any).url = fileKey;
      fileListData.push(file);
      message.success(`文件${file.name}上传成功！`);
    } catch (error) {
      message.error(`文件${file.name}上传失败！ ${error.toString()}`);
    }
    triggerChange(fileListData);
  };

  const beforeUpload: any = async (file: RcFile, flist: RcFile[]) => {
    const before = await check(file);
    if (before) {
      setIsUploading(true);
      await uploadOnChange(file, flist);
      setIsUploading(false);
    }
    return new Promise((resolve, reject) => {
      reject(false);
    });
  };

  const handleDownload = (file: UploadFile<any>) => {
    console.log(file);
  };
  const onPreview = async (file: UploadFile<any>) => {
    const { url } = file;
    const src = await cosInstance.downloadFile(url);
    window.open(src, '_blank');
  };

  // 移除删掉的文件
  const uploadOnRemove = (file: any) => new Promise(resolve => {
    const fileListData: any = [...fileList];
    const f_fileListData = fileListData.filter((item: any) => item.uid !== file.uid);
    triggerChange(f_fileListData);
    message.success('文件删除成功');
  });

  useEffect(() => {
    if (initialValue && isArray(initialValue)) {
      const format = initialValue.map((key: string, _index: number) => {
        const status = 'done'; const response = { status: 'success' }; const uid = random(0, 100000000);
        // const url = await cosInstance.downloadFile(key);
        return {
          name: key, uid, status, response, key, url: key,
        };
      });
      setFileList((opt: any) => [...format, ...opt]);
    }
  }, []);
  return (
    <Wrap ref={ref} theme={(isArray(fileList) && fileList.length > 0) ? { border: '1px solid #ccc', margin: '10px 0', paddingBottom: '10px' } : { border: 'none', margin: '0', paddingBottom: '0' }}>
      {
        domType === 'Button' && (
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onRemove={uploadOnRemove as any}
            onDownload={handleDownload}
            onPreview={onPreview}
            {...rest}
          >
            {props.children ? props.children : <Button type='primary' loading={isUploading} icon={<UploadOutlined />}>{title || '上传'}</Button>}
          </Upload>
        )
      }
      {
        domType === 'Dragger' && (
          <Dragger
            beforeUpload={beforeUpload}
            fileList={fileList}
            onRemove={uploadOnRemove as any}
            onDownload={handleDownload}
            onPreview={onPreview}
            {...rest}
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>拖拽上传文件</p>
            <p className='ant-upload-hint'>{domMsg}</p>
          </Dragger>
        )
      }
    </Wrap>
  );
};

export default forwardRef(OssUpload);

// export default forwardRef(() => <h1>123123</h1>);
