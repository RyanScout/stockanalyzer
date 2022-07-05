DROP TABLE IF EXISTS `ta_SMA`;
	
CREATE TABLE `ta_SMA`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`epoch_seconds` bigint(20),
	`corresponding_day`bigint(20),
	`symbol` varchar(64),
	`type` varchar(64),
	`value` decimal(10,4),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE KEY `UK_epochSeconds_symbol_type` (`epoch_seconds`,`symbol`,`type`),
	INDEX `epoch_seconds` (`epoch_seconds`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
