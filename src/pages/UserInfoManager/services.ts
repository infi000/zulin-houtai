/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-03 23:26:54
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-06 22:03:27
 * @FilePath: /houtai/src/pages/ToolManager/services.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRequest, postRequest, postFormDataRequest, getWindowOpen } from 'utils/request';
import { formatPage, getCookie } from 'utils/utils';
import { ITableItem, TSearchParams, TCreateParams, TModifyParams } from './types';
// 3.1  用户列表
// User/search
// 必需参数：
// mtype: 1普通会员，2年会员
// 非必需参数：
// offset：偏移量
// count:需要的资源数量
// 返回：
// {
//     "res": "succ",
//     "data": {
//         "total": "1",
//         "users": [
//             {
//                 "id": "9199",
//                 "nickname": "厚瑜",
//                 "wxnickname": "微信用户",
//                 "wxavatarurl": "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
//                 "mobile": "13302386825",
//                 "birthday": "1987-10-02",
//                 "mtype": "1",
//                 "levelscore": "0",
//                 "face": "http://127.0.0.1/msshop/Uploads/Picture/2023-07-23/64bcb2b7489b8.jpg",
//                 "zipaiphoto": "http://127.0.0.1/msshop/Uploads/Picture/2023-07-23/64bcb2c95573d.jpg"
//             }
//         ]
//     }
// }
// 3.2  用户协议信息审核userverify
// User/userverify
// 必需参数：
// uid:用户id
// verify: 1审核通过，2审核不通过
// 非必需参数：
// verifycontent：审核不通过原因
// 返回：

// {
// 	"res": "succ",
// 	"data":"审核完成！" 
// }

// 3.3  获取协议详细信息agreementdetail
// User/agreementdetail
// 必需参数：
// 	uid:用户id
// 返回：
// {
//     "res": "succ",
//     "data": {
//         "uid": "9187",
//         "isagreement": "0",
//         "verify": "0",
//         "verifycontent": "",
//         "register": {
//             "id": "1",
//             "regnum": "cs_1000",
//             "company": "",
//             "companyaddress": "",
//             "username": "真名字",
//             "usercard": "110110200001012524",
//             "userphone": "18811112222",
//             "userguardianname": "监护人",
//             "userguardianphone": "18811112222",
//             "userguardianaddress": "监护人联系地址",
//             "yearmoney": "20000.00",
//             "companysigntime": "0",
//             "usersigntime": "1690727001",
//             "companyseal": "http://127.0.0.1/msshop",
//             "usersign": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_reg_u_64c672592c8de.jpeg",
//             "userguardiansign": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_reg_p_64c672592d600.jpeg",
//             "signpic": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_reg_u_64c672592c8de.jpeg",
//             "signpdf": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_reg_f_64c672592dd47.pdf"
//         },
//         "safe": {
//             "id": "1",
//             "company": "",
//             "userparent1des": "父亲",
//             "userparent1name": "家长名称1",
//             "userparent1phone": "18811112222",
//             "userparent1address": "家长联系地址1",
//             "userparent1remark": "额外信息1",
//             "userparent2des": "母亲",
//             "userparent2name": "家长名称2",
//             "userparent2phone": "18811112223",
//             "userparent2address": "家长联系地址2",
//             "userparent2remark": "额外信息2",
//             "usersigntime": "1690727001",
//             "usersign": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_safe_u_64c6725f7e24a.jpeg",
//             "userguardiansign": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_safe_p_64c6725f7f5b9.jpeg",
//             "signpic": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_safe_u_64c6725f7e24a.jpeg",
//             "signpdf": "http://127.0.0.1/msshop/Uploads/Agreement/2023-07-30/cs_1000_safe_f_64c6725f7fd70.pdf"
//         }
//     }
// }


// 获取列表
export const getDataListService = (params: TSearchParams & IPagination) =>
  getRequest<TSearchParams & IPagination, IListResponse<ITableItem>>(
    '/User/search',
    formatPage(params),
  );
  
// 设置setyearprice
export const postUserverify = (params:any) =>
  postFormDataRequest<any, IResponseData<string>>('/User/userverify', params);
  
// 设置setbg
export const postSetBgService = (params: { yearbg: any; tabg: any  }) =>
  postFormDataRequest< { yearbg: any; tabg: any  }, IResponseData<string>>('/User/setbg', params);


// 新建
export const postCreateService = (params: TCreateParams) =>
  postFormDataRequest<TCreateParams, IResponseData<string>>(
    '/Lease/tooladd',
    params,
  );

// 编辑
export const postEditService = (params: TModifyParams) =>
  postFormDataRequest<TModifyParams, IResponseData<string>>(
    '/Lease/toolmodify',
    params,
  );

// 删除
export const getDelService = (params: { tid: number }) =>
  postRequest<{ tid: number }, IResponseData<string>>('/Lease/toolscrapped', params);
// uid:用户id
// ut: 1不可验票，2可验票

export const postSetuserutService = (params: { uid: any; ut: '1' | '2' }) =>
  getRequest<{ uid: any; ut: '1' | '2' }, IResponseData<string>>('/User/setuserut', params);


// 详情
export const getDataDetailService = (params: { uid: any }) =>
  getRequest<{ uid: any }, IResponseData<ITableItem>>(
    '/User/agreementdetail',
    params,
  );

// 导出用户列表
export const getUserExportService = (params: TSearchParams) =>{
  getWindowOpen('/User/userexport',
    params,
  );
  return Promise.resolve({} as any);
}

export default {
  getDataListService,
  postCreateService,
  postEditService,
  getDelService,
  getDataDetailService,
  postSetuserutService,
  postSetBgService,
  postUserverify,
  getUserExportService,
};
