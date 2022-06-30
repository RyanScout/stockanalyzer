DROP TABLE IF EXISTS `ta_custom_technical_indicator`;

CREATE TABLE `ta_custom_technical_indicator`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`name`varchar(64),
	`technical_indicator_type`varchar(64),
	`technical_indicator_key`varchar(64),
	`short_sma_type` varchar(64),
    `long_sma_type` varchar(64),
    `lbb_type` varchar(64),
    `ubb_type`varchar(64),
    `standard_deviations` decimal (10,4),
	`evaluation_period`varchar(64),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE KEY `UK_name` (`name`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
