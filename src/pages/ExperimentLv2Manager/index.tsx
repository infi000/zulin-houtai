import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import { getQueryString } from 'utils/utils';

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
  const eid = getQueryString('eid');
  useEffect(() => {
    dispatch(actions.updateEid(eid))
  }, [])

  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormTable />
        <MainModal />
        {importModal.visible && <ImportModal {...importModal.data} onClose={handleImportModalClose} />}
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;