import React, { useEffect } from 'react';
import { Modal, Form, message, Progress, Button, List } from 'antd';
import styled from 'styled-components';
import { postRequest, getRequest } from 'utils/request';
import cosInstance from 'utils/cosUtils';
import { useDispatch, useSelector } from 'react-redux';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';

// 获取导入结果
const getImportResService = (params: { taskId: any }) =>
  getRequest<{ taskId: any }, any>(
    '/tsResource/common/getImportResult',
    params,
  );

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

const { useState } = React;

const ImportModal = () => {
  const [modalResultData, setModalResultData] = useState<Dictionary<any>>({});
  const dispatch = useDispatch();
  const mainModal = useSelector(selectors.mainModal);
  const { visible = false } = mainModal;

  const downloadDetail = async () => {
    const url = await cosInstance.downloadFile(modalResultData?.task_fail_excel_key);
    window.open(url, '_blank');
  };

  const handleCancel = (): void => {
    dispatch(actions.updateMainModalVisible(false));
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await getImportResService({ taskId: mainModal?.data?.id || '' });
      if (data?.task_status === 2 || data?.task_status === 4) { // 2-验证失败，4-处理完成
        setModalResultData(data);
      }
    }
    if (visible) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return (
    <Modal
      forceRender
      destroyOnClose
      centered
      title='导入进度'
      visible={visible}
      width={800}
      footer={null}
      onCancel={handleCancel}
      keyboard={false}
      maskClosable={false}
    >
      <ResultWrapper>
        <div className='detail'>
          <div className='middle_detail'>
            {modalResultData?.task_status === 2 && (
              <>
                <span className='left'>导入失败：{modalResultData?.task_fail_result}</span>
                <Button
                  type='primary'
                  onClick={downloadDetail}
                  className='btn'
                >
                  下载导入失败明细
                </Button>
              </>
            )}
            {modalResultData?.task_status === 4 && (
              <List
                size='large'
                bordered={false}
                dataSource={
                  modalResultData?.task_result && Array.isArray(modalResultData?.task_result)
                    ? modalResultData?.task_result.flat(2) : []
                }
                renderItem={(item: any, index: any) => <List.Item style={{ textAlign: 'left', color: (index === 0) ? 'red' : '#000' }}>{item}</List.Item>}
              />
            )}
          </div>
        </div>
      </ResultWrapper>
    </Modal>
  );
};

export default ImportModal;
