<!--
 * @Author: your name
 * @Date: 2021-03-01 15:20:11
 * @LastEditTime: 2021-03-01 15:35:10
 * @LastEditors: Please set LastEditors
 * @Description: 搜索栏展开收起组件
 * @FilePath: /janus/src/components/FilterFormWrapper/READEME.md
-->
### props

参数 | 说明
---|---
children | form表单，form内只能有一个Row元素
onSearch | 搜索方法
searchButton | 自定义搜索按钮
onReset | 重置方法
isShowResetButton | 是否显示重置按钮
defaultShowRows | 默认展开几个Col
defaultColsNumber | 默认展开几行

1. **如果传了defaultShowRows那么优先以defaultShowRows为主，如果**。
2. **既不传defaultShowRows和defaultColsNumber 默认展开3行**。

### 组件思路
1. 获取所有的col，用到React.Children.forEach；
2. 展开col的个数；
3. 根据collapsed 和 showColsLength操作col，使其隐藏或者显示；
4. 把Cols塞到Row中；
5. 把Row塞到form里；



