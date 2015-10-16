-- 分类信息表

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID,实际中无用',
  `categoryID` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '分类ID',
  `productLineID` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '产品线ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '分类名称',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态 1开 2关(删除即设置为2)',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`productLineID`),
  KEY `status` (`status`),
  KEY `categoryID` (`categoryID`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='分类信息表' AUTO_INCREMENT=1 ;



-- 组件信息表

CREATE TABLE IF NOT EXISTS `component` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件ID',
  `categoryID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '分类ID',
  `productLineID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '产品线ID',
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件名称',
  `userID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户ID',
  `remarks` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '备注',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '开关 1开 2关(删除即设置为2)',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  KEY `componentID` (`componentID`),
  KEY `categoryID` (`categoryID`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='组件信息表' AUTO_INCREMENT=1 ;


-- 组件内容文件信息表

CREATE TABLE IF NOT EXISTS `componentFile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `componentFileID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件文件ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件ID',
  `fileName` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '文件名称',
  `path` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '文件存放路径',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `componentFileID` (`componentFileID`),
  KEY `componentID` (`componentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='组件内容文件信息表' AUTO_INCREMENT=1 ;


-- 组件历史记录信息表

CREATE TABLE IF NOT EXISTS `componentHistory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件ID',
  `componentHistoryID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '组件历史信息ID',
  `userID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户ID',
  `html` text COLLATE utf8_bin NOT NULL COMMENT 'html代码',
  `js` text COLLATE utf8_bin NOT NULL COMMENT 'js代码',
  `css` text COLLATE utf8_bin NOT NULL COMMENT 'css代码',
  `updateContent` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '更新备注',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='组件历史记录信息表' AUTO_INCREMENT=1 ;


-- 产品线信息表

CREATE TABLE IF NOT EXISTS `productLine` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID表',
  `productLineID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '产品线ID',
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '产品线名称',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '开关 1开 2关(删除即设置为2)',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `status` (`status`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='产品线信息表' AUTO_INCREMENT=1 ;