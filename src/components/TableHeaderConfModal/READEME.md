<!--
 * @Author: liqingqing
 * @Date: 2021-02-01 20:51:43
 * @LastEditTime: 2021-02-01 20:53:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/TableHeaderConfModal/READEME.md
-->
<!-- props -->
```js
  1. visible: boolean; // 弹窗显隐
  2. list: IFieldItem[]; // 候选字段
  3. handleCancel: () => void; // 关闭弹窗
  4. handleConfirm: (params: IFieldItem[]) => void; // 确定
  5. handleReset?: () => void; // 重置
```