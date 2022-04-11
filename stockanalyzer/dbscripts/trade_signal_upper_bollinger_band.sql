
	
CREATE TABLE `ta_upper_bollinger_band`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
    `flashing` bit(1) DEFAULT 0,
	`symbol` varchar(64),
	`ubb_type` varchar(64),
    `standard_deviation_value` decimal (10,4),
    `flashed`bigint(20) DEFAULT 0,
    `checked`bigint(20) DEFAULT 0,
    `first_check`bigint(20) DEFAULT NULL,
    `last_flash`bigint(20) DEFAULT NULL,
    `last_check`bigint(20) DEFAULT NULL,
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE KEY `UK_symbol_ubb_type_standard_deviation_value` (`symbol`,`ubb_type`,`standard_deviation_value`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
