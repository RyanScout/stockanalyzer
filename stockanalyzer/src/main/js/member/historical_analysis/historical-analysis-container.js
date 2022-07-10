/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HistoricalAnalysisView from "../../memberView/historical_analysis/historical-analysis-view";
import * as historicalAnalysisActions from "./historical-analysis-actions";
import HistoricalDetailView from "../../memberView/historical_analysis/historical-detail-view";

function HistoricalAnalysisContainer() {
  const historicalAnalysisState = useSelector((state) => state.historicalAnalysis);
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(historicalAnalysisActions.list());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "DELETE": {
        dispatch(historicalAnalysisActions.deleteItem(item));
        return true;
      }
      case "HISTORICAL_DETAIL_VIEW":{
        dispatch(historicalAnalysisActions.historicalDetailView(item));
        return true
      }
      case "CANCEL": {
        dispatch(historicalAnalysisActions.cancelItem(item));
      }
    }
  }

  
  if (
    historicalAnalysisState != null &&
    historicalAnalysisState.view != "HISTORICAL_DETAIL"
  ) {
    return (
      <HistoricalAnalysisView
        itemState={historicalAnalysisState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  } else if(
    historicalAnalysisState != null &&
    historicalAnalysisState.view == "HISTORICAL_DETAIL"
  ){
    return (
      <HistoricalDetailView
        itemState={historicalAnalysisState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  }
  else {
    return <div> Loading... </div>;
  }
}

export default HistoricalAnalysisContainer;
