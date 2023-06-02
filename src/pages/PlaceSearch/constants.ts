// namespace 使用大驼峰，理论上与文件夹命名一致
export const NAMESPACE = 'PlaceSearch';

// 所属大区，所属城市，仓库状态，仓库类型，消防等级，闲置面积，可售面积
export const initEnum = 'warehouse_region;warehouse_city;warehouse_status;warehouse_type;building_fire_Level;area_class';

// 排序方式：1=倒序、2=正序
export const SEARCH_ORDER = [
  {
    label: '按闲置面积从高到低', value: 'idleAreaTotal_1',
  },
  {
    label: '按闲置面积从低到高', value: 'idleAreaTotal_2',
  },
  {
    label: '按可售面积从高到低', value: 'saleAreaTotal_1',
  },
  {
    label: '按可售面积从低到高', value: 'saleAreaTotal_2',
  },
];
