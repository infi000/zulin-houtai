/*
 * @Author: 李淳
 * @Date: 2020-06-21 12:23:57
 * @LastEditors: 黄斌旭
 * @LastEditTime: 2020-06-29 16:31:31
 * @Description: 小图标的引入使用svg上传iconfont，如若项目无法访问ali cdn，则将脚本放置于本地
 */
import { createFromIconfontCN } from '@ant-design/icons';
import ProjectConfig from 'configs/base.conf';

const IconFont = createFromIconfontCN({
  scriptUrl: ProjectConfig.iconFontScriptURL,
});

export default IconFont;
