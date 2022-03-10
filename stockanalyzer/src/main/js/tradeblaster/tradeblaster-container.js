/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as tradeBlasterActions from "./tradeblaster-actions";
import TradeBlasterView from "../tradeblaster/view/tradeblaster-view";
import TradeBlasterModifyView from "../tradeblaster/view/tradeblaster-modify-view";
import HistoricalAnalysisView from "./view/tradeblaster-historicalAnalysis-view";
import HistoricalDetailView from "./view/tradeblaster-historicalDetail-view";

function TradeBlasterContainer() {
  const tradeBlasterState = useSelector((state) => state.tradeblaster);
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tradeBlasterActions.list());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "MODIFY": {
        dispatch(tradeBlasterActions.modifyItem(item));
        return true;
      }
      case "DELETE": {
        dispatch(tradeBlasterActions.deleteItem(item));
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
        dispatch(tradeBlasterActions.historicalAnalysisView(item));
        return true;
      }
      case "HISTORICAL_DETAIL_VIEW":{
        dispatch(tradeBlasterActions.historicalDetailView(item));
        return true
      }
      case "CANCEL": {
        dispatch(tradeBlasterActions.cancelItem());
        return true;
      }
    }
  }

  function historicallyAnalyzeDayTrade(){
	if (tradeBlasterState.item != null) {
		dispatch(tradeBlasterActions.historicallyAnalyzeDayTrade(tradeBlasterState.item));
	  }
  }

  function historicallyAnalyzeSwingTrade(){
    if (tradeBlasterState.item != null) {
      dispatch(tradeBlasterActions.historicallyAnalyzeSwingTrade(tradeBlasterState.item));
      } 
  }

  function onSave() {
    if (tradeBlasterState.item != null) {
      dispatch(tradeBlasterActions.saveItem(tradeBlasterState.item));
    }
  }

  function onAdd() {
    dispatch(tradeBlasterActions.addItem());
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
      dispatch(tradeBlasterActions.inputChange(field, val));
    }
  }

  
  if (
    tradeBlasterState != null &&
    tradeBlasterState.view != "MODIFY" &&
    tradeBlasterState.view != "ADD" &&
    tradeBlasterState.view != "HISTORICAL_ANALYSIS" &&
    tradeBlasterState.view != "HISTORICAL_DETAIL"
  ) {
    return (
      <TradeBlasterView
        itemState={tradeBlasterState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  } else if (
    tradeBlasterState != null &&
    (tradeBlasterState.view == "ADD" || tradeBlasterState.view == "MODIFY")
  ) {
    return (
      <TradeBlasterModifyView
        itemState={tradeBlasterState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } else if (
    tradeBlasterState != null &&
    tradeBlasterState.view == "HISTORICAL_ANALYSIS"
  ) {
    return (
      <HistoricalAnalysisView
        itemState={tradeBlasterState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } else if(
    tradeBlasterState !=null &&
    tradeBlasterState.view == "HISTORICAL_DETAIL"
  ){
    return (
      <HistoricalDetailView
        itemState={tradeBlasterState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  }
  else {
    return <div> Loading... </div>;
  }
}

export default TradeBlasterContainer;
