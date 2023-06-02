import { getQueryString } from 'utils/utils';
import { conf } from 'configs/pass.conf';

export const NAMESPACE = 'Login';

export const PROMISE_REJECT = 'reject';

export const PLATFORM_CONF = getQueryString('platform') || (conf as any).platformMap; // 判断url 参数中是否设置platform，有则返回,没有则返回conf中的platform;两者必须满足其一

export const LOGIN_PAGE_URL = `${conf.browserRouterPrefix}/login`;

export const PLATFORM_QUERY_CONF = getQueryString('platform') ? `?platform=${getQueryString('platform')}` : '';
