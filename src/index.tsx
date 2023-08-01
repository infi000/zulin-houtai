/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-07-20 22:53:32
 * @Description: 入口文件
 */

// 打包工具内置polyfill
// import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import { AppContainer } from 'react-hot-loader';
// A CSS library that provides consistent, cross-browser default styling of HTML elements alongside useful defaults.
import 'sanitize.css/sanitize.css';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Check Version
import BuildVersion from 'utils/checkBuildVersion';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./static/images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import { configureAppStore } from 'store/configureStore';

// Import Longan
// import loadLongan from 'utils/loadLongan';

// Import root app
import App from './pages/Layout';

// Import i18n messages
import { translationMessages } from './i18n';

// Import root app

// Import global style
import './styles/index.less';

// loadLongan();

if (process.env.NODE_ENV === 'production') {
  // 版本检查
  // const buildVersion = BuildVersion.getInstance(process.env.BUILD_VERSION as any);
  // buildVersion.init();
}
interface ITranslationMessages {
  'en-US': {
    [key: string]: string;
  };
  'zh-CN': {
    [key: string]: string;
  };
}

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const store = configureAppStore();
const MOUNT_NODE = document.getElementById('app');

const render = (messages: ITranslationMessages): void => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </AppContainer>
    </Provider>,
    MOUNT_NODE,
  );
};

// eslint-disable-next-line
if ((module as any).hot) {
  // 注意需要依赖@types/webpack-env这个包
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  // eslint-disable-next-line
  (module as any).hot.accept(['./i18n', 'pages/Layout'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}
render(translationMessages);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
