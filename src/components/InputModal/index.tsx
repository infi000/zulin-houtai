/*
 * @Author: your name
 * @Date: 2021-03-05 14:00:02
 * @LastEditTime: 2021-03-05 19:45:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/InputModal/index.tsx
 */
import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Input, Modal, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import globalMessages from 'utils/messages';

import messages from './messages';

interface IProps extends InjectedIntlProps {
  title?: string;
  limitNumber?: string | number;
  value?: string | number | undefined;
  onChange?: (params: string) => void;
}

const { TextArea } = Input;

const { useState } = React;

function InputModal(props: IProps & InjectedIntlProps) {
  const [form] = Form.useForm();
  const { intl, value, title, limitNumber = 100 } = props;
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState('');

  const triggerChange = (changedValue: string) => {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  };

  const replateData = (data: string) => data.split(/,|，/g).map((i: string) => i.replace(/^\s*|\s*$|\s*\u200B/g, '')).filter((i: string) => !!i).join(',');

  const handleClick = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const data = form.getFieldValue('modal');
    const result = replateData(data);
    const { length } = result.split(',');
    if (limitNumber && length > limitNumber) {
      message.warning(intl.formatMessage(messages.overLimit, { limitNumber, length }));
      return;
    }
    setVal(result);
    triggerChange(result);
    setVisible(false);
  };

  const handleCancel = () => {
    form.setFieldsValue({ modal: value || val });
    setVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setVal(inputVal);
    triggerChange(inputVal);
  };

  return (
    <>
      <Input
        value={value || val}
        onChange={handleInputChange}
        addonAfter={<PlusOutlined onClick={handleClick} />}
        placeholder={intl.formatMessage(globalMessages.inputPlaceholder)}
      />
      <Modal
        centered
        title={title || ''}
        closable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width='400px'
      >
        <Form form={form}>
          { limitNumber && <div style={{ marginBottom: '20px', color: '#f00' }}>{intl.formatMessage(messages.limit, { title, limitNumber }) || ''}</div> }
          <Form.Item initialValue={value} name='modal'>
            <TextArea placeholder={intl.formatMessage(globalMessages.inputPlaceholder)} rows={4}></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default injectIntl(InputModal);
