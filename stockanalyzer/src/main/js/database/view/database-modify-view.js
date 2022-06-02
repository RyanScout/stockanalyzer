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
  let evaluationPeriod = "";
  let symbol = "";
  let technicalIndicatorType = "";
  let shortSMAType = "";
  let longSMAType = "";

  let symbols = [];
  let unorderedSymbols = [];

  if (itemState.item != null) {
    if (itemState.item.name != null) {
      name = itemState.item.name;
    }
    if (itemState.item.evaluationPeriod != null) {
      evaluationPeriod = itemState.item.evaluationPeriod;
    }
    if (itemState.item.symbol != null) {
      symbol = itemState.item.symbol;
    }
    if (itemState.item.technicalIndicatorType != null) {
      technicalIndicatorType = itemState.item.technicalIndicatorType;
    }
    if (itemState.item.shortSMAType != null) {
      shortSMAType = itemState.item.shortSMAType;
    }
    if (itemState.item.longSMAType != null) {
      longSMAType = itemState.item.longSMAType;
    }
    if (itemState.item.symbols != null) {
      let x = 0;
      itemState.item.symbols.forEach((symbol) => {
        x++;
        if (typeof symbol !== "string") {
          symbol = symbol.symbol;
        }
        symbols.push(symbol);
        unorderedSymbols.push(<ul key={x}>{symbol}</ul>);
      });
    }
  }

  let dynamicallyShowTradeSignalParams = (value) => {
    if (technicalIndicatorType == value) return "";
    else return "invisible-element";
  };

  function RenderTab(props) {
    return (
      <li className="nav-item" role="presentation">
        <button
          className={(() => {
            switch (technicalIndicatorType) {
              case props.value:
                return "nav-link active";
              default:
                return "nav-link";
            }
          })()}
          id="technicalIndicatorType"
          data-mdb-toggle="pill"
          role="tab"
          aria-selected={(() => {
            switch (technicalIndicatorType) {
              case props.value:
                return "true";
              default:
                return "false";
            }
          })()}
          value={props.value}
          onClick={inputChange}
        >
          {props.value}
        </button>
      </li>
    );
  }

  let optionsEvaluationPeriod = [
    { label: "DAY", value: "DAY" },
    { label: "MINUTE", value: "MINUTE" },
  ];
  let selectOptionsEvaluationPeriod = [];
  for (let i = 0; i < optionsEvaluationPeriod.length; i++) {
    let label = "";
    if (optionsEvaluationPeriod[i].label == null) {
    } else if (optionsEvaluationPeriod[i].label != null) {
      label = optionsEvaluationPeriod[i].label;
    }
    selectOptionsEvaluationPeriod.push(
      <option key={i} value={optionsEvaluationPeriod[i].value}>
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
          <label htmlFor="EvaluationPeriod">Evaluation Period</label>
          <select
            id="evaluationPeriod"
            name="evaluationPeriod"
            value={evaluationPeriod}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsEvaluationPeriod}
          </select>
        </div>
        <div>
          <label htmlFor="symbol">Symbol</label>
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Add Symbol"
            onClick={() => {
              symbols.push(symbol);
              manuallyInputChange("symbols", symbols);
              manuallyInputChange("symbol", "");
            }}
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
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num >= 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("shortSMAType", x);
              }
            }}
            value={shortSMAType + "-" + evaluationPeriod.toLowerCase()}
          />
          <label htmlFor="longSMAType">Long SMA Type</label>
          <input
            type="Text"
            id="longSMAType"
            name="longSMAType"
            className="form-control"
            autoCapitalize="off"
            onChange={(event) => {
              let x = event.target.value.substring(
                0,
                event.target.value.length - evaluationPeriod.length - 1
              );
              let num = Number(x);
              if (num > 999) return;
              if (
                event.target.value.endsWith(
                  "-" + evaluationPeriod.toLowerCase()
                )
              ) {
                manuallyInputChange("longSMAType", x);
              }
            }}
            value={longSMAType + "-" + evaluationPeriod.toLowerCase()}
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
            onClick={() => {
              manuallyInputChange("symbols", symbols);
              onOption("SAVE");
            }}
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
