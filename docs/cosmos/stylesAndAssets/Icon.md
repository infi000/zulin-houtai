<!--
 * @Author: 黄斌旭
 * @Date: 2020-06-30 14:34:29
 * @LastEditTime: 2020-07-16 17:26:55
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/cosmos/Icon.md
-->

# Icon管理

> 黄斌旭 @2020-07-01

## 相关文件结构

```
.
├── src
├── components
│   └── IconFont
└── configs
    └── base.conf.js
```

## 使用步骤

#### 1.先将所需的icon上传至 iconfon.cn, 之后获得相应的外链资源地址,例如`//at.alicdn.com/t/font_1870095_pb7glcp5fgc.js`

#### 2.将外链地址复制，粘贴至 `base.conf.js` 的 `aliIconFontSourceURL`, 如下, 注意此处需带上`http`

```js
// base.conf.js
module.exports = {
  aliIconFontSourceURL: 'http://at.alicdn.com/t/font_1870095_pb7glcp5fgc.js',
  iconFontScriptURL: '/static/js/iconfont.js',
};
```
#### 3. `iconFontScriptURL`一般情况下可以不用更改, 它代表着将ali icon 资源生成到本地的路径
#### 4. 在使用的地方直接引用`@/components/Iconfont`, 使用方法与antd 的icon 组件一致，`type` 为在 iconfont.cn 上展示的名字, 如下

```js
// 页面使用
import IconFont from "@/components/Iconfont"

export const config = [
  {
    name: "首页",
    icon: <IconFont type="iconhome" /> // type 类型与iconfont上展示的名字一致即可
  }
]
```

#### 5.  注意，现在每次新增或删除图标 iconfont.cn 的资源地址都会变，所有每次记得手动修改`aliIconFontSourceURL` & `重启webpack`
