import * as React from 'react';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getQueryString } from 'utils/utils';
import { getText } from '../Menu/helper';

const { useMemo } = React;

export interface IProps {
  path: string;
  mainMap: { // 存在可触达路由Map
    [key: string]: any;
  };
  routeParams?: { // 返回路由中携带参数
    [key: string]: any;
  };
  lang: string;
  separator?: any;
  pageTypeQueryString?: string;
  syncCrumbData?: (crumbData: any) => any;
  onClick?: (path: string) => any;
}

const LinkedCrumb = styled.span`
  cursor: pointer;
  color: #999;
`;

function Crumb(props: IProps) {
  const { mainMap, routeParams, lang, separator, path, onClick } = props;

  // 为末端路由重新命名，由于编辑、查看、新建等页面使用同一个路由，对于面包屑需要进行区分
  function getLastCrumbItemTextKey(item: string) {
    const pageType = getQueryString(props.pageTypeQueryString || 'type');
    return pageType ? `${item}.${pageType}` : item;
  }

  const crumbItems = useMemo(() => {
    // path其实是pathname，不带检索条件
    const pathArray = path.split('?')[0].split('/').filter(item => Boolean(item));
    const len = pathArray.length;

    const crumbData = pathArray.map((item, index) => {
      if (mainMap[item]) {
        let linkTo = `/${pathArray.slice(0, index + 1).join('/')}`;
        if (routeParams && routeParams[linkTo]) {
          linkTo += routeParams[linkTo];
        }
        const itemTextKey = len - 1 === index ? getLastCrumbItemTextKey(item) : item;
        return {
          key: item,
          text: getText(lang, itemTextKey),
          path: linkTo,
        };
      }
      return null;
    }).filter(item => Boolean(item));

    // 夹带私货
    if (props.syncCrumbData) {
      props.syncCrumbData(crumbData);
    }
    return crumbData;
  }, [path, lang]);

  const getLinkedCrumb = (pathname: string, text: string) => {
    if (onClick) {
      return <LinkedCrumb onClick={() => onClick(pathname)}>{ text }</LinkedCrumb>;
    }
    return <Link to={pathname}>{ text }</Link>;
  };

  return (
    <Breadcrumb
      className="breadCrumb"
      separator={separator || '/'}
    >
      {
        crumbItems.map((item, index) => (
          item && (
            <Breadcrumb.Item key={item.key}>
              {
                item.path && index !== 0 && index !== crumbItems.length - 1
                  ? getLinkedCrumb(item.path, item.text) : item.text
              }
            </Breadcrumb.Item>
          )
        ))
      }
    </Breadcrumb>
  );
}

export default Crumb;
