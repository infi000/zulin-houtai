import * as React from 'react';
import styled from 'styled-components';

// const { useEffect, useMemo } = React;

const StarWarp = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 60px;

  .burst-12 {
    background: red;
    width: 40px;
    height: 40px;
    position: relative;
    top: 10px;
    left: 10px;
    text-align: center;
  }
  .burst-12:before, .burst-12:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    background: red;
  }
  .burst-12:before {
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  .burst-12:after {
    -webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  .title {
    width: 40px;
    position: absolute;
    color: white;
    top: 18px;
    left: 14px;
    font-size: 14px;
  }
`;

function Star() {
  return (
    <StarWarp>
      <div className='burst-12' />
      <div className='title'>奖 励</div>
    </StarWarp>
  );
}

export default Star;
