/*
 * @Author: 董方旭
 * @LastEditors: 董方旭
 */
/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/translations`)
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { i18nConf } from 'configs/base.conf';
import { selectLocale } from './selectors';
import RewriteIntl from './RewriteIntl';
interface ILanguageProviderProps {
  locale: string;
  messages: any;
  children: any;
}

moment.locale('zh-cn');
// 月份中文显示 修复
moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
});

export function LanguageProvider(props: ILanguageProviderProps) {
  let antdLanguage = zhCN;
  moment.locale('zh-cn');
  if (props.locale === 'en-US') {
    antdLanguage = enUS;
    moment.locale('en');
  }

  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
      defaultLocale={i18nConf.defaultLocale}
    >
      <RewriteIntl>
        <ConfigProvider locale={antdLanguage}>
          {React.Children.only(props.children)}
        </ConfigProvider>
      </RewriteIntl>
    </IntlProvider>
  );
}

const mapStateToProps = createSelector(
  selectLocale,
  locale => ({
    locale,
  }),
);

export default connect(mapStateToProps)(LanguageProvider);
