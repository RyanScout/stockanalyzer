#!/bin/sh

load_base(){
	# echo "Dropping db ${1}"
   	# mysqladmin -h ${2} -u ${3} --password=${4} --force drop ${1}
   	
	# echo "Creating db ${1}"
  	# mysqladmin -h ${2} -u ${3} --password=${4} create ${1}
  	
  	echo "Loading trade_db.sql to ${1}"     
	if [ -f trade_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_db.sql
	else
		echo "ERROR **** File trade_db.sql is missing ***"   
	fi

	echo "Loading trade_detail_db.sql to ${1}"     
	if [ -f trade_detail_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_detail_db.sql
	else
		echo "ERROR **** File trade__detail_db.sql is missing ***"   
	fi

	# echo "Loading alg_LBB_db.sql to ${1}"     
	# if [ -f alg_LBB_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_LBB_db.sql
	# else
	# 	echo "ERROR **** File alg_LBB_db.sql is missing ***"   
	# fi

	# echo "Loading alg_EMA_db.sql to ${1}"     
	# if [ -f alg_EMA_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_EMA_db.sql
	# else
	# 	echo "ERROR **** File alg_EMA_db.sql is missing ***"   
	# fi
	
	# echo "Loading alg_SMA_db.sql to ${1}"     
	# if [ -f alg_SMA_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_SMA_db.sql
	# else
	# 	echo "ERROR **** File alg_SMA_db.sql is missing ***"   
	# fi

	# echo "Loading alg_MACD_db.sql to ${1}"     
	# if [ -f alg_MACD_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_MACD_db.sql
	# else
	# 	echo "ERROR **** File alg_MACD_db.sql is missing ***"   
	# fi

	# echo "Loading alg_SL_db.sql to ${1}"     
	# if [ -f alg_SL_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_SL_db.sql
	# else
	# 	echo "ERROR **** File alg_SL_db.sql is missing ***"   
	# fi

	# echo "Loading historical_analysis_db.sql to ${1}"     
	# if [ -f historical_analysis_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < historical_analysis_db.sql
	# else
	# 	echo "ERROR **** File historical_analysis_db is missing ***"   
	# fi
	
	# echo "Loading historical_detail_db.sql to ${1}"     
	# if [ -f historical_detail_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < historical_detail_db.sql
	# else
	# 	echo "ERROR **** File historical_detail_db.sql is missing ***"   
	# fi

	# echo "Loading asset_day_db.sql to ${1}"     
	# if [ -f asset_day_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < asset_day_db.sql
	# else
	# 	echo "ERROR **** File asset_day_db.sql is missing ***"   
	# fi

	# echo "Loading asset_minute_db.sql to ${1}"     
	# if [ -f asset_minute_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < asset_minute_db.sql
	# else
	# 	echo "ERROR **** File asset_minute_db.sql is missing ***"   
	# fi

	# echo "Loading alg_UBB_db.sql to ${1}"     
	# if [ -f alg_UBB_db.sql ]; then
   	# 	mysql -h ${2} -u ${3} --password=${4} ${1} < alg_UBB_db.sql
	# else
	# 	echo "ERROR **** File alg_UBB_db.sql is missing ***"   
	# fi
	
	# echo "Done Loading db ${1}"
}
	
all() {
	load_base tradeanalyzer_main localhost cyborg c7b8rg#P
}

all
