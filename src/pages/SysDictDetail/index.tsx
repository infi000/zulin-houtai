import React from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import ErrorBoundary from 'components/ErrorBoundary';
import PageWrapper from 'components/PageWrapper';

import saga from './saga';
import { sliceKey, reducer } from './slice';

import FormTable from './modules/FormTable';
import MainModal from './modules/MainModal';

function Page() {
  useInjectReducer({ key: sliceKey, reducer });
  // 可选
  useInjectSaga({ key: sliceKey, saga });

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
