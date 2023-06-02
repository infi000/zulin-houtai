/**
 * 权限检查
 * @param {*} authCode 权限码
 * @param {*} authList 用户权限列表，在store.global中有存储
 * @use { checkAuth(authCode, authList)(<Button />) }
 */
export function checkAuth(authCode: Auth.Code, authList: Auth.Code[]) {
  return (component: any) => {
    if (!authCode) {
      return component;
    }
    const authCodeNumber = parseInt(authCode.toString(), 10);
    const authCodeString = authCode.toString();
    const authStringList = authList.map((item: number) => `${item}`);

    if (authList.indexOf(authCodeNumber) > -1 || authStringList.indexOf(authCodeString) > -1) {
      return component;
    }
    return null;
  };
}

export default checkAuth;
