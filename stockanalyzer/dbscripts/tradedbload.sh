#!/bin/sh

load_base(){
  	echo "Loading trade_db.sql to ${1}"     
	if [ -f trade_db.sql ]; then
   		mysql -h ${2} -u ${3} --password=${4} ${1} < trade_db.sql
	else
		echo "ERROR **** File trade_db.sql is missing ***"   
	fi
}
	
all() {
	load_base stockanalyzer_main localhost cyborg c7b8rg#P
}

all
