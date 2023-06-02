import Cos from 'tblh-validate-upload/lib/cos';
// 打包后的配置
const buildedConfig = process.env.PROJECT_ENV ? {
  uploadAuthUrl: '/cos-api/cos/getUploadSigned',
  downloadAuthUrl: '/cos-api/cos/getDownloadSigned',
  fileProxyPrefix: 'cos-myqcloud',
} : {};

export const defaultConfig = {
  moduleId: 1,
  expiredTime: 3000000,
  uploadAuthUrl: '/cos/getUploadSigned',
  downloadAuthUrl: '/cos/getDownloadSigned',
  fileProxyPrefix: '',
  resDataKey: 'result',
  otmsProxyPrefix: 'cos-otms',
  ...buildedConfig,
};

// 根据配置生成实例
const cosInstance = new Cos(defaultConfig);

export default cosInstance;
