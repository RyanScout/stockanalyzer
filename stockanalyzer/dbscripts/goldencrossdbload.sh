#!/bin/sh

load_base(){
  	echo "Loading trade_signal_golden_cross_db.sql to ${1}"     
	if [ -f trade_signal_golden_cross_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_golden_cross_db.sql
	else
		echo "ERROR **** File trade_signal_golden_cross_db.sql is missing ***"   
	fi

		echo "Loading golden_cross_detail_db.sql to ${1}"     
	if [ -f golden_cross_detail_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < golden_cross_detail_db.sql
	else
		echo "ERROR **** File golden_cross_detail_db.sql is missing ***"   
	fi
}
	
all() {
	load_base tradeanalyzer_main localhost cyborg c7b8rg#P
}

all
