/**
 * antd 校验包裹器
 * @param validator
 * @param msg
 */
export const antdValidatorWrapper = (validator: (val: any) => boolean, msg: string) => (rule: any, value: any) => {
  const res = validator(value);
  if (res) {
    return Promise.resolve();
  }
  return Promise.reject(msg);
};

// mobile: 11位号码，无国际区号，无+86；
// land：010-7654321, 0107654321, 7654321均可
// service: 400-800-9555, 400-8009555, 4008009555均可
// 手机号校验
export const telphoneValidator = (value: string) => {
  if (!value) {
    return true; // 此处不做必填校验
  }

  const mobileReg = /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/; // 移动电话的正则
  const landReg = /^(0\d{2,3}-?)?\d{7,8}$/; // 大陆电话的正则
  const serviceReg = /^[48]00-?\d{3}-?\d{4}$/; // 客服电话的正则
  return mobileReg.test(value) || landReg.test(value) || serviceReg.test(value);
};

// 身份证校验
export const idcreditValidator = (value: string) => {
  if (!value) {
    return false;
  }

  const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  if (/^\d{17}\d|x$/i.test(value)) {
    let sum = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < value.length - 1; i++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
    }
    // 计算模（固定算法）
    const idx = sum % 11;
    // 检验第18为是否与校验码相等
    return `${arrValid[idx]}` === value.substr(17, 1).toUpperCase();
  }
  return false;
};

export default {};
