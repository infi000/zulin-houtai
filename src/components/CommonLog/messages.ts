/*
 * @Author: 李朋峰
 * @Date: 2021-09-07 18:00:18
 * @LastEditors: liqingqing
 * @LastEditTime: 2021-10-29 17:55:16
 * @Description: file content
 */
import { defineMessages } from 'react-intl';
import { NAMESPACE } from './constants';

export const scope = `cosmos.src.compnents.${NAMESPACE}`;

export default defineMessages({
  eventTypeName: {
    id: `${scope}.eventTypeName`,
    defaultMessage: '操作类型',
  },
  operator_content: {
    id: `${scope}.operator_content`,
    defaultMessage: '操作内容',
  },
  operator: {
    id: `${scope}.operator`,
    defaultMessage: '操作人',
  },
  operator_time: {
    id: `${scope}.operator_time`,
    defaultMessage: '操作时间',
  },
  catalog: {
    id: `${scope}.catalog`,
    defaultMessage: '目录',
  },
  field_en_name: {
    id: `${scope}.field_en_name`,
    defaultMessage: '字段编码',
  },
  field_cn_name: {
    id: `${scope}.field_cn_name`,
    defaultMessage: '字段名',
  },
  old_value: {
    id: `${scope}.old_value`,
    defaultMessage: '修改前',
  },
  new_value: {
    id: `${scope}.new_value`,
    defaultMessage: '修改后',
  },
  loadMore: {
    id: `${scope}.loadMore`,
    defaultMessage: '加载更多',
  },
  loadAll: {
    id: `${scope}.loadAll`,
    defaultMessage: '没有更多了，已经是全部数据了',
  },
  lookMore: {
    id: `${scope}.lookMore`,
    defaultMessage: '查看更多',
  },
});
