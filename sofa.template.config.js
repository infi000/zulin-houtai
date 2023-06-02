const { Sofa } = require('sofa-new-plugins');

module.exports = {
  name: 'cosmos',
  type: 'project',
  frame: 'react',
  isTs: true,
  isBlank: false,
  description: '统一集成框架',
  parentId: null,
  plugins: [
    // 按照顺序执行各个plugin
    new Sofa.Plugins.ReplaceKeywordPlugin([
      {
        originStr: 'cosmos',
        targetStr: '$$projectName$$', // $$表示从运行实体中获得
      },
    ]),
  ],
};
