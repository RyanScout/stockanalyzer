
	
CREATE TABLE `sa_historical_detail`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `historical_analysis_id` bigint(20) NOT NULL,
	`identifier` varchar(64),
	`bought_at_time` bigint(20),
    `bought_at` decimal(10,4),
	`sold_at_time` bigint(20),
    `sold_at` decimal (10,4),
    `high_price` decimal (10,4),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`historical_analysis_id`) REFERENCES `sa_historical_analysis` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
