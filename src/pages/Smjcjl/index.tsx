/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-12-11 23:54:19
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-12-21 00:23:30
 * @FilePath: /houtaiv2/src/pages/Smjcjl/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import ImportModal from 'components/ImportModal';
import saga from './saga';
import { sliceKey, reducer, actions } from './slice';
import FormTable from './modules/FormTable';
import MainModal from './modules/MainModal';
import selectors from './selectors';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });
  const importModal = useSelector(selectors.importModal);
  const dispatch = useDispatch();
  const handleImportModalClose = () => {
    dispatch(actions.refresh());
    dispatch(actions.updateImportModal({ visible: false }));
  };
  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormTable />
        <MainModal />
        { importModal.visible && <ImportModal {...importModal.data} onClose={handleImportModalClose} />}
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;