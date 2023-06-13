CREATE TABLE `ms_zl_house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumbinal` varchar(200) NOT NULL DEFAULT '',
  `des` text NOT NULL,
  `price` decimal(11,2) NOT NULL DEFAULT '0.00',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_house_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hid` int(11) NOT NULL DEFAULT '0',
  `pic` varchar(200) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '0',
  `des` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_experiment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumbinal` varchar(200) NOT NULL DEFAULT '',
  `des` text NOT NULL,
  `deposit` decimal(11,2) NOT NULL DEFAULT '0.00',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_experiment_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eid` int(11) NOT NULL DEFAULT '0',
  `pic` varchar(200) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '0',
  `des` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_toolbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumbinal` varchar(200) NOT NULL DEFAULT '',
  `des` text NOT NULL,
  `ctime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_toolbox_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tbid` int(11) NOT NULL DEFAULT '0',
  `pic` varchar(200) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '0',
  `des` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_tool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyid` varchar(100) NOT NULL DEFAULT '',
  `title` varchar(100) NOT NULL DEFAULT '',
  `thumbinal` varchar(200) NOT NULL DEFAULT '',
  `des` text NOT NULL,
  `price` decimal(11,2) NOT NULL DEFAULT '0.00',
  `tbid` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_tool_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL DEFAULT '0',
  `pic` varchar(200) NOT NULL DEFAULT '',
  `sort` int(11) NOT NULL DEFAULT '0',
  `des` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_prebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0',
  `eid` int(11) NOT NULL DEFAULT '0',
  `etitle` varchar(100) NOT NULL DEFAULT '',
  `edeposit` decimal(11,2) NOT NULL DEFAULT '0.00',
  `hid` int(11) NOT NULL DEFAULT '0',
  `htitle` varchar(100) NOT NULL DEFAULT '',
  `hprice` decimal(11,2) NOT NULL DEFAULT '0.00',
  `htotalprice` decimal(11,2) NOT NULL DEFAULT '0.00',
  `starttime` int(11) NOT NULL DEFAULT '0',
  `endtime` int(11) NOT NULL DEFAULT '0',
  `duration` int(11) NOT NULL DEFAULT '0',
  `uphone` varchar(11) NOT NULL DEFAULT '',
  `remark` text NOT NULL,
  `pbid` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_prebook_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL DEFAULT '0',
  `uid` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_prebook_toolbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tbid` int(11) NOT NULL DEFAULT '0',
  `bid` int(11) NOT NULL DEFAULT '0',
  `tprice` decimal(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ms_zl_prebook_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` varchar(64) NOT NULL DEFAULT '',
  `uid` int(11) NOT NULL DEFAULT '0',
  `bid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(100) NOT NULL DEFAULT '',
  `deposit` decimal(11,2) NOT NULL DEFAULT '0.00',
  `total` decimal(11,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(11,2) NOT NULL DEFAULT '0.00',
  `scorecount` decimal(11,2) NOT NULL DEFAULT '0.00',
  `totalpay` decimal(11,2) NOT NULL DEFAULT '0.00',
  `payuid` int(11) NOT NULL DEFAULT '0',
  `poid` int(11) NOT NULL DEFAULT '0',
  `ostatus` tinyint(4) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `uptime` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

1、	租赁房间表zl_house
id
title:房间标题
thumbinal:房间预览图
des:房间说明
price:房间单价，元/小时
ctime:房间创建时间
status:状态，1正常，0下线
2、	租赁房间图片表zl_house_pic
id
hid:租赁房间id
pic:图片路径
sort：排序值
des:图片描述
3、	实验项目表zl_experiment
id
title:实验项目标题
thumbinal:缩略图
des:项目描述
deposit:押金价格
ctime:项目创建时间
status:实验项目状态，1正常，0关闭
4、	实验项目图片表zl_experiment_pic
id
eid:实验项目id
pic:图片路径
sort：排序值
des:图片描述

5、	工具箱表zl_toolbox
id
title:工具箱标题
thumbinal:工具箱缩略图
des:工具箱说明
ctime:工具箱创建时间
status:状态，1正常，0关闭
6、	工具箱图片表zl_toolbox_pic
id
tbid:工具箱id
pic:图片路径
sort：排序值
des:图片描述

7、	工具表zl_tool
id
companyid:总公司id
title:工具名称
thumbinal:预览图
des:工具使用说明
price:工具租赁价格，单位元
tbid:所属工具箱id
ctime:工具创建时间
status:工具状态，1正常，0关闭，2报废
8、	工具图片表zl_tool_pic
id
tid:工具id
pic:图片路径
sort：排序值
des:图片描述

9、	预约表zl_prebook
id
uid:预约创建人
eid:实验项目id
etitle:实验项目名称
edeposit:实验押金
hid:房间id
htitle:房间名称
hprice:房间单价，元/小时
htotalprice:房间总价格
starttime:预约开始时间
endtime:预约截止时间
duration:预约时长，分钟
uphone:预约人手机号
remark:备注信息
pbid:父预约id（多人预约）
ctime:预约创建时间
status:状态，1正常

10、	预约工具表zl_prebook_toolbox
id
tbid:工具包id
bid:预约id 
tid:工具id
tprice:工具价格
11、	预约人员表zl_prebook_user
id
bid:预约id
uid:预约参与者id
ctime:预约创建时间
12、	预约订单表zl_prebook_order
id
orderid:订单号
uid:预约用户id
bid:预约id
title:订单标题
deposit:包含的押金金额
total:总金额
discount:会员优惠金额
scorecount:积分抵扣金额
totalpay:需要支付金额
payuid:付款用户id
poid:父订单id（续订）
ostatus:0已下单未支付，1已支付未核销，2完成，3关闭
ctime:订单创建时间
uptime:更新时间
status:状态，1正常



