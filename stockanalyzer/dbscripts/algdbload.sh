#!/bin/sh

load_base(){
	echo "Loading alg_LBB_db.sql to ${1}"     
	if [ -f alg_LBB_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < alg_LBB_db.sql
	else
		echo "ERROR **** File alg_LBB_db.sql is missing ***"   
	fi

	echo "Loading alg_EMA_db.sql to ${1}"     
	if [ -f alg_EMA_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < alg_EMA_db.sql
	else
		echo "ERROR **** File alg_EMA_db.sql is missing ***"   
	fi
	
	echo "Loading alg_SMA_db.sql to ${1}"     
	if [ -f alg_SMA_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < alg_SMA_db.sql
	else
		echo "ERROR **** File alg_SMA_db.sql is missing ***"   
	fi

	echo "Loading alg_MACD_db.sql to ${1}"     
	if [ -f alg_MACD_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < alg_MACD_db.sql
	else
		echo "ERROR **** File alg_MACD_db.sql is missing ***"   
	fi

	echo "Loading alg_SL_db.sql to ${1}"     
	if [ -f alg_SL_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < alg_SL_db.sql
	else
		echo "ERROR **** File alg_SL_db.sql is missing ***"   
	fi

	echo "Done Loading db ${1}"
}
	
all() {
	load_base tradeanalyzer_main localhost cyborg c7b8rg#P
}

all
