DROP TABLE IF EXISTS `ta_symbol`;

CREATE TABLE `ta_symbol`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`symbol` varchar(64),
    `technical_indicator_id`bigint(20),
	`custom_technical_indicator_id` bigint(20),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`custom_technical_indicator_id`) REFERENCES `ta_custom_technical_indicator` (`id`),
    FOREIGN KEY (`technical_indicator_id`) REFERENCES `ta_custom_technical_indicator` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;