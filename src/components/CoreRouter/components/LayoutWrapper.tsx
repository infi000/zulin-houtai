import React, { memo, ElementType, PropsWithChildren, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router-dom';

interface LayoutWrapper {
  layout: ElementType;
  component?: ElementType<RouteComponentProps>;
  render?: (props: RouteComponentProps) => ReactNode;
}

export const LayoutWrapper = memo((props: PropsWithChildren<LayoutWrapper>) => {

  const { layout: Layout, children, component: Component, render, ...rcps } = props;

  return (
    <Layout>
      {
        children ||
        (Component && <Component {...rcps as RouteComponentProps} />) ||
        (typeof render === 'function' && render(rcps as RouteComponentProps)) ||
        null
      }
    </Layout>
  );
});
