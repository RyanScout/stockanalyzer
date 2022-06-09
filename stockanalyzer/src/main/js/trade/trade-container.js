/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as tradeActions from "./trade-actions";
import TradeView from "./view/trade-view";
import TradeDetailView from "./view/trade-detail-view";
import TradeModifyView from "./view/trade-modify-view";
import HistoricalAnalysisView from "./view/trade-historical-analysis-view";
import TradeGraphView from "./view/trade-graph-view";

function TradeContainer() {
  const tradeState = useSelector((state) => state.trade);
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tradeActions.list());
    dispatch(tradeActions.getCustomTechnicalIndicators());
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
      case "RESET": {
        dispatch(tradeActions.resetItem(item));
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
      case "HISTORICALLY_ANALYZE_SWING_TRADE": {
        historicallyAnalyzeSwingTrade();
        return true;
      }
      case "HISTORICAL_ANALYSIS_VIEW": {
        dispatch(tradeActions.historicalAnalysisView(item));
        return true;
      }
      case "TRADE_DETAIL_VIEW": {
        dispatch(tradeActions.tradeDetailView(item));
        return true;
      }
      case "TRADE_GRAPH_VIEW":{
        dispatch(tradeActions.tradeGraphView(item));
        return true;
      }
      case "CANCEL": {
        dispatch(tradeActions.cancelItem());
        return true;
      }
    }
  }

  function historicallyAnalyzeDayTrade() {
    if (tradeState.item != null) {
      dispatch(tradeActions.historicallyAnalyzeDayTrade(tradeState.item));
    }
  }

  function historicallyAnalyzeSwingTrade() {
    if (tradeState.item != null) {
      dispatch(tradeActions.historicallyAnalyzeSwingTrade(tradeState.item));
    }
  }

  function onSave() {
    if (tradeState.item != null) {
      dispatch(tradeActions.saveItem(tradeState.item));
    }
  }

  const AutoComplete = (suggestions, field ) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState(tradeState.item[field]);

    const onChange = (e) => {
      let s = e.target.value + "";
      if (s.indexOf(" ") > -1) {
        s = s.substring(s.lastIndexOf(" ") + 1, s.length);
      }
      const userInput = s;

      const unLinked = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      setInput(e.target.value);
      manuallyInputChange(field,e.target.value);
      setFilteredSuggestions(unLinked);
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);
    };

    const onClick = (e) => {
      let s = input;
      if (s.indexOf(" ") > -1) {
        s = s.substring(0, s.lastIndexOf(" ") + 1);
        s.concat;
      } else {
        s = "";
      }
      s = s.concat(e.target.innerText);

      setFilteredSuggestions([]);
      setInput(s);
      manuallyInputChange(field,s)
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    };

    const onKeyDown = (key) => {
      if (key.keyCode === 13 || key.keyCode === 9) {
        setInput(filteredSuggestions[activeSuggestionIndex]);
        setFilteredSuggestions([]);
      }
    };

    const SuggestionsListComponent = () => {
      return filteredSuggestions.length ? (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-suggestions">
          <em>No Matching Algorithms</em>
        </div>
      );
    };

    return (
      <>
        <input
          type="text"
          className="form-control"
          autoCapitalize="off"
          autoComplete="off"
          id={field}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
        {showSuggestions && input && <SuggestionsListComponent />}
      </>
    );
  };

  function inputChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        if (event.target.type === "Number")
          val = parseInt(event.target.value, 0);
        else if (event.target.type == "date")
          val = parseInt(event.target.valueAsNumber / 1000);
        else val = event.target.value;
      } else val = event;
      let field = event.target.id;
      if (event.target.id === "operand-button") field = "operand";
      dispatch(tradeActions.inputChange(field, val));
    }
  }

  function manuallyInputChange(field, value) {
    dispatch(tradeActions.inputChange(field, value));
  }

  if (
    tradeState != null &&
    tradeState.view != "MODIFY" &&
    tradeState.view != "ADD" &&
    tradeState.view != "HISTORICAL_ANALYSIS" &&
    tradeState.view != "TRADE_DETAIL" &&
    tradeState.view != "TRADE_GRAPH"
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
        AutoComplete={AutoComplete}
      />
    );
  } else if (tradeState != null && tradeState.view == "HISTORICAL_ANALYSIS") {
    return (
      <HistoricalAnalysisView
        itemState={tradeState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } else if (tradeState != null && tradeState.view == "TRADE_DETAIL") {
    return (
      <TradeDetailView
        itemState={tradeState}
        appPrefs={appPrefs}
        inputChange={inputChange}
        onOption={onOption}
      />
    );
  } else if (tradeState != null && tradeState.view == "TRADE_GRAPH"){
    return (<TradeGraphView
    itemState = {tradeState}
    appPrefs = {appPrefs}
    onOption = {onOption}/>
    );
  }else{
    return <div> Loading... </div>;
  }
}

export default TradeContainer;
