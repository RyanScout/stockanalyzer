DROP TABLE IF EXISTS `ta_trade_detail`,`ta_trade`;

CREATE TABLE `ta_trade`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`identifier` varchar(64),
	`name` varchar(64),
	`order_type` varchar(64),
	`order_side` varchar(64),
	`evaluation_period` varchar(64),
	`symbol` varchar(64),
	`currency_type` varchar(64),
	`currency_amount` decimal(10,4),
	`profit_limit_type` varchar(64),
	`profit_limit_amount` decimal(10,4),
	`trailing_stop_type` varchar(64),
	`trailing_stop_amount` decimal(10,4),
	`buy_condition` varchar(128),
	`parseable_buy_condition` varchar(128),
	`sell_condition` varchar(128),
	`parseable_sell_condition` varchar (128),
	`iterations` varchar(64),
	`iterations_executed` bigint(20),
	`first_buy` bigint(20),
	`budget`decimal(10,4),
	`available_budget`decimal(10,4),
	`shares_held` decimal(10,4),
	`total_value` decimal(10,4),
	`recent_buy_order_id`varchar(64),
	`recent_sell_order_id`varchar(64),
	`status` varchar(48) NOT NULL,
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

CREATE TABLE `ta_trade_detail`
	(`id` bigint(20) NOT NULL AUTO_INCREMENT,
    `identifier`varchar(64),
    `trade_id` bigint(20) NOT NULL,
    `order_id` varchar(64),
    `order_side` varchar(64),
    `dollar_amount` varchar(64),
    `share_amount` varchar(64),
    `asset_price` decimal(10,4),
    `shares_held`decimal(10,4),
    `available_budget`decimal(10,4),
    `total_value`decimal(10,4),
    `placed_at`bigint(20),
    `filled_at`bigint(20),
    `order_condition`varchar(64),
	`status` varchar(64),
	`is_active` bit(1) DEFAULT 1,
	`is_archive` bit(1) DEFAULT 0,
	`is_locked` bit(1) DEFAULT 0,
	`lockowner_id` bigint(20) DEFAULT NULL,
	`modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`lock_time` datetime,
	`version` bigint(20) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`trade_id`) REFERENCES `ta_trade` (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
