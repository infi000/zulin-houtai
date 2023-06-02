import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StyledInterface } from 'styled-components';
import styled from 'utils/styled-px2vw';

const url_uat = `http://elog-wpm-nweb.sit.sf-express.com/#/onlineResourceBoard`;
const url_master = `http://scc-wpm.sf-express.com/#/onlineResourceBoard`;

const HomePageWrapper = (styled as StyledInterface).div`
  height: 100%;
  background: #fff;
  #resourceScreen{
    width: 100%;
    height: 100%
    border: none;
  }
`;

function ResourceScreen() {
  return (
    <HomePageWrapper>
      <iframe
        id='resourceScreen'
        title='资源大屏'
        width='100'
        height='200'
        src={url_master}
      />
    </HomePageWrapper>
  );
}

export default ResourceScreen;
