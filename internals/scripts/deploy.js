/*
 * @Author: 李淳
 * @Date: 2020-06-05 15:02:35
 * @LastEditors: 李淳
 * @LastEditTime: 2020-06-23 20:30:45
 * @Description: file content
 */
const deploy = require('eden-remote-deploy');
const customDeployCfg = require('../../src/configs/dev.deploy.conf');

const deployCfg = {
  liantiao: {
    receiver: 'http://10.188.40.135:8012/receiver.php',
    root: '/home/sftcwl/odp_super_ros/',
  },
  shuangshuang: {
    receiver: 'http://10.59.57.113:8012/receiver.php',
    root: '/var/www/super-ros/',
  },
  ...customDeployCfg,
};

const edenCfg = [{
  from: 'build/static/**',
  to: 'webroot/static/',
}];

const hostName = process.argv[2];// 捕获机器名字

if (hostName && deployCfg[hostName]) {
  // eslint-disable-next-line
  const receiver = deployCfg[hostName].receiver;
  console.info('==>   Receiver:', receiver);

  deploy(edenCfg, receiver, deployCfg[hostName].root);
} else {
  console.error('==>   请输入正确的部署机器名');
}
