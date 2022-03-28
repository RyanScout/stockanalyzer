/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as tradeActions from "./trade-actions";
import TradeView from "./view/trade-view";
import TradeModifyView from "./view/trade-modify-view";
import HistoricalAnalysisView from "./view/trade-historical-analysis-view";

function TradeContainer() {
  const tradeState = useSelector((state => state.trade));
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tradeActions.list());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "MODIFY": {
        dispatch(tradeActions.modifyItem(item));
        return true;
      }
      case "DELETE": {
        dispatch(tradeActions.deleteItem(item));
        return true;
      }
      case "ADD": {
        onAdd();
        return true;
      }
      case "SAVE": {
        onSave();
        return true;
      }
      case "HISTORICALLY_ANALYZE_DAY_TRADE": {
        historicallyAnalyzeDayTrade();
        return true;
      }
      case "HISTORICALLY_ANALYZE_SWING_TRADE":{
        historicallyAnalyzeSwingTrade();
        return true;
      }
      case "HISTORICAL_ANALYSIS_VIEW": {
        dispatch(tradeActions.historicalAnalysisView(item));
        return true;
      }
      case "CANCEL": {
        dispatch(tradeActions.cancelItem());
        return true;
      }
    }
  }

  function historicallyAnalyzeDayTrade(){
	if (tradeState.item != null) {
		dispatch(tradeActions.historicallyAnalyzeDayTrade(tradeState.item));
	  }
  }

  function historicallyAnalyzeSwingTrade(){
    if (tradeState.item != null) {
      dispatch(tradeActions.historicallyAnalyzeSwingTrade(tradeState.item));
      } 
  }

  function onSave() {
    if (tradeState.item != null) {
      dispatch(tradeActions.saveItem(tradeState.item));
    }
  }

  function onAdd() {
    dispatch(tradeActions.addItem());
  }

  function inputChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        if (event.target.type === "Number") 
          val = parseInt(event.target.value, 0);
        else if(event.target.type == "date")
          val = parseInt(event.target.valueAsNumber/1000)
        else 
          val = event.target.value;
      } else 
        val = event;
      let field = event.target.id;
      if(event.target.id === "operand-button")
      field = "operand";
      dispatch(tradeActions.inputChange(field, val));
    }
  }

  
  if (
    tradeState != null &&
    tradeState.view != "MODIFY" &&
    tradeState.view != "ADD" &&
    tradeState.view != "HISTORICAL_ANALYSIS" 
  ) {
    return (
      <TradeView
        itemState={tradeState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  } else if (
    tradeState != null &&
    (tradeState.view == "ADD" || tradeState.view == "MODIFY")
  ) {
    return (
      <TradeModifyView
        itemState={tradeState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } else if (
    tradeState != null &&
    tradeState.view == "HISTORICAL_ANALYSIS"
  ) {
    return (
      <HistoricalAnalysisView
        itemState={tradeState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } 
  else {
    return <div> Loading... </div>;
  }
}

export default TradeContainer;
