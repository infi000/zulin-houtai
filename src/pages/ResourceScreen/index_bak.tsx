import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StyledInterface } from 'styled-components';
import WujieReact from 'wujie-react';
import styled from 'utils/styled-px2vw';
import { FENGJINGTAI_APPID, FENGJINGTAI_HOST_SIT, FENGJINGTAI_TOKEN } from 'utils/constants';

const { bus, setupApp, preloadApp, destroyApp } = WujieReact;

/**
 * http://cdbi.sf-express.com/v2/#/external?workbookId=${报表ID}&workbookStyle=0&appId=${应用ID}&token=${应用TOKEN}&extId=${应用extId}
 * 报表id == workbookId
 * appId 丰景台申请的应用id
 * token 丰景台申请的固定token
 * extId = 当前系统的用户工号
 * 相关文档地址 http://osfp.sf-express.com/501?page_id=12550
 */

const workbookId = '955d0aa9b9d74877a5c8083d6005f099';
const url = `${FENGJINGTAI_HOST_SIT}/v2/#/external?workbookId=${workbookId}&workbookStyle=0&appId=${FENGJINGTAI_APPID}&token=${FENGJINGTAI_TOKEN}&copyRight=0&extId=01389450`;

const HomePageWrapper = (styled as StyledInterface).div`
 height: 100%;
 background: #fff;
`;

function ResourceScreen() {
  return (
    <HomePageWrapper>
      <WujieReact
        width='100%'
        height='100%'
        name='xxx'
        url={url}
        sync
        fetch={fetch}
        // props={props}
        // beforeLoad={beforeLoad}
        // beforeMount={beforeMount}
        // afterMount={afterMount}
        // beforeUnmount={beforeUnmount}
        // afterUnmount={afterUnmount}
      />
    </HomePageWrapper>
  );
}

export default ResourceScreen;
