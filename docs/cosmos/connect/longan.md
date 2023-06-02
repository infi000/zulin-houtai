<!--
 * @Author: 李淳
 * @Date: 2020-07-20 13:56:40
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-20 13:57:39
 * @Description: file content
-->

# Longan

Author @张驰阳、张宁

Date @2020-07-07

## 介绍

> longan提供一套数据、错误、埋点监控收集与展示的前端监控解决方案。

> [longan-sdk](https://www.npmjs.com/package/longan-sdk)进行数据收集与上报。包括基础信息，错误信息，埋点信息，性能信息四个维度的数据收集。

>  [longan数据展示平台](http://gz-cvm-ebuild-zhangchiyang-dev001.gz.sftcwl.com/)提供数据展示能力。

 账号开通请联系张驰阳(01389450)、张宁

## 基础概念

### 1.基础信息

##### 上报时机

> - 在页面路由切换的时触发上报
>
> - 在性能，错误，埋点上报时机触发时跟随上报

##### 上报信息

| 字段名          | 描述                  |
| --------------- | --------------------- |
| project_name    | 项目                  |
| http_referer    | 路径                  |
| user_agent      | ua信息                |
| remote_addr     | IP                    |
| position_name   | 地理位置信息          |
| create_time     | 上报时间              |
| device_type     | 设备类型              |
| page_title      | 页面docuement.title.  |
| env_type        | 环境【online】【uat】 |
| additional_info | 其他自定义信息        |
| loginUser       | 登陆用户              |
| client_size     | 设备宽*高             |



### 2. 性能

##### 上报时机

> 仅在页面首次加载完成时(window.onload)触发上报

##### 上报信息

| 字段      | 描述                                      |
| :-------- | :---------------------------------------- |
| dns       | DNS 解析耗时                              |
| tcp       | TCP 连接耗时                              |
| ssl       | SSL 安全连接耗时                          |
| ttfb      | Time to First Byte（TTFB），网络请求耗时  |
| trans     | 数据传输耗时                              |
| dom       | DOM 解析耗时                              |
| res       | 资源加载耗时                              |
| fpt       | First Paint Time, 首次渲染时间 / 白屏时间 |
| tti       | Time to Interact，首次可交互时间          |
| ready     | HTML 加载完成时间， 即 DOM Ready 时间     |
| load      | 页面完全加载时间                          |
| firstbyte | 首包时间                                  |



### 3. 错误

##### 上报时机

> js报错时触发上报

##### 上报信息

| 字段名           | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| error_message    | 发送错误描述                                                 |
| error_script_url | 错误发生代码行                                               |
| error_line       | 错误行数                                                     |
| error_column     | 错误列                                                       |
| error_content    | 抛错内容 （用户自定义的内容)                                 |
| error_type       | 错误类型 1.SyntaxError（语法错误)、 2.ReferenceError（引用错误）、3.RangeError（范围错误）、4.TypeError（类型错误）、5.URLError（URL错误） |



### 4. 埋点

##### 上报时机

> - 用户埋点的dom元素被点击时触发上报
> - 用户自定义主动触发

##### 上报信息

| 字段       | 描述                         |
| ---------- | ---------------------------- |
| event_name | 事件名称                     |
| event_desc | 事件描述                     |
| event_type | 事件类型  【自定义】【点击】 |



## 使用方法

> 本教程通过最快捷的例子到完整的配置，来演示说明longan的基础配置和使用

### 1. 快速开始

下面是最简单的基础配置。引入longan-sdk后，执行longan.start方法就可以实现了上报基础信息，性能信息，错误上报的功能！

```javascript
import longan from 'longan-sdk';	
longan.start({
    project_name: 'Cosmos', // 项目名称
    env: {
        uat: 'www.uat-Cosmos.com',
        online: 'www.online-Cosmos.com',
        develop: window.location.host
    },
})
```

需要注意的是，project_name和env字段是必填项。

##### project_name：

project_name将是你在longan数据展示平台查看自己项目的名称。你所有的信息收集将落到你配置的project_name名下。所以定好project_name后就不要再做更改！

##### env:

env是一个对象,其中uat,online,develop三个属性的值对应着项目运行时的location.host。

如果你online的实际host是`www.online.com`，却配置成`www.online_2.com`。那当项目发布上线后，longan判断实际location.host和配置的不同，将不会执行上报。

develop属性请配置开发时的location.host。longan会做出上报的动作，但上报信息不会真正的被收集。



### 2.完整使用指南

#### 基础配置

> 下面是一个完整的longan基础配置信息
>
> longan.start方法接受一个对象，用户注册基础信息。执行方法后longan就已经开启了上报功能

```javascript
import longan from 'longan';
longan.start({
  project_name: 'otms', // 项目名称
  env: {  
    uat: 'www.uat.com',
    online: 'www.online.com',
    develop: 'window.location.host'
  },
  loginUser: '01389450',
  filter_fields: ['position_name'], // 过滤掉不想上传的字段
  filter_confitions:['error'], // 过滤掉不想上传的功能
  additional_info: {name:'zcy',}, // 自定义信息
  hash_route: false, // 开启代表有hash路由流量统计
  filter_error_msg: [], // 过滤不想上报的错误。接收字段为完整的errorMessage 
 })
```

| 参数              | 必选        | 说明                                                    | 类型    |
| :---------------- | :---------- | :------------------------------------------------------ | :------ |
| project_name      | required    | 项目名称                                                | string  |
| env               | required    |                                                         | object  |
| env.online        | not require | 线上域名                                                | stirng  |
| env.uat           | not require | uat域名                                                 | stirng  |
| env.develop       | not require | 开发域名（不会产生真实上报日志，测试用）                | string  |
| loginUser         | not require | 登陆用户                                                | string  |
| filter_fileds     | not require | 比如position_name, errpor_content，过滤掉不想上传的字段 | Array   |
| filter_confitions | not require | performance, basic, event, error，过滤掉不想上传的功能  | Array   |
| hash_route        | not require | 开启代表有hash路由流量统计                              | boolean |
| additional_info   | not require | 其他信息，以上报更多信息                                | object  |
| filter_error_msg   | not require | 过滤不想上报的错误。接收字段为完整的errorMessage         | Array  |



#### 埋点

> 埋点可通过元素埋点和自定义埋点两个方法实现埋点信息上报

##### 1. 元素埋点

方法1：在目标元素上设置属性为longan前缀的id，实现事件埋点上传。

```javascript
<Button id="longan-test-event">测试事件埋点</Button>

// 上报信息说明
埋点名称：'longan-test-event'
埋点描述：'测试事件埋点'
埋点类型：'点击'
```

方法2：给目标元素添加 data-longan 属性，可自定义上传文案。

```javascript
<Button id="longan-test-event" data-longan="点击订单详情-确认">测试事件埋点</Button>

// 上报信息说明
埋点名称：'longan-test-event'
埋点描述：'点击订单详情-确认'
埋点类型：'点击'
```

##### 2. 自定义埋点。

>  longan.dispatch方法接受一个对象参数。可以自定义上报埋点信息。

```javascript
import longan from 'longan-sdk';
longan.dispatch({
    event_name: 'new-work-order',
    event_desc: '新建工单',
    event_type: 'selfDefine',
});

// 上报信息说明
埋点名称：'new-work-order'
埋点描述：'新建工单'
埋点类型：'自定义'

```

| 参数       | 必选     | 说明                         | 类型   |
| :--------- | :------- | :--------------------------- | :----- |
| event_name | required | 埋点名称                     | String |
| event_desc | required | 埋点描述                     | String |
| event_type | required | 埋点类型 click \| selfDefine | String |



#### 更新配置

有些配置信息是异步获取的，例如用户登陆的信息。longan.updateConfig方法执行后会修改配置信息，覆盖基础配置的信息。

> longan.updateConfig接收一个对象参数，执行后，后续上报的基础信息将被修改

```javascript
  // import longan from 'longan-sdk';
import longan from 'longan-sdk';
longan.updateConfig({
  loginUser: '01389450',
  project_name: 'otms', // 项目名称
});
```

| 参数            | 必选        | 说明                                                    | 类型   |
| :-------------- | :---------- | :------------------------------------------------------ | :----- |
| project_name    | required    | 项目名称                                                | string |
| loginUser       | not require | 登陆用户                                                | string |
| filter_fileds   | not require | 比如position_name, errpor_content，过滤掉不想上传的字段 | Array  |
| additional_info | not require | 其他信息，以上报更多信息                                | object |