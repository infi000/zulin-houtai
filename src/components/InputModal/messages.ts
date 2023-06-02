import { defineMessages } from 'react-intl';

// 与路由保持一致
export const scope = `cosmos.src.components.InputModal`;

export default defineMessages({
  limit: {
    id: `${scope}.limit`,
    defaultMessage: '多个{title}之间用逗号间隔，上限数量：{limitNumber}',
  },
  overLimit: {
    id: `${scope}.overLimit`,
    defaultMessage: '最多输入{limitNumber}个，您当前输入数量为{length}个！',
  },
});

