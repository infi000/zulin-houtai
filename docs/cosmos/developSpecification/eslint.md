# eslint-config-sf-cosmos

> 任亚楠 @2020-07-01

## 基础说明

这个eslint配置文件是基于airbnb-base，@typescript-eslint的一些规则的基础上进行配置

## 如何使用

先安装对应的这个包

npm i eslint-config-sf-cosmos

安装完成之后在.eslintrc文件中的extends字段下配置上这个对应的扩展包，当然前缀eslint-config-可以省略，直接写sf-cosmos即可

```javascript
module.exports = {
    "root": true,
    "extends": ['sf-cosmos']
};
```

如果在编辑器中集成的话，我们在开发阶段就可以发现错误并改正，极大的增加了开发效率

我们需要在vscode的扩展中先安装eslint的插件

## 说明or规则

***env***

一个环境定义了一组预定义的全局变量

***Globals***

全局变量，对于全局变量，可以设置writable可重写，readonly不允许重写

***Plugins***

第三方插件，在使用的时候你要通过npm进行对应的安装

***rules***

错误级别，当然你也可以修改某个插件中对应的一些错误级别
"off" or 0 - 关闭规则
"warn" or 1 - 将规则视为一个警告（不会影响退出码）
"error" or 2 - 将规则视为一个错误 (退出码为1)

"plugin1/rule1": "2" 表示来自插件plugin1的rule1规则，注释的话使用`/* eslint "plugin1/rule1": "error" */` 这种方式

你可以使用以下的方式来进行注释或者临时禁止规则出现的警告

```javascript
/* eslint-disable */

alert('foo');

/* eslint-enable */

// 也可以对指定的规则启用或者禁用警告，当然，不推荐

/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */

// 整个文件禁用警告，注意将/* eslint-disable */放在顶部

/* eslint-disable */

// 还有一些对应的说明详见https://cn.eslint.org/docs/user-guide/configuring
```

js具体的规则信息：https://cn.eslint.org/docs/rules/

ts具体的规则信息：https://github.com/typescript-eslint/typescript-eslint/tree/v2.33.0/packages/eslint-plugin/docs/rules

如有需要，可自行查找，如果是通用的rules的配置，可联系 @任亚楠 更新对应的eslint的npm包

如果是自己项目中的特殊规则，可配置自己项目的.eslintrc文件进行个性化配置

列出所有自己所自定义的一些配置仅供参考，可对照上面的网址进行参照

```javascript
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'redux-saga', 'jsx-a11y', '@typescript-eslint'],
  globals: {
    module: 'readonly',
  },
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'arrow-parens': [1, 'as-needed'],
    'react/static-property-placement': 0,
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'no-empty-function': [2, { allow: [] }],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
      // NOTE: If this error triggers, either disable it or add
      // your custom components, labels and attributes via these options
      // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': [2, { varsIgnorePattern: 'React' }],
    '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: 'React' }],
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 2,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'object-curly-newline': 0,
    camelcase: 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    'prefer-object-spread': 0,
    '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }],
  },
};

```


***extends***

可共享配置，是一个npm包，可以省略包的前缀eslint-config-
