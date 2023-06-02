/*
 * @Author: 董方旭
 * @Date: 2021-03-04 11:43:30
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-03-31 15:19:46
 * @Description: longan埋点参数配置
 * 参考：import { ILonganConfig } from 'longan-sdk/dist/bundle';
 */

const config = {
    open: true, // 是否开启longan
    project_name: 'otResource', // 项目名称
    env: {
        uat: 'tsic.sftcwl.com.cn',
        online: 'ts-rmp.sf-express.com',
        develop: window.location.host
    },
    loginUser: '',
    filter_fields: [], // 过滤掉不想上传的字段
    filter_confitions: [], // 过滤掉不想上传的功能
    additional_info: {}, // 自定义信息
    hash_route: false, // 开启代表有hash路由流量统计
    filter_error_msg: ['ResizeObserver loop limit exceeded'] // 过滤不想上报的错误。使用indexOf做匹配，请传errorMessage的关键字
}
export default config;