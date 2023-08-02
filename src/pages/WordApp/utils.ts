/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-08-01 02:04:15
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-01 19:51:54
 * @FilePath: /houtai/src/pages/WordApp/utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const cutImgPath = (path: string) => {
  if (path) {
    return 'http://apidev.leclubthallium.com'+'/'+path.split('./')[1];
    // return '/'+path.split('./')[1];
  }
  return '';
}