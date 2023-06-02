import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'antd';
import { useDebounceBefore } from 'hooks/useDebounce';
import { falsyParamsFilter } from 'utils/filters';
import { ModalTitle } from 'components/TitlePrefixIcon';
import ViewModule from 'components/EquipmentComponent/ViewModule';
import { CREATE, EDIT, REVIEW, VIEW } from 'utils/constants';
import { selectAllDictMap } from 'store/selectors';
import { actions, postCreate, postEdit } from '../slice';
import selectors from '../selectors';
import { formatPostParams } from '../adapter';
import CreateModule from './CreateModule';
import ReviewModule from './ReviewModule';

const { useEffect, useMemo } = React;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function MainModal() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const mainModal = useSelector(selectors.mainModal);
  const loading = useSelector(selectors.loading);
  const dictMaps = useSelector(selectAllDictMap);
  const { data, type = EDIT, visible = false } = mainModal;

  useEffect(() => {
    visible && form.resetFields();
  }, [form, visible]);

  const modalTitle = useMemo((): string => {
    switch (type) {
      case CREATE:
        return '新建';
      case EDIT:
        return '编辑';
      case REVIEW:
        return '审核';
      default:
        return '查看';
    }
  }, [type]);

  const handleCancel = (): void => {
    dispatch(actions.updateMainModal({
      visible: false,
      type: CREATE,
    }));
  };

  const handleOk = async (): Promise<void> => {
    if (type === VIEW) {
      handleCancel();
    } else {
      let values = await form.validateFields();
      values = formatPostParams(values);
      if (type === CREATE) {
        dispatch(postCreate(falsyParamsFilter(values)));
      } else {
        dispatch(postEdit({
          ...values,
          id: data?.id,
        }));
      }
    }
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title={<ModalTitle title={modalTitle} />}
      visible={visible}
      confirmLoading={loading}
      onOk={useDebounceBefore(handleOk)}
      onCancel={handleCancel}
      footer={type === VIEW ? <Button type='primary' onClick={handleCancel}>关闭</Button> : null}
      width={type === VIEW ? 1000 : 800}
    >
      {
        type === VIEW && <ViewModule mainModal={mainModal} modules={['公司信息', '设备基础信息', '记录']} />
      }
      {
        type === CREATE && <CreateModule />
      }
      {
        type === REVIEW && <ReviewModule />
      }
    </Modal>
  );
}

export default MainModal;
