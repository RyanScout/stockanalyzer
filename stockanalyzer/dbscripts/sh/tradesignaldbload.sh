load_base(){
echo "Loading trade_signal_golden_cross.sql to ${1}"     
	if [ -f trade_signal_golden_cross.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_golden_cross.sql
	else
		echo "ERROR **** trade_signal_golden_cross.sql is missing ***"   
	fi


	echo "Loading trade_signal_lower_bollinger_band.sql to ${1}"     
	if [ -f trade_signal_lower_bollinger_band.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_lower_bollinger_band.sql
	else
		echo "ERROR **** trade_signal_lower_bollinger_band.sql is missing ***"   
	fi

	echo "Loading trade_signal_upper_bollinger_band.sql to ${1}"     
	if [ -f trade_signal_upper_bollinger_band.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_signal_upper_bollinger_band.sql
	else
		echo "ERROR **** trade_signal_upper_bollinger_band.sql is missing ***"   
	fi
}

all() {
	load_base tradeanalyzer_main localhost cyborg c7b8rg#P
}

all