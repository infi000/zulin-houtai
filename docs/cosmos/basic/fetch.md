<!--
 * @Author: 李淳
 * @Date: 2020-07-14 13:55:10
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 15:48:38
 * @Description: file content
-->

# 异步封装

> 杨扬 @2020-07-21

### 技术选型

|异步请求 | 特点 | 优点 | 缺点 |
|---|---|---|---|
| fetch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 现代浏览器原生自带 window.fetch，基于标准 Promise 实现，支持 async/await;需要安装 polyfill 兼容传统浏览器。|  1.可以使用更现代，更优的API；<br>2.基于现有业务我们已有完整封装，比较熟悉；|1.需要封装；<br>2.不支持取消请求；|
| axios | 基于xhr和promise封装的异步请求库，可运行在浏览器端和node.js中;有很多优秀的特性，例如拦截请求和响应、取消请求等。| 1.开箱即用；<br>2.API 全面；| 1.为了便于业务开发还需要二次封装；|

综述：这两个库都可以满足目前的业务开发场景；且异步请求是底层的功能方法，不影响上层业务，在后续项目发展过程中也可以很方便的切换；基于上述说明，和我们在 fetch 方面有比较长时间的积累，综合考虑cosmos的异步请求使用 fetch；

### 为什么要进一步封装

1. 为了简化业务开发，不用每次发请求都写一堆代码；
2. 当接收到代表错误的http状态码时，fetch返回的promise状态为resolve，需进一步处理；
3. 统一处理url，headers，response，便于扩展；

### 具体方案

现基于 whatwg-fetch 库封装了一个类，提供了原型方法request，用于创建不同请求；一个静态方法create作为请求器，并用默认配置生成了我们常用的几种请求方式；

目前支持的配置参数如下：

```js
interface IOption {
  baseUrl?: string;
  method?: string;
  headers?: any;
  body?: any;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
}
```

目前支持的数据类型有：

```js
export enum ContentType {
  json = 'application/json',
  form = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}
```

具体实现如下：

```js
export default class FetchRequest {
  private readonly config: IOption = {};

  private readonly baseUrl: string = '';

  constructor(configs: IConfig = {}) {
    const { baseUrl, ...otherConfigs } = configs;
    this.baseUrl = baseUrl || '';
    this.config = otherConfigs ? { ...otherConfigs } : {};
  }

  request<T, K>(url: string, params?: T, options: IOption = {}): any {
    try {
      const { config, baseUrl } = this;

      const newUrl = parseUrl(baseUrl, url, params);
      const option: IOption = { ...config, ...options };

      option.headers = parseHeaders(config.headers || null, options.headers || null);

      const newMethod = options.method || config.method || 'GET';
      if (newMethod !== 'GET') {
        option.body = parseBody<T>(params, option.headers);
      }

      return fetch(newUrl, {
        ...option,
      }).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      }).then(checkStatus).then((data: Response) => parseResponse<K>(data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('request', err);
      return {};
    }
  }

  // 请求器
  static create(method = 'GET', config: IConfig = defaultConfig) {
    return new FetchRequest({ ...config, method });
  }

  static getRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create().request(url, params);
  }

  static postRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create('POST').request(url, params, {
      headers: { 'Content-Type': ContentType.form },
    });
  }
}
```

### 业务开发中使用示例

```js
// services.ts
import { getRequest, postRequest } from 'utils/request';

export const getDataListService = (params: IRole & IPagination) => getRequest<IRole & IPagination, IListResponse<IRole>>('/user/management/getrolelist', params);

export const postCreateEntityService = (params: IRole) => postRequest<IRole, null>('/user/management/addrole', params);

```
