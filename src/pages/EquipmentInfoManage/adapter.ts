import { ITableItem } from './types';

export const formatPostParams = (params: ITableItem) => {
  const {
    maintenanceStartDate, // 维保开始日期
    maintenanceEndDate, // 维保结束日期
    retirementDate, // 报废日期
    acquisitionDate, // 购置日期
    startDate, // 开始日期
    outgoingDate, // 外投日期
    outgoingDeadlineDate, // 外投截止日期
    exerciseDate, // 行权日期
    handlingDate, // 处置日期
    createTime, // 创建时间
    updateTime, // 更新时间
    deviceStatus, // 设备状态
    costCenterAddress, // 成本中心地址,不提交给后端。！
    ...rest
  } = params;

  let f_maintenanceStartDate;
  if (maintenanceStartDate) {
    f_maintenanceStartDate = (maintenanceStartDate as any).format('YYYY-MM-DD'); // 维保开始日期
  }
  let f_maintenanceEndDate;
  if (maintenanceEndDate) {
    f_maintenanceEndDate = (maintenanceEndDate as any).format('YYYY-MM-DD'); // 维保结束日期
  }
  let f_retirementDate;
  if (retirementDate) {
    f_retirementDate = (retirementDate as any).format('YYYY-MM-DD'); // 报废日期
  }
  let f_acquisitionDate;
  if (acquisitionDate) {
    f_acquisitionDate = (acquisitionDate as any).format('YYYY-MM-DD'); // 购置日期
  }
  let f_startDate;
  if (startDate) {
    f_startDate = (startDate as any).format('YYYY-MM-DD'); // 开始日期
  }
  let f_outgoingDate;
  if (outgoingDate) {
    f_outgoingDate = (outgoingDate as any).format('YYYY-MM-DD'); // 外投日期
  }
  let f_outgoingDeadlineDate;
  if (outgoingDeadlineDate) {
    f_outgoingDeadlineDate = (outgoingDeadlineDate as any).format('YYYY-MM-DD'); // 外投截止日期
  }
  let f_exerciseDate;
  if (exerciseDate) {
    f_exerciseDate = (exerciseDate as any).format('YYYY-MM-DD'); // 行权日期
  }
  let f_handlingDate;
  if (handlingDate) {
    f_handlingDate = (handlingDate as any).format('YYYY-MM-DD'); // 处置日期
  }
  let f_createTime;
  if (createTime) {
    f_createTime = (createTime as any).format('YYYY-MM-DD'); // 创建时间
  }
  let f_updateTime;
  if (updateTime) {
    f_updateTime = (updateTime as any).format('YYYY-MM-DD'); // 更新时间
  }
  let f_deviceStatus;
  if (deviceStatus) {
    f_deviceStatus = (deviceStatus as any).join(';'); // 设备状态
  }

  return {
    ...rest,
    maintenanceStartDate: f_maintenanceStartDate, // 维保开始日期
    maintenanceEndDate: f_maintenanceEndDate, // 维保结束日期
    retirementDate: f_retirementDate, // 报废日期
    acquisitionDate: f_acquisitionDate, // 购置日期
    startDate: f_startDate, // 开始日期
    outgoingDate: f_outgoingDate, // 外投日期
    outgoingDeadlineDate: f_outgoingDeadlineDate, // 外投截止日期
    exerciseDate: f_exerciseDate, // 行权日期
    handlingDate: f_handlingDate, // 处置日期
    createTime: f_createTime, // 创建时间
    updateTime: f_updateTime, // 更新时间
    deviceStatus: f_deviceStatus, // 设备状态
  };
};

export const formatSearchParams = (params: any) => {
  const {
    acquisitionDate, // 购置日期
    deviceStatusQuery, // 设备状态查询专用字段,逗号分割
    ...rest
  } = params;
  let f_acquisitionDateEnd;
  let f_acquisitionDateStart;
  let f_deviceStatusQuery;
  if (acquisitionDate && Array.isArray(acquisitionDate)) {
    f_acquisitionDateStart = ([...acquisitionDate][0] as any).format('YYYY-MM-DD'); // 购置日期
    f_acquisitionDateEnd = ([...acquisitionDate][1] as any).format('YYYY-MM-DD'); // 购置日期
  }
  if (deviceStatusQuery && Array.isArray(deviceStatusQuery)) {
    f_deviceStatusQuery = deviceStatusQuery.join(',');
  }
  return {
    ...rest,
    acquisitionDateStart: f_acquisitionDateStart, // 购置日期
    acquisitionDateEnd: f_acquisitionDateEnd, // 购置日期
    deviceStatusQuery: f_deviceStatusQuery, // 设备状态查询专用字段,逗号分割
  };
};
