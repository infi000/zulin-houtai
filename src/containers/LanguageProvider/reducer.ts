/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';
import { i18nConf } from 'configs/base.conf';
import { getCookie } from 'utils/utils';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../i18n';

export interface IStore {
  locale: string;
}

export const initialState: IStore = {
  locale: getCookie(i18nConf.cookieName) || DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action: IRedux.Action) =>
  // eslint-disable-next-line
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.payload;
        break;
      default:
        break;
    }
  });

export default languageProviderReducer;
