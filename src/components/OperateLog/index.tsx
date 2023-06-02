import * as React from 'react';

import TableButton from 'components/TableButton';

import LogContent from './LogContent';

const { useState } = React;

interface IProps {
  columns?: any[];
  children? : any;
  logId?: string | number,
  tableName: string;
  projectId?: string | number,
  title?: string;
  sysCode?: string;
  logType?: string;
}

const Log = (props: IProps) => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      {
        props.children
          ? <span onClick={() => setShow(true)}>{props.children}</span>
          : <TableButton onClick={() => setShow(true)}>日志</TableButton>
      }
      { isShow ? <LogContent {...props} setShow={setShow} isShow={isShow} /> : null}
    </>
  );
};

export default Log;
