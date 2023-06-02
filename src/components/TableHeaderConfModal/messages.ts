/*
 * @Author: your name
 * @Date: 2021-02-01 20:59:54
 * @LastEditTime: 2021-02-02 10:28:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /janus/src/components/TableHeaderConfModal/messages.ts
 */
import { defineMessages } from 'react-intl';
const NAMESPACE = 'TABLEHEADERCONF';

// 与路由保持一致
export const scope = `cosmos.src.pages.${NAMESPACE}`;

export default defineMessages({
  tableConf: {
    id: `${scope}.tableConf`,
    defaultMessage: '列表配置',
  },
  candidateField: {
    id: `${scope}.candidateField`,
    defaultMessage: '候选字段',
  },
  basicField: {
    id: `${scope}.basicField`,
    defaultMessage: '基本字段',
  },
  selectedField: {
    id: `${scope}.selectedField`,
    defaultMessage: '已选字段',
  },
  remove: {
    id: `${scope}.remove`,
    defaultMessage: '移除',
  },
  columnName: {
    id: `${scope}.columnName`,
    defaultMessage: '字段名',
  },
  move: {
    id: `${scope}.move`,
    defaultMessage: '移动',
  },
});
