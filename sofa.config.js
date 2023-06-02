const path = require('path');

module.exports = {
  version: '0.0.3',
  template: {
    name: 'cosmos',
    type: 'module',
    frame: 'react',
    isTs: true,
    isBlank: false,
    description: '统一集成框架',
    parentId: null,
    modulesPath: path.join(__dirname, '/src/pages'),
    componentsPath: path.join(__dirname, '/src/components'),
    microsPath: path.join(__dirname, '/'),
  }
}
