import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';
import saga from './saga';
import { sliceKey, reducer, actions } from './slice';
import FormTable from './modules/FormTable';
import selectors from './selectors';
import ResModal from './modules/ResModal';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });
  return (
    <ErrorBoundary>
      <PageWrapper>
        <FormTable />
        <ResModal />
      </PageWrapper>
    </ErrorBoundary>
  );
}

export default Page;