/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-05-24 11:08:49
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-30 18:14:17
 * @FilePath: /ot-resources/src/pages/EquipmentFreeManage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import ImportModal from 'components/ImportModal';
import { DatePicker, Form } from 'antd';
import moment from 'moment';
import saga from './saga';
import { sliceKey, reducer, actions } from './slice';
import FormTable from './modules/FormTable';
import MainModal from './modules/MainModal';
import selectors from './selectors';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });
  const dispatch = useDispatch();

  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormTable />
        <MainModal />
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;
