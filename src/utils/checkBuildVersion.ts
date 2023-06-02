/*
 * @Author: 董方旭
 * @Date: 2021-03-17 14:34:01
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-07-02 13:53:40
 * @Description: 验证构建版本是否和当前版本一致。如果有新版本发行，提示用户刷新
 */
import get from 'lodash/get';
import { Modal } from 'antd';
import { ModalFunc } from 'antd/lib/modal/confirm';

import { getRequest } from './request';

export const getBuildVersion = (params: { timestamp: string }) => getRequest('/static/buildVersion.json', params);

const LOOP_TIME = 60000;

interface IVersionInfo {
  commit: string;
  commitUserName: string;
  commitUserMail: string;
  commitDate: string;
  buildUserName: string;
  buildUserMail: string;
  buildDate: string;
}

class BuildVersion {
  static instance: BuildVersion;

  info: IVersionInfo;

  modal: ModalFunc | false;

  constructor(versionInfo: IVersionInfo) {
    this.info = versionInfo;
  }

  static getInstance(versionInfo: IVersionInfo) {
    if (!this.instance) {
      this.instance = new BuildVersion(versionInfo);
    }
    return this.instance;
  }

  init = () => {
    this.checkVersion();
  }

  checkVersion = () => {
    setTimeout(() => {
      const timestamp = new Date().getTime().toString();

      // eslint-disable-next-line
      getBuildVersion({ timestamp }).then((data: any) => {
        // const data = JSON.parse(d);
        const commit = get(data, ['data', 'commit'], '');
        const buildDate = get(data, ['data', 'buildDate'], '稍早前');
        if (commit !== this.info.commit) {
          this.alert(buildDate);
        } else {
          this.checkVersion();
        }
      }).catch((err: any) => {
        console.log('err: ', err);
        this.checkVersion();
      });
    }, LOOP_TIME);
  }

  alert = (buildDate: string) => {
    if (!this.modal) {
      this.modal = Modal.confirm;
      this.modal({
        width: '500px',
        zIndex: 100000,
        title: '发现新版本',
        content: `新版本于${buildDate}发布，请及时刷新浏览器`,
        okText: '刷新',
        cancelText: '再等等',
        onCancel: () => {
          this.checkVersion();
          this.modal = false;
        },
        onOk: () => {
          window.location.reload(true);
        },
      });
    }
  }
}

export default BuildVersion;
