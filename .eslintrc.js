module.exports = {
  extends: ['tblh-lint'],
  rules: {
    'implicit-arrow-linebreak': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'function-paren-newline': 0,
    'no-void': 0,
    'import/prefer-default-export': 0,
    'max-lines': 0,
    'max-len': [
      'error',
      {
        // 强制行的最大长度
        code: 120,
        // 指定 tab 字符的宽度
        tabWidth: 2,
        // 忽略含有链接的行
        ignoreUrls: true,
        // 忽略所有拖尾注释和行内注释
        // 注释的长度限制一下
        ignoreComments: true,
        // 忽略包含正则表达式的行
        ignoreRegExpLiterals: true,
        // 忽略含有双引号或单引号字符串的行
        ignoreStrings: true,
        // 忽略包含模板字面量的行
        ignoreTemplateLiterals: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [
      'error',
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
  },
};
