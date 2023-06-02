<!--
 * @Author: your name
 * @Date: 2020-06-30 14:30:19
 * @LastEditTime: 2020-08-03 16:50:37
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/cosmos/config.md
-->

# 配置

> 李淳 @2020-07-15

## 项目配置

为便于管理，项目配置文档集中于**src/configs**，包括开发配置文件、项目/业务配置文件。

### 开发配置文件

开发配置文件以**dev.**开头，此类配置文件为开发相关配置，不参与prod模式的编译，以commonJS的方式进行模块导出。

#### dev.deploy.conf.js

远程部署配置文件，为**eden-remote-deploy**的部署提供配置选项，更详细的部署路径等配置在**internals/scripts/deploy.js**中，更详细的说明见[开发远程部署](/basic/deploy.md)；

*注意：远程部署仅支持后端语言为php的项目*

```javascript
const deployCfg = {
  common: {
    receiver: 'http://10.188.40.81:8206/receiver.php', // 接收文件的receiver地址；
    root: '/home/sftcwl/odp_ils/', // 文件部署路径，一般为webroot所在的路径即可
  },
};

module.exports = deployCfg;
```

#### dev.server.conf.js

开发server的配置，后续会开放更丰富的配置。

```javascript
const proxy = require('./dev.proxy.conf');

module.exports = {
  proxy,
  port: 3030
}

```

#### dev.proxy.conf.js

开发代理配置文件，可按照路由代理到不同的环境，不赘述。

```javascript
const mockServer = 'http://easy-mock.sftcwl.com/mock/5ebc25690e1f322cd339b684';
const liantiao = 'http://10.188.40.81:8206';
const zhihui = 'http://10.188.40.234:8080';
const yifei = 'http://10.188.40.96:8206';

module.exports = {
  '/user': mockServer,
  '/station': liantiao,
  '/rider': zhihui,
  '/mock': zhihui,
  '/resource': zhihui,
  '/data': zhihui,
  '/data/order': mockServer,
  '/workbench': mockServer,
};
```

### 项目/业务配置文件

#### base.conf.js

项目基础配置

#### auth.conf.js

功能权限映射配置

#### longan.conf.js

埋点及流量统计信息配置

#### pass.conf.js

登录相关信息配置

#### route.conf.tsx

路由及菜单配置
