/*
 * @Author: 董方旭
 * @Date: 2021-07-07 11:22:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-21 13:37:15
 * @Description: 导出组件：同步/异步 + 脱敏/非脱敏 + 条件导出/勾选导出
 */
import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Dropdown, Menu, Button, Modal, Radio, notification, Space, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';

import commonMessages from 'utils/messages';
import { postJsonRequest } from 'utils/request';

import messages from './messages';
import { IExportResponseData, TExportMode, TUseExportMode, IExportParams, IAsyncOrSyncParams } from './types';

const { useState } = React;

interface IProps extends InjectedIntlProps {
  // 是否异步，默认 true，是异步
  async?: boolean;
  // 导出模式：勾选、条件、两者否有
  exportMode: TExportMode;
  // 是否有脱敏，默认 false, 否，表示是否可以进行脱敏切换
  isNeedDesensitization?: boolean;
  // 默认脱敏状态，默认 '0'，导出加密后的数据
  initDesensitizeFlag?: '0' | '1';
  // 导出函数
  handleExport: (
    useExportMode: TUseExportMode,
    exportFun: (
      url: string,
      params: IExportParams,
    ) => void,
  ) => void;
}
function ExportComponent(props: IProps) {
  const {
    intl,
    async = true,
    exportMode,
    isNeedDesensitization = false,
    initDesensitizeFlag = '0',
  } = props;
  // 导出弹窗，包含导出数据条数
  const [exportModal, setExportModal] = useState({
    visible: false,
    data: {},
  } as IModalData<{ exportNum: number }>);
  // 导出最终的脱敏状态
  const [desensitizeFlag, setDesensitizeFlag] = useState(initDesensitizeFlag);
  // 导出按钮触发回调函数
  const [exportParams, setExportParams] = useState({
    url: '',
    params: {},
    onSuccess: null,
  });

  React.useEffect(() => {
    setDesensitizeFlag(initDesensitizeFlag);
  }, [initDesensitizeFlag]);

  // 同步导出
  const syncExport = (data: IAsyncOrSyncParams) => {
    const { url, onSuccess } = data;
    const iframe = document.createElement('iframe');
    if (isNeedDesensitization) {
      iframe.src = `${url}&desensitize_flag=${desensitizeFlag}`;
    } else {
      iframe.src = url;
    }
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    setTimeout(() => document.body.removeChild(iframe), 1000);
    setExportModal({ visible: false, data: {} } as IModalData<{ exportNum: number }>);
    // 成功回调
    onSuccess && onSuccess();
  };

  // 异步导出
  const asyncExport = async (data: IAsyncOrSyncParams) => {
    const { url, params, onSuccess } = data;
    const result: IExportResponseData<null | { task_id: number }> = await postJsonRequest(url, {
      ...params,
      desensitize_flag: desensitizeFlag,
    });
    if (!(result?.errno === 0)) {
      notification.error({
        message: `
          ${result?.errmsg || intl.formatMessage(commonMessages.sysError)}
          lid: ${result?.lid || result?.logId}
        `,
        duration: 5,
      });
      return;
    }
    setExportModal({ visible: false, data: {} } as IModalData<{ exportNum: number }>);
    const task_id = result?.data?.task_id;
    if (task_id) {
      notification.success({
        message: intl.formatMessage(commonMessages.asyncImportOrExportRes, { task_id }),
        duration: 5,
      });
      // 成功回调
      onSuccess && onSuccess();
    }
  };

  const exportFun = (url: string, data: IExportParams) => {
    const { exportNum, params, onSuccess } = data;
    if (exportNum === 0) {
      message.warning(intl.formatMessage(commonMessages.exportNull));
      return;
    }
    setExportModal({ visible: true, data: { exportNum } });
    if (async) {
      setExportParams({
        url,
        params,
        onSuccess: onSuccess || null,
      });
    } else {
      setExportParams({
        url,
        params: {},
        onSuccess: onSuccess || null,
      });
    }
  };

  // 导出按钮回调入口
  const handleDropdown = (e: any) => {
    props.handleExport(e.key, exportFun);
  };

  // 确认按钮执行导出操作
  const handleOk = () => {
    // handleOkFun();
    // const { url, params, onSuccess } = exportParams;
    if (async) {
      asyncExport(exportParams);
    } else {
      syncExport(exportParams);
    }
  };

  const handleChange = (e: RadioChangeEvent) => {
    setDesensitizeFlag(e.target.value);
  };

  return (
    <>
      {
        // 导出按钮形式：按钮、下拉框
        exportMode === 'both' ? (
          <Dropdown
            trigger={['click']}
            overlay={(
              <Menu onClick={handleDropdown}>
                <Menu.Item key='select'>{intl.formatMessage(messages.select)}</Menu.Item>
                <Menu.Item key='condition'>{intl.formatMessage(messages.condition)}</Menu.Item>
              </Menu>
            )}
          >
            <Button>
              {intl.formatMessage(messages.export)}
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Button onClick={() => handleDropdown({ key: exportMode })}>
            {intl.formatMessage(messages[exportMode])}
          </Button>
        )
      }
      {/* 导出弹窗 */}
      <Modal
        centered
        title={intl.formatMessage(commonMessages.export)}
        visible={exportModal.visible}
        maskClosable={false}
        onCancel={() => setExportModal({ visible: false, data: {} } as IModalData<{ exportNum: number }>)}
        onOk={handleOk}
      >
        <p>{intl.formatMessage(commonMessages.batchSelected, { num: exportModal.data.exportNum || 0 })}</p>
        {
          // 有脱敏切换的时候可以进行切换选择
          isNeedDesensitization && (
            <>
              <p>{intl.formatMessage(messages.keenTitle)}</p>
              <Radio.Group
                defaultValue={initDesensitizeFlag}
                onChange={handleChange}
                disabled={!isNeedDesensitization}
                value={desensitizeFlag}
              >
                <Space direction='vertical'>
                  <Radio value='0'>
                    {intl.formatMessage(messages.keenChoose1)}[*****]
                  </Radio>
                  <Radio value='1'>
                    {intl.formatMessage(messages.keenChoose2)}[10000]
                  </Radio>
                </Space>
              </Radio.Group>
            </>
          )
        }
      </Modal>
    </>
  );
}

export default injectIntl(ExportComponent);
