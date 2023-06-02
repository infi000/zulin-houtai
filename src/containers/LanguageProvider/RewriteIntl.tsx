/*
 * @Author: 董方旭
 * @Date: 2021-02-08 14:04:14
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-02-08 14:05:18
 * @Description: 重写intl.formatMessage方法，解决key不存在时报错
 */
import * as React from 'react';
import { intlShape } from 'react-intl';

class RewriteIntl extends React.Component {
  public static childContextTypes = {
    intl: intlShape.isRequired,
  };

  public static contextTypes = {
    intl: intlShape,
  };

  public handleFormatMessage = (...args: any[]) => {
    if (args[0] && args[0].id && args[0].defaultMessage) {
      return this.context.intl.formatMessage(...args);
    }
    return '';
  };

  public getChildContext() {
    return {
      intl: {
        ...this.context.intl,
        formatMessage: this.handleFormatMessage,
      },
    };
  }

  public render() {
    return this.props.children;
  }
}

export default RewriteIntl;
