/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { element } from "prop-types";
import { render } from "react-dom";

export default function DatabaseModifyView({
  itemState,
  inputChange,
  onOption,
  manuallyInputChange,
}) {
  let name = "";
  let evalPeriod = "";
  let symbol = "";
  let symbols = [];
  let identifier = "";
  let shortSMAType = "";
  let longSMAType = "";

  let unorderedSymbols = [];

  if (itemState.item != null) {
    if (itemState.item.name != null) {
      name = itemState.item.name;
    }
    if (itemState.item.evalPeriod != null) {
      evalPeriod = itemState.item.evalPeriod;
    }
    if (itemState.item.symbol != null) {
      symbol = itemState.item.symbol;
    }
    if(itemState.item.symbols != null){
      symbols = Array.from(itemState.item.symbols);
    }
    if (itemState.item.identifier != null) {
      identifier = itemState.item.identifier;
    }
    if (itemState.item.shortSMAType != null) {
      shortSMAType = itemState.item.shortSMAType;
    }
    if (itemState.item.longSMAType != null) {
      longSMAType = itemState.item.longSMAType;
    }
  }

  (function renderSymbols(){
    symbols.forEach(symbol=>{
      unorderedSymbols.push(
        <ul>{symbol}</ul>
      )
    })
  })()

  let dynamicallyShowTradeSignalParams = (value) => {
    if (identifier == value) return "";
    else return "invisible-element";
  };

  let orderSideClassName = (value) => {
    switch (identifier) {
      case value:
        return "nav-link active";
      default:
        return "nav-link";
    }
  };
  let orderSideAriaSelected = (value) => {
    switch (identifier) {
      case value:
        return "true";
      default:
        return "false";
    }
  };

  function RenderTab(props) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={orderSideClassName(props.value)}
          id="identifier"
          data-mdb-toggle="pill"
          role="tab"
          aria-selected={orderSideAriaSelected(props.value)}
          value={props.value}
          onClick={inputChange}
        >
          {props.value}
        </button>
      </li>
    );
  }

  let optionsEvalPeriod = [
    { label: "null", value: "null" },
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvalPeriod = [];
  for (let i = 0; i < optionsEvalPeriod.length; i++) {
    let label = "";
    if (optionsEvalPeriod[i].label == null) {
    } else if (optionsEvalPeriod[i].label != null) {
      label = optionsEvalPeriod[i].label;
    }
    selectOptionsEvalPeriod.push(
      <option key={i} value={optionsEvalPeriod[i].value}>
        {label}
      </option>
    );
  }

  let description = "Add Item";
  if (itemState.view == "MODIFY") {
    description = "Modify Item";
  }

  return (
    <div className="container">
      <div className="row">
        <div>{description}</div>
      </div>
      <div className="row">
        <ul className="nav nav-pills nav-fill mb-3" id="tabs" role="tablist">
          <RenderTab value="GoldenCross" />
          <RenderTab value="LowerBollingerBand" />
          <RenderTab value="UpperBollingerBand" />
        </ul>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="Text"
            id="name"
            name="name"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="EvalPeriod">Evaluation Period</label>
          <select
            id="evalPeriod"
            name="evalPeriod"
            value={evalPeriod}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsEvalPeriod}
          </select>
        </div>
        <div>
          <label htmlFor="symbol">Symbol</label>
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Add Symbol"
            onClick={
              ()=>{
                symbols.push(symbol)
                manuallyInputChange("symbols" , symbols)
                manuallyInputChange("symbol" , "")
              }
            }
          ></i>
          <input
            type="Text"
            id="symbol"
            name="symbol"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={symbol}
          />
        </div>

        <div className={dynamicallyShowTradeSignalParams("GoldenCross")}>
          <label htmlFor="shortSMAType">Short SMA Type</label>
          <input
            type="Text"
            id="shortSMAType"
            name="shortSMAType"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={shortSMAType}
          />
          <label htmlFor="longSMAType">Long SMA Type</label>
          <input
            type="Text"
            id="longSMAType"
            name="longSMAType"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={longSMAType}
          />
        </div>
        <div>
          <label htmlFor="current Symbols">Current Symbols</label>
          {unorderedSymbols}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm">
          <input
            type="submit"
            name="SaveButton"
            id="SaveButton"
            className="form-control btn-primary"
            value="Save"
            onClick={(e) => onOption("SAVE")}
          />
        </div>
        <div className="col-sm">
          <input
            type="submit"
            name="CreateGlobalsButton"
            id="CreateGlobalsButton"
            className="form-control btn-primary"
            value="CreateGlobals"
            onClick={(e) => onOption("CREATE_GLOBALS")}
          />
        </div>
        <div className="col-sm">
          <input
            type="submit"
            name="CancelButton"
            id="CancelButton"
            className="form-control"
            value="Cancel"
            onClick={(e) => onOption("CANCEL")}
          />
        </div>
      </div>
    </div>
  );
}
