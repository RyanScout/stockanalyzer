load_base(){
echo "Loading trade_signal_golden_cross_db.sql to ${1}"     
	if [ -f trade_signal_golden_cross_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_golden_cross_db.sql
	else
		echo "ERROR **** trade_signal_golden_cross_db.sql is missing ***"   
	fi


	echo "Loading trade_signal_lower_bollinger_band_db.sql to ${1}"     
	if [ -f trade_signal_lower_bollinger_band_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_lower_bollinger_band_db.sql
	else
		echo "ERROR **** trade_signal_lower_bollinger_band_db.sql is missing ***"   
	fi

	echo "Loading trade_signal_upper_bollinger_band_db.sql to ${1}"     
	if [ -f trade_signal_upper_bollinger_band_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_upper_bollinger_band_db.sql
	else
		echo "ERROR **** trade_signal_upper_bollinger_band_db.sql is missing ***"   
	fi
}

all() {
	load_base tradeanalyzer_main localhost cyborg c7b8rg#P
}

all