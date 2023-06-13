import * as React from 'react';
import { Menu as AntdMenu, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { gotoPass } from 'configs/pass.conf';
import { i18nConf } from 'configs/base.conf';
import messages from 'utils/messages';
import { setCookie } from 'utils/utils';
import {
  selectLoginUserInfo,
  selectCurrentLanguage,
} from 'store/selectors';
import ToggleLanguage from 'components/ToggleLanguage';
import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';
import personagePng from 'static/images/nav_personage@3x.png';

import { HeaderWrapper } from '../components/Wrappers';
import MultipleTabs from '../components/MultipleTabs';

function Header(props: InjectedIntlProps) {
  const { intl } = props;
  const userInfo = useSelector(selectLoginUserInfo);
  const local = useSelector(selectCurrentLanguage);
  const dispatch = useDispatch();

  const handleLanguageChange = (lang: string) => {
    dispatch({
      type: CHANGE_LOCALE,
      payload: lang,
    });
    setCookie(i18nConf.cookieName, lang);
  };

  const handleLogout = () => {
    gotoPass('login');
  };

  return (
    <HeaderWrapper>
      <div className='menu-tabs'>
        <MultipleTabs />
      </div>
      {/* 右侧操作区域 */}
      <div className='global-action' style={{ width: '70px' }}>
        {
          i18nConf.enable && <ToggleLanguage value={local} onChange={handleLanguageChange} />
        }
        <Dropdown
          trigger={['click']}
          overlay={(
            <AntdMenu>
              <AntdMenu.Item key='code'>
                <span>{userInfo?.sfucode || '-'}</span>
              </AntdMenu.Item>
              <AntdMenu.Divider />
              <AntdMenu.Item key='logout' onClick={handleLogout}>
                <span>{intl.formatMessage(messages.logout)}</span>
              </AntdMenu.Item>
            </AntdMenu>
          )}
        >
          <img src={personagePng} alt='avatar' />
        </Dropdown>
      </div>
    </HeaderWrapper>
  );
}

export default injectIntl(Header);
