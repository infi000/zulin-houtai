/* eslint-disable @typescript-eslint/no-explicit-any */
/*  用法

  const [uploadConfig, setUploadConfig] = useState({
    title: intl.formatMessage(messages.batchImport),
    uploadText: intl.formatMessage(messages.uploadTip),
    uploadUrl: '/ros/fixed/fixedupload',
    template: {
      csv: csvTemplate
      // 如果支持excel
      excel: excelTemplate
    },
  });

  <UploadModal
    intl = { intl }
    customConfig = { uploadConfig }
    showUploadModal = { importModal.show }
    closeUploadModal = { handleCancel }
    getNewListData = { getNewListData }
    getTableListParams = {{
      ...searchCondition,
      page: 1,
      perPage: 50,
    }}
  />

*/

import * as React from 'react';
import { Upload, message, Table, Row, Col, Radio, Button, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { injectIntl, InjectedIntl } from 'react-intl';
import messages from './messages';
import yesIcon from './duigou1.png';

const { useState, useEffect } = React;
const { Dragger } = Upload;

interface ICustomConfig {
  title: string;
  uploadUrl: string;
  uploadText: string;
  template: any;
  fileType?: string;
  // 成功的个性化文案
  successConfig?: {
    successTitle: string;
    errorTitle: string;
    currentMsg: string;
    attempt: string;
  };
}

interface IProps {
  intl: InjectedIntl;
  customConfig: ICustomConfig;
  // 用于控制整体的显隐的状态
  showUploadModal: boolean;
  // 函数，用于改变showUploadModal
  closeUploadModal: (params: any) => any;
  // 自定义footer
  footer?: any;
  // 上传成功后，更新table
  getTableList?: (params: any) => any;
  getTableListParams?: any;
  children?: any;
  // 上传所需额外参数
  uploadExtraData?: any;
  // 默认不传，同时支持excel、csv时开启
  isExcelSupport?: boolean;
  customColumns?: any;
}

const UploadModal = (props: IProps) => {
  const { intl, customConfig, showUploadModal, isExcelSupport = false, customColumns } = props;
  const { title, uploadUrl, uploadText, template, successConfig, fileType = 'csv' } = customConfig;
  const { successTitle, errorTitle, currentMsg, attempt } = successConfig || {};

  const [showUploadModalPending, setShowUploadModalPending] = useState(true);
  const [showUploadModalSuccess, setShowUploadModalSuccess] = useState(false);
  const [showUploadModalFail, setShowUploadModalFail] = useState(false);
  const [importFileType, setImportFileType] = useState(fileType);
  // eslint-disable-next-line no-underscore-dangle
  const _initState: any = {
    fileList: [],
    totalCount: null,
    errorCount: null,
    errList: [],
    file_id: null,
  };
  const [initState, setInitState] = useState(_initState);

  const defaultMessageConfig = {
    // 导入成功！
    successTitle: intl.formatMessage(messages.importSuccess),
    // 导入结果
    errorTitle: intl.formatMessage(messages.importResult),
    // 本次共导入
    currentMsg: intl.formatMessage(messages.currentImport),
    // 本次共尝试导入
    attempt: intl.formatMessage(messages.attempt),
  };

  useEffect(() => {
    setInitState(_initState);
  }, [showUploadModal]);

  const uploadProps = {
    headers: {
      STOKEN: document.cookie.split('STOKEN=')[1],
    },
    withCredentials: true,
    data: props.uploadExtraData ? props.uploadExtraData : null,
    accept: importFileType === 'xlsx' ? '.xls,.xlsx' : '.csv',
  };
  const columns = [{
    title: props.intl.formatMessage(messages.line),
    dataIndex: 'line',
    key: 'line',
    width: 80,
  }, {
    title: props.intl.formatMessage(messages.primary),
    dataIndex: 'primary',
    key: 'primary',
    width: 120,
  }, {
    title: props.intl.formatMessage(messages.msg),
    dataIndex: 'msg',
    key: 'msg',
    width: 250,
  }];

  const handleChange = (info: any) => {
    const { fileList } = info;
    if (fileList.length > 1) {
      message.error(intl.formatMessage(messages.pleaseRemoveUp));
      return;
    }
    const { response = null } = fileList[0];
    const { status } = info.file;
    setInitState({
      ...initState,
      fileList: JSON.parse(JSON.stringify(fileList)),
    });
    // 成功
    if (status === 'done' && (response?.data?.error_count === 0)) {
      setShowUploadModalPending(false);
      setShowUploadModalSuccess(true);
      setInitState({
        ...initState,
        totalCount: response.data && response.data.total_count,
      });
    } else if (status === 'done' && (response?.data?.error_count !== 0)) {
      // 失败
      setShowUploadModalPending(false);
      setShowUploadModalFail(true);
      setInitState({
        ...initState,
        totalCount: response.data && response.data.total_count,
        errorCount: response.data.error_count,
        errList: response.data && response.data.error_list,
      });
    } else if (status === 'done' && (response && response.errno !== 0)) {
      if (response.errmsg) {
        message.error(response.errmsg);
      } else {
        message.error(intl.formatMessage(messages.uploadfail));
      }
    } else if (status === 'error') {
      message.error(intl.formatMessage(messages.serverError));
    }
  };

  const handleRemove = () => {
    setInitState(_initState);
  };

  const handleCancel = () => {
    handleRemove();
    props.closeUploadModal(false);
    setShowUploadModalPending(true);
    setShowUploadModalSuccess(false);
    setShowUploadModalFail(false);
  };

  const handleSuccessCancel = () => {
    handleCancel();
    const { getTableList, getTableListParams } = props;
    if (getTableList) {
      getTableList(getTableListParams || {});
    }
  };

  // 留着，如果需要下载错误明细可随时加上
  const handleDownLoadDetail = () => {
    if (initState.file_id) {
      const a = document.createElement('a');
      a.href = initState.file_id;
      a.click();
    } else {
      message.error(intl.formatMessage(messages.serverNoResource));
    }
  };

  const handleSelectType = (value: string) => {
    setImportFileType(value);
  };

  const DefaultFooter = [
    <Button key='back' onClick={handleCancel}>
      {intl.formatMessage(messages.close)}
    </Button>,
    <Button key='1' type='primary'>
      <a
        href = { template[importFileType]}
      >
        {intl.formatMessage(messages.downLoadTemplate)}
      </a>
    </Button>,
  ];

  return (
    <div>
      {/* 导入 */}
      <Modal
        title={title}
        centered
        visible={ showUploadModalPending && showUploadModal }
        onCancel={handleCancel}
        footer={props.footer || DefaultFooter}
      >
        {props.children}
        {isExcelSupport && (
          <Row style = {{ marginBottom: 10 }}>
            <Col key = 'label' span = { 5 }>{intl.formatMessage(messages.importFileType)}</Col>
            <Col key = 'name' span = { 15 }>
              <Radio.Group onChange = { (e: any) => handleSelectType(e.target.value) } value={importFileType}>
                <Radio value='csv'>CSV</Radio>
                <Radio value='xlsx'>Excel</Radio>
              </Radio.Group>
            </Col>
          </Row>
        )}
        <Dragger
          name='file'
          multiple={ false }
          action={ uploadUrl }
          fileList={initState.fileList}
          onChange={handleChange}
          onRemove={handleRemove}
          { ...uploadProps }
        >
          <div>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>{uploadText}</p>
            <p className='ant-upload-hint'>
              { intl.formatMessage(messages.uploadTip, { type: importFileType === 'xlsx' ? 'Excel' : 'CSV' }) }
            </p>
          </div>
        </Dragger>
      </Modal>
      {/* 导入成功 */}
      <Modal
        centered
        title= { successTitle || defaultMessageConfig.successTitle }
        // visible
        visible={ showUploadModalSuccess && showUploadModal }
        onCancel={handleSuccessCancel}
        footer={[
          <Button key='close' onClick={handleSuccessCancel}>
            { intl.formatMessage(messages.ok) }
          </Button>,
        ]}
      >
        <div style = {{ display: 'flex', alignItems: 'center' }}>
          <img src = {yesIcon} height = '50' alt = 'yes' />
          <div style = {{ marginLeft: '20px' }}>
            { currentMsg || defaultMessageConfig.currentMsg }
            <span style = {{ color: 'black' }}>{initState.totalCount}</span>
            { intl.formatMessage(messages.itemData) }
          </div>
        </div>
      </Modal>
      {/* 导入失败 */}
      <Modal
        centered
        title = { errorTitle || defaultMessageConfig.errorTitle }
        // visible
        visible={ showUploadModalFail && showUploadModal }
        onCancel={handleCancel}
        footer={[
          <Button key='close' onClick={handleCancel}>
            { intl.formatMessage(messages.ok) }
          </Button>,
        ]}
      >
        <div style = {{ marginBottom: '16px' }}>
          { attempt || defaultMessageConfig.attempt }
          <span style = {{ color: 'black' }}>{initState.totalCount || 0}</span>
          { intl.formatMessage(messages.itemData) }，
          { intl.formatMessage(messages.among)}
          <span style = {{ color: 'red' }}>{initState.errorCount || 0}</span>
          { intl.formatMessage(messages.handleDo) }。
        </div>
        <Table
          bordered
          columns = { customColumns || columns }
          dataSource = { Array.isArray(initState.errList) ? initState.errList : [] }
          rowKey = 'line'
          pagination = { false }
        />
        {/* 留着，如果需要下载错误明细可随时加上 */}
        {/* <div style = {{ color: 'blue', marginTop: '16px', cursor: 'pointer' }} onClick = { handleDownLoadDetail }>
          <Icon type='download' />{intl.formatMessage(messages.downloadDetail)}
        </div> */}
      </Modal>
    </div>
  );
};

export default injectIntl(UploadModal);
