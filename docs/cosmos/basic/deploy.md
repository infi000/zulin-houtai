<!--
 * @Author: 李淳
 * @Date: 2020-07-15 12:05:10
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-16 17:08:38
 * @Description: file content
-->

# 远程部署

> 李淳 @2020-07-16

在开发阶段，我们倾向于使用前后端分离的开发方案，可以通过代理来进行接口调用，但是这仍然与我们实际的线上使用存着差异，因此前后端的prod模式的联调是非常必要的，那么，我们怎样将前后端代码结合在一起呢？

我们构建了前端代码的远程部署能力（当前仅适用于PHP后端），通过一个类似"木马"的小工具，越过开发机登录过程，直接将代码文件精准的部署到指定位置，这个小工具就是[eden-remote-deploy](https://www.npmjs.com/package/eden-remote-deploy)。

## eden-remote-deploy

### 服务端配置——receiver.php

首先，我们需要在开发机上部署一个receiver.php的文件，这个文件负责响应我们的上传，receiver.php从这里[下载](www.baidu.com)。

部署完毕后，确定一下可访问到receiver.php的url，比如说http://10.188.40.135:8012/receiver.php，能够正确显示ready即可。

### 客户端使用

我们需要配置上传的文件是从本地的哪里到远程的哪里，可以参考如下的配置：

```javascript
const deploy = require('eden-remote-deploy');
const customDeployCfg = require('../../src/configs/dev.deploy.conf');

const deployCfg = { // 可配置多个可部署的路径，在开发联调时，根据命令来指定传到哪个接收端；
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

const edenCfg = [{ // 从本地的哪里到远程的哪里
  from: 'build/static/**',
  to: 'webroot/static/',
}];

const hostName = process.argv[2];// 捕获机器名字

if (hostName && deployCfg[hostName]) {
  // eslint-disable-next-line
  const receiver = deployCfg[hostName].receiver;
  console.info('==>   Receiver:', receiver);

  // 对eden的核心调用；
  deploy(edenCfg, receiver, deployCfg[hostName].root);
} else {
  console.error('==>   请输入正确的部署机器名');
}
```

### 注意

由于当前公司的开发机普遍设置了4M的上传限制，因此当编译文件单个超过4M时会被拒绝，此时可以通过改进编译产出大小，或者修改开发机配置达成。

## 我们期待Java的解决方案

~
