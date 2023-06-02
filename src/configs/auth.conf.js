/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-04-03 10:25:14
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-05-31 10:58:17
 * @FilePath: /ot-resources/src/configs/auth.conf.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const authMap = {
  AUTH_ZONE_LIST: 10001, // 查询闲置场地信息列表 - /tsResource/zone/list 场地详情和闲置都用了
  AUTH_ZONE_SAVE: 10002, // 闲置场地上报 - /tsResource/zone/save
  AUTH_ZONE_GETDETAIL: 10003, // 获取闲置场地信息详细信息 - /tsResource/zone/getDetail
  AUTH_ZONE_EDIT: 10004, // 修改闲置场地信息 - /tsResource/zone/edit
  AUTH_ZONE_REVIEW: 10005, // 闲置场地审批 - /tsResource/zone/review
  AUTH_ZONE_IMPORT: 10006, // 导入闲置场地信息 - /tsResource/zone/import
  AUTH_ZONE_EXPORT: 10007, // 导出闲置场地信息 - /tsResource/zone/export
  AUTH_REWARDSINFO_LIST: 10008, // 查询奖励信息列表 - /tsResource/rewardsInfo/list
  AUTH_REWARDSINFO_SAVE: 10009, // 新增奖励信息 - /tsResource/rewardsInfo/save
  AUTH_REWARDSINFO_GETDETAIL: 10010, // 获取奖励信息详细信息 - /tsResource/rewardsInfo/getDetail
  AUTH_REWARDSINFO_EDIT: 10011, // 修改奖励信息 - /tsResource/rewardsInfo/edit
  AUTH_REWARDSINFO_VALID: 10012, // 奖励生效失效 - /tsResource/rewardsInfo/valid
  AUTH_REWARDSINFO_IMPORT: 10013, // 导入奖励信息 - /tsResource/rewardsInfo/import
  AUTH_REWARDSINFO_EXPORT: 10014, // 导出奖励信息 - /tsResource/rewardsInfo/export
  AUTH_PLACE_LIST: 10015, // 查询场地列表 - /tsResource/place/list
  AUTH_PLACE_SAVE: 10016, // 新增场地 - /tsResource/place/save
  AUTH_PLACE_GETDETAIL: 10017, // 获取场地详细信息 - /tsResource/place/getDetail 场地详情和场地管理都用了
  AUTH_PLACE_EDIT: 10018, // 修改场地 - /tsResource/place/edit
  AUTH_PLACE_VALID: 10019, // 场地生效失效 - /tsResource/place/valid
  AUTH_PLACE_IMPORT: 10020, // 导入场地 - /tsResource/place/import
  AUTH_PLACE_EXPORT: 10021, // 导出场地 - /tsResource/place/export
  AUTH_PLACE_SEARCH: 10022, // 场地查询 - /tsResource/place/search
  AUTH_DEVICE_LIST: 10023, // 查询设备列表 - /tsResource/device/list
  AUTH_DEVICE_SAVE: 10024, // 新增设备 - /tsResource/device/save
  AUTH_DEVICE_GETDETAIL: 10025, // 获取设备详细信息 - /tsResource/device/getDetail 设备管理和设备查询都用了
  AUTH_DEVICE_EDIT: 10026, // 修改设备 - /tsResource/device/edit
  AUTH_DEVICE_IMPORT: 10027, // 导入设备 - /tsResource/device/import
  AUTH_DEVICE_EXPORT: 10028, // 导出设备 - /tsResource/device/export
  AUTH_QUERYLOG: 10029, // 设备变更记录查询 - /tsResource/common/queryLog
  AUTH_SYSDICT: 10030, // 系统字典管理(只有菜单权限) - /tsResource/common/sys/dict
  AUTH_DEVICE_STATISTIC: 10031, // 设备统计 - /tsResource/device/statistic
  AUTH_DEVICE_IDLE_LIST: 10032, // 查询闲置设备列表 - /tsResource/device/idle/list
  AUTH_SCREEN: 10033, // 资源大屏 - /tsResource/screen
  AUTH_TRANS_LIST: 10034, // 运力管理 - /tsResource/trans/list
  AUTH_SYS_LIST: 10035, // 系统管理 - /tsResource/sys/list
  AUTH_USER_LIST: 10036, // 用户管理 - /tsResource/user/list
  AUTH_USERPRIVILEGE_LIST: 10037, // 权限管理 - /tsResource/userprivilege/list
  AUTH_SYSLOG_LIST: 10038, // 系统日志 - /tsResource/syslog/list
  AUTH_SYSCONF_LIST: 10039, // 配置管理 - /tsResource/sysconf/list
  AUTH_IMPORT_LIST: 10040, // 数据导入管理 - /tsResource/iemport/list
  AUTH_TRANS_SEARCH: 10041, // 运力查询 - /tsResource/trans/search
  AUTH_DEVICE_FREE_LIST: 10043,//		闲置设备管理		
  AUTH_DEVICE_FREE_SAVE: 10044,//			闲置设备新增	
  AUTH_DEVICE_FREE_DETAIL: 10045,//			闲置设备查看	
  AUTH_DEVICE_FREE_REVIEW: 10046,//			闲置设备审核	
  AUTH_DEVICE_FREE_IN: 10047,//			闲置设备导入	
  AUTH_DEVICE_FREE_OUT: 10048,//			闲置设备导出	
  AUTH_DEVICE_DISPATCH_LIST: 10049,//		设备调拨管理		
  AUTH_DEVICE_DISPATCH_SAVE: 10050,//			设备调拨新增	
  AUTH_DEVICE_DISPATCH_DETAIL: 10051,//			设备调拨查看	
  AUTH_DEVICE_DISPATCH_IN: 10052,//			设备调拨导入
  AUTH_DEVICE_DISPATCH_OUT: 10053,//			设备调拨导出
  AUTH_DEVICE_IDLE_NEW_LIST: 10054,//		查询设备列表		/tsResource/device/idle/newlist
};



export default authMap;