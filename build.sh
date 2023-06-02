#!/bin/bash

###
 # @Author: 李淳
 # @Date: 2020-06-21 12:23:57
 # @LastEditors: 董方旭
 # @LastEditTime: 2021-03-03 19:35:55
 # @Description: Jenkins编译脚本
### 

# # 附加参数检查
ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS="错误：缺少 build_external_params 参数\n\n
- test 测试环境\n
- uat uat环境\n
- online 线上环境\n
"
if [[ "$1" =~ ^(test|uat|online)$ ]]; then
  export PROJECT_ENV=$1
  env | grep PROJECT_ENV
else
  echo -e $ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS
  exit 1
fi

source ~/.bashrc
nvm use v12.14.1

# 版本号
node -v
npm -v
npm config get registry

# 如若存在子模块，拉取子模块代码
git --version
# git submodule init
# git submodule update

# 设置环境变量，为prod模式
export NODE_ENV=production
env | grep NODE_ENV

# 安装依赖
npm install

# prod编译
npm run build

# 如若出错，退出
if [ $? -ne 0 ]; then
exit 1
fi

# 将编译结果移至output文件夹（此为jenkins要求的产出文件夹）
mkdir -p ./output/webroot
cp -r ./build/* ./output/webroot
# 
mkdir -p ./output/webroot/uiResources
cp ./build/static/index.html ./output/webroot/uiResources/index.html

# 修改生成文件的读写权限
chmod -R 755 ./output/webroot
