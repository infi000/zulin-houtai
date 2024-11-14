/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2024-05-27 23:21:28
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2024-05-27 23:21:44
 * @FilePath: /houtai/src/pages/ExperimentLeve2Manager/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'TeacherStatusManager';

// 0空闲，1已预约，2休假
export const STATUS_MAP:any = {
  0: '空闲',
  1: '已预约',
  2: '休假',
};
export default {
  NAMESPACE,
};
