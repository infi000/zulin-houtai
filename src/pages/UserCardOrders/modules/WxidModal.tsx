/*
 * @Author: Claude
 * @Description: UserCardOrders 微信订单号显示模态框
 */
import * as React from 'react';
import { Modal, Spin, Button, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { ModalTitle } from 'components/TitlePrefixIcon';

interface IProps {
  visible: boolean;
  wxid?: string;
  loading?: boolean;
  onClose: () => void;
}

function WxidModal(props: IProps) {
  const { visible, wxid, loading, onClose } = props;

  const handleCopy = () => {
    if (wxid) {
      navigator.clipboard.writeText(wxid).then(() => {
        message.success('已复制到剪贴板');
      }).catch(() => {
        message.error('复制失败，请手动复制');
      });
    }
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title="微信订单号" />}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Spin spinning={loading}>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          {wxid ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#999', marginBottom: '10px' }}>微信订单号</p>
                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '4px',
                    wordBreak: 'break-all',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  {wxid}
                </div>
              </div>
              <Space>
                <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy}>
                  复制订单号
                </Button>
                <Button onClick={onClose}>
                  关闭
                </Button>
              </Space>
            </>
          ) : (
            <p>未获取到微信订单号</p>
          )}
        </div>
      </Spin>
    </Modal>
  );
}

export default WxidModal;
