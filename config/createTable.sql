-- ������Ϣ��

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '����ID,ʵ��������',
  `categoryID` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '����ID',
  `productLineID` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��Ʒ��ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��������',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '״̬ 1�� 2��(ɾ��������Ϊ2)',
  `createTime` datetime NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`productLineID`),
  KEY `status` (`status`),
  KEY `categoryID` (`categoryID`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='������Ϣ��' AUTO_INCREMENT=1 ;



-- �����Ϣ��

CREATE TABLE IF NOT EXISTS `component` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '����ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '���ID',
  `categoryID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '����ID',
  `productLineID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��Ʒ��ID',
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�������',
  `userID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�û�ID',
  `remarks` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��ע',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '���� 1�� 2��(ɾ��������Ϊ2)',
  `createTime` datetime NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  KEY `componentID` (`componentID`),
  KEY `categoryID` (`categoryID`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='�����Ϣ��' AUTO_INCREMENT=1 ;


-- ��������ļ���Ϣ��

CREATE TABLE IF NOT EXISTS `componentFile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '����ID',
  `componentFileID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '����ļ�ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '���ID',
  `fileName` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�ļ�����',
  `path` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�ļ����·��',
  `createTime` datetime NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`),
  KEY `componentFileID` (`componentFileID`),
  KEY `componentID` (`componentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='��������ļ���Ϣ��' AUTO_INCREMENT=1 ;


-- �����ʷ��¼��Ϣ��

CREATE TABLE IF NOT EXISTS `componentHistory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '����ID',
  `componentID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '���ID',
  `componentHistoryID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�����ʷ��ϢID',
  `userID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '�û�ID',
  `html` text COLLATE utf8_bin NOT NULL COMMENT 'html����',
  `js` text COLLATE utf8_bin NOT NULL COMMENT 'js����',
  `css` text COLLATE utf8_bin NOT NULL COMMENT 'css����',
  `updateContent` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '���±�ע',
  `createTime` datetime NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='�����ʷ��¼��Ϣ��' AUTO_INCREMENT=1 ;


-- ��Ʒ����Ϣ��

CREATE TABLE IF NOT EXISTS `productLine` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '����ID��',
  `productLineID` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��Ʒ��ID',
  `name` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '��Ʒ������',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '���� 1�� 2��(ɾ��������Ϊ2)',
  `createTime` datetime NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `status` (`status`),
  KEY `productLineID` (`productLineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='��Ʒ����Ϣ��' AUTO_INCREMENT=1 ;