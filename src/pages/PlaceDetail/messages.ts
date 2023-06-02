import { defineMessages } from 'react-intl';
import { NAMESPACE } from './constants';

export const scope = `cosmos.src.pages.${NAMESPACE}`;

export default defineMessages({
  tableTitle: {
    id: `${scope}.tableTitle`,
    defaultMessage: '维度列表',
  },
  dimension_code: {
    id: `${scope}.dimension_code`,
    defaultMessage: '维度编码',
  },
  dimension_name: {
    id: `${scope}.dimension_name`,
    defaultMessage: '维度名称',
  },
  create_user: {
    id: `${scope}.create_user`,
    defaultMessage: '创建人',
  },
  create_time: {
    id: `${scope}.create_time`,
    defaultMessage: '创建时间',
  },
  modify_user: {
    id: `${scope}.modify_user`,
    defaultMessage: '更新人',
  },
  modify_time: {
    id: `${scope}.modify_time`,
    defaultMessage: '更新时间',
  },
  requireInt: {
    id: `${scope}.requireInt`,
    defaultMessage: '请填入大于 0 且为 2 的幂次方的值，如: 1,2,4,8,...',
  },
});
