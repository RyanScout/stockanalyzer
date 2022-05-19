DROP TABLE IF EXISTS `ta_user_trade_signal_key`,`ta_user`;

CREATE TABLE `ta_user`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `ta_user_trade_signal_key`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`user_id`bigint(20),
	`user_trade_signal_key` varchar(64),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `ta_user` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
