import React, { lazy, Suspense, ReactNode, memo } from 'react';

interface LazyComponentProps {
  lazyLoad: () => Promise<{ default: any; }>;
  fallback?: ReactNode;
}

export const LazyComponent = memo((props: LazyComponentProps) => {

  const LazyComp = lazy(() => props.lazyLoad());

  return (
    <Suspense fallback={props.fallback || null}>
      <LazyComp />
    </Suspense>
  );
})
