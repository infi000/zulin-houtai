/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-01 16:44:22
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequestWx } from 'utils/request';
import { formatPage } from 'utils/utils';
// 8.    上传base64图片数据uploadbase64
// User/uploadbase64
// 必需参数：
// data:base64图片数据；数据需包含“data:image/jpeg;base64,”、“data:image/png;base64,”信息
// 返回
// {
//     "res": "succ",
//     "data": "./Uploads/Agreement/2023-07-31/cs_1000_reg_u_64c71e597cba1.jpeg"
// }

// 9.    签署协议agreement
// User/agreement
// 必需参数：
// registersign:会员入会协议图片相对路径
// safesign：安全责任协议图片相对路径
// registernum：入会协议编号
// 非必需参数：
// 	regusersign：入会协议会员签字图片相对路径
// 	reguserguardiansign：入会协议会员监护人签字图片相对路径
// 	safeuserguardiansign：安全责任协议乙方签字图片相对路径
// 	safeusersign：安全责任协议未成年人签字图片相对路径
// 返回
// {
//     "res": "succ",
//     "data": {
//         "regusersign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_reg_u_64c71e597cba1.jpeg",
//         "reguserguardiansign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_reg_p_64c71e597cc82.jpeg",
//         "registersign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_reg_f_64c71e597cd1d.jpeg",
//         "registersignpdf": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_reg_f_64c71e597cd1d.pdf",
//         "safeusersign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_safe_u_64c71e59860a5.jpeg",
//         "safeuserguardiansign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_safe_p_64c71e598615b.jpeg",
//         "safesign": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_safe_f_64c71e59861f3.jpeg",
//         "safesignpdf": "https://apidev.leclubthallium.com/Uploads/Agreement/2023-07-31/cs_1000_safe_f_64c71e59861f3.pdf"
//     }
// }

// 上传base64图片数据uploadbase64
export const postUploadbase64 = (params: any) =>
  postFormDataRequestWx<any>(
    '/User/uploadbase64',
    params,
  );
export const postAgreement = (params: any) =>
  postFormDataRequestWx<any>(
    '/User/agreement',
    params,
  );
  // 7.    获取年卡会员费用yearmoney
  // User/yearmoney
  // 参数：
  // 返回
  // {
  //   "res": "succ",
  //   "data":{"yearmoney":"20000.00"} 
  // }

export const postYearmoney = (params: any) =>
  postFormDataRequestWx<any>(
    '/User/yearmoney',
    params,
  );

export default {

};
