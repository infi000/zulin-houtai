<!--
 * @Author: 张驰阳、张宁
 * @Date: 2020-07-14 13:55:10
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-20 13:59:37
 * @Description: file content
-->

# 埋点与监控

> 张驰阳 @2020-07-07

## 介绍

- cosmos使用longan(龙眼)作为前端监控埋点的实施方案，通过[longan-sdk](https://www.npmjs.com/package/longan-sdk)进行数据收集与上报。[longan数据展示平台](http://gz-cvm-ebuild-zhangchiyang-dev001.gz.sftcwl.com/)提供数据展示能力。

- 账号开通请联系张驰阳(01389450)、张宁

### 配置文件

> longan基础配置文件地址`src/configs/longan.conf.js`

### 配置项介绍

```javascript
/**
 * longan埋点参数配置
 * 参考：import { ILonganConfig } from 'longan-sdk/dist/bundle';
 */
const config = {
    open:true, // 是否开启longan  
    project_name: 'Cosmos', // 项目名称
    env: {
        uat: 'www.uat-Cosmos.com', //uat host地址
        online: 'www.online-Cosmos.com', // 线上 host地址
        develop: window.location.host // 本地开发 host地址
    },
    loginUser: '', // 用户id（cosmos登陆用户id）
    filter_fields: [], // 过滤掉不想上传的字段
    filter_confitions: [], // 过滤掉不想上传的功能
    additional_info: {}, // 自定义信息
    hash_route: false // 开启代表有hash路由流量统计
}
export default config
```

### 使用方法

关于longan其他信息请访问 [longan文档](/connect/longan.md)