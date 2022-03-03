
	
CREATE TABLE `sa_stock_minute`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`stock_day_id` bigint(20) NOT NULL,
	`type` varchar (64),
	`epoch_seconds` bigint(20),
	`stock` varchar(64),
	`value` decimal(10,4),
	`volume` bigint(20),
	`vwap` decimal(10,4),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE KEY `UK_epoch_stock_minute` (`epoch_seconds`,`stock`),
	FOREIGN KEY (`stock_day_id`) REFERENCES `sa_stock_day` (`id`) ON DELETE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
