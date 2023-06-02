/*
 * @Author: 李淳
 * @Date: 2020-06-23 20:07:44
 * @LastEditors: 黄斌旭
 * @LastEditTime: 2020-06-29 16:31:42
 * @Description: 基础信息config定义文件
 */
declare const baseConf: {
  name: string; // 项目名称
  entrance: string; // 项目入口
  iconFontScriptURL?: string; // 项目iconfont 本地路径
  aliIconFontSourceURL? : string; // 项目iconfont 阿里资源地址
};

// 基础表格配置
export declare const baseTableConf: {
  pageSize: number;
  showTotal: (total: number) => string;
  pageSizeOptions: string[];
};

// 国际化配置
export declare const i18nConf: {
  enable: boolean;
  defaultLocale?: string;
  locales?: string[];
  cookieName?: string;
};

export default baseConf;
