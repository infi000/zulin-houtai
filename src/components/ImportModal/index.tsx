import React from 'react';
import { Modal, Form, message, Progress, Button, List } from 'antd';
import styled from 'styled-components';
import { postJsonRequest, getRequest } from 'utils/request';
import OssUpload from 'components/OssUpload.tsx';
import cosInstance from 'utils/cosUtils';
import { InfoCircleOutlined } from '@ant-design/icons';

// 提交导入信息
const postImportService = (params: { key: string, templateId: string, moduleId: string }) =>
  postJsonRequest<{ key: string, templateId: string, moduleId: string }, IResponseData<string>>(
    '/tsResource/common/submitImport',
    params,
  );

// 获取导入结果
const getImportResService = (params: { taskId: any }) =>
  getRequest<{ taskId: any }, any>(
    '/tsResource/common/getImportResult',
    params,
  );

const DownloadWrap = styled.div`
  padding-left: 9px;
  text-align: center;
  text-decoration: underline;
`;

const ResultWrapper = styled.div`
margin-bottom: 24px;
  .box {
    margin-bottom: 15px;
  }
  .middle {
    text-align: center;
    font-weight: 500;
  }
  .progress {
    margin: 5px auto;
  }
  .detail {
    font-weight: 500;
    .check_icon {
      font-size: 40px;
      display: block;
    }
    .middle_detail {
      text-align: center;
      margin-top: 20px;
    }
    .left {
      margin-right: 40px;
    }
  }
`;
interface IProps {
  filesUrl: string; // 导入模板地址
  moduleId: string; // 导入模块Id
  templateId: string; // 导入模板Id
  title?: string;
  onClose: () => void; // 关闭弹窗回调
  formChildren?: React.ReactNode; // 自定义内容
  postAdapter?: (data: any) => any; // 提交数据适配器
}

const { useState } = React;

const ImportModal = (props: IProps) => {
  const { filesUrl, moduleId, templateId, title = '导入', onClose, postAdapter } = props;
  const [form] = Form.useForm();
  const [importModal, setImportModal] = useState(true);
  const [modalResultData, setModalResultData] = useState<{
    visible?: boolean;
    status?: 0 | 1;
    data?: Dictionary<any>;
  }>({});

  const downloadDetail = async () => {
    const url = await cosInstance.downloadFile(modalResultData.data?.task_fail_excel_key);
    window.open(url, '_blank');
  };

  const handleClose = () => {
    onClose();
    // setImportModal(false);
  };

  const handleOK = async () => {
    const { file_urls, ...rest } = await form.validateFields();
    let params = {
      key: file_urls[0],
      templateId,
      moduleId,
      ...rest,
    };
    if (postAdapter) {
      params = postAdapter({ ...params });
    }
    const result = await postImportService(params);
    let timer: number | undefined;
    let num = 0; // 通过请求次数判断等待时间,15分钟后报超时
    setModalResultData({ visible: true });
    setImportModal(false);
    try {
      timer = window.setInterval(async () => {
        num += 1;
        const { data } = await getImportResService({ taskId: result?.data });
        if (data?.task_status === 2 || data?.task_status === 4) { // 2-验证失败，4-处理完成
          clearInterval(timer);
          setModalResultData(state => ({ ...state, status: 1, data }));
          return;
        }
        if (num > 30) {
          clearInterval(timer);
          setModalResultData({});
          message.error('导入时间过长，请到【系统管理-数据导入导出】页面查看结果！');
        }
      }, 1000);
    } catch (error) {
      clearInterval(timer);
    }
  };

  return (
    <>
      <Modal
        centered
        title={title}
        visible={importModal}
        onOk={handleOK}
        okText='导入'
        destroyOnClose
        onCancel={handleClose}
        width='500px'
      >
        <Form form={form}>
          {
            props.formChildren ? props.formChildren : null
          }
          <Form.Item
            initialValue=''
            name='file_urls'
            rules={[{ required: true, message: '请上传文件' }]}
          >
            <OssUpload maxLen={1} accept='.xlsx,.csv' domType='Dragger' domMsg='支持CSV，XLSX文件格式，不能超过2000行，最大6M；' />
          </Form.Item>
          <DownloadWrap>
            <a
              href={filesUrl}
              target='_blank'
              rel='noopener noreferrer'
            // download='客户仓库面积维护模版.xlsx'
            >
              下载导入模版
            </a>
          </DownloadWrap>
        </Form>
      </Modal>
      <Modal
        centered
        title={modalResultData.status === 1 ? '导入完成' : '导入进度'}
        width={800}
        footer={null}
        visible={modalResultData.visible}
        onCancel={handleClose}
        destroyOnClose
        keyboard={false}
        maskClosable={false}
        closable={modalResultData.status === 1}
      >
        <ResultWrapper>
          {modalResultData.status !== 1 && (
            <div className='box'>
              <div className='middle'>导入进行中，请勿关闭当前页面，否则上传数据将丢失。</div>
              <Progress
                percent={100}
                status='active'
                strokeWidth={20}
                showInfo={false}
                strokeColor='#333'
                className='progress'
              />
              <div className='middle'>导入中...</div>
            </div>
          )}
          {modalResultData.status === 1 && (
            <div className='detail'>
              {/* <InfoCircleOutlined /> */}
              <div className='middle_detail'>
                {modalResultData.data?.task_status === 2 && (
                  <>
                    <span className='left'>导入失败：{modalResultData.data?.task_fail_result}</span>
                    <Button
                      type='primary'
                      onClick={downloadDetail}
                      className='btn'
                    >
                      下载导入失败明细
                    </Button>
                  </>
                )}
                {modalResultData.data?.task_status === 4 && (
                  <List
                    size='large'
                    bordered={false}
                    dataSource={
                      modalResultData.data?.task_result && Array.isArray(modalResultData.data?.task_result)
                        ? modalResultData.data?.task_result.flat(2) : []
                    }
                    renderItem={(item: any, index: any) => <List.Item style={{ textAlign: 'left', color: (index === 0) ? 'red' : '#000' }}>{item}</List.Item>}
                  />
                )}
            </div>
            </div>
          )}
      </ResultWrapper>
    </Modal>
    </>
  );
};

export default ImportModal;
