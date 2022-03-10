/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { element } from "prop-types";

export default function TradeBlasterModifyView({
  itemState,
  appPrefs,
  inputChange,
  onOption,
}) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let name = "";
  let stock = "";
  let buyAmount = "";
  let sellAmount = "";
  let algorithm = "";
  let algorithm2 = "";
  let status = "No";
  let runStatus = "Not Running";
  let trailingStopPercent = "";
  let profitLimit = "";
  if (itemState.item != null) {
    if (itemState.item.name != null) {
      name = itemState.item.name;
    }
    if (itemState.item.stock != null) {
      stock = itemState.item.stock;
    }
    if (itemState.item.trailingStopPercent != null) {
      trailingStopPercent = itemState.item.trailingStopPercent;
    }
    if (itemState.item.profitLimit != null) {
      profitLimit = itemState.item.profitLimit;
    }
    if (itemState.item.buyAmount != null) {
      buyAmount = itemState.item.buyAmount;
    }
    if (itemState.item.sellAmount != null) {
      sellAmount = itemState.item.sellAmount;
    }
    if (itemState.item.calendar != null) {
      calendarValue = itemState.item.calendar;
    }
    if (itemState.item.algorithm != null) {
      algorithm = itemState.item.algorithm;
    }
    if (itemState.item.algorithm2 != null) {
      algorithm2 = itemState.item.algorithm2;
    }
    if (itemState.item.status != null) {
      status = itemState.item.status;
      if (itemState.item.status == "Yes") {
        runStatus = "Running";
      } else {
        runStatus = "Not Running";
      }
    }
  }

  let saveTxt = "Save";

  let optionsStatus = [
    { label: "Yes", value: "Yes" },
    { label: "No", label: "No" },
  ];
  let selectOptionsStatus = [];
  for (let i = 0; i < optionsStatus.length; i++) {
    let label = "";
    if (
      optionsStatus[i].label == null &&
      optionsStatus[i].defaultText != null
    ) {
      label = optionsStatus[i].defaultText;
    } else if (optionsStatus[i].label != null) {
      label = optionsStatus[i].label;
    }
    selectOptionsStatus.push(
      <option key={i} value={optionsStatus[i].value}>
        {label}
      </option>
    );
  }

  let optionsAlgorithm = [
    { label: "Bollinger bands", value: "touchesLBB" },
    { label: "Golden Cross", value: "goldenCross" },
    { label: "MACD/Signal Line", value: "signalLineCross" },
  ];
  let selectOptionsAlgorithm = [];
  for (let i = 0; i < optionsAlgorithm.length; i++) {
    let label = "";
    if (
      optionsAlgorithm[i].label == null &&
      optionsAlgorithm[i].defaultText != null
    ) {
      label = optionsAlgorithm[i].defaultText;
    } else if (optionsAlgorithm[i].label != null) {
      label = optionsAlgorithm[i].label;
    }
    selectOptionsAlgorithm.push(
      <option key={i} value={optionsAlgorithm[i].value}>
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
        <div>
          <label htmlFor="Name">Name</label>
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
          <label htmlFor="Stock">Stock</label>
          <input
            type="Text"
            id="stock"
            name="stock"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={stock}
          />
        </div>
        <div>
          <label htmlFor="BuyAmount">Buy Amount</label>
          <input
            type="Text"
            id="buyAmount"
            name="buyAmount"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={buyAmount}
          />
        </div>
        <div>
          <label htmlFor="SellAmount">Sell Amount</label>
          <input
            type="Text"
            id="sellAmount"
            name="sellAmount"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={sellAmount}
          />
        </div>
        <div>
          <label htmlFor="Profit Limit">Profit Limit</label>
          <input
            type="Text"
            id="profitLimit"
            name="profitLimit"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={profitLimit}
          />
        </div>
        <div>
          <label htmlFor="TrailingStopPercent">Trailng Stop Percent</label>
          <input
            type="Text"
            id="trailingStopPercent"
            name="trailngStopPercent"
            className="form-control"
            autoCapitalize="off"
            onChange={inputChange}
            value={trailingStopPercent}
          />
        </div>
        <div>
          <label htmlFor="Algorithm">Algorithm</label>
          <select
            id="algorithm"
            name="algorithm"
            value={algorithm}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsAlgorithm}
          </select>
        </div>
        <div>
          <button
            id="operand-button"
            value="AND"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("formdiv").classList.add("active");
              document.getElementById("operand-button").classList.add("active");
              {inputChange(e)};
            }}
          >
            Add Another algorithm
          </button>
          <div id="formdiv">
            <input
              type="button"
              name="switch"
              id="operand"
              onClick={(e) => {
                e.preventDefault();
                var x = document.getElementById("label");
                if (x.innerHTML === "AND") {
                  x.innerHTML = "OR";
                  e.target.value = "OR";
                  {inputChange(e)};
                } else {
                  e.target.value = "AND";
                  x.innerHTML = "AND";
                  {inputChange(e)};
                }
              }}
            />
            <label id="label" for="operand">
              AND
            </label>
            <select
              id="algorithm2"
              name="algorithm2"
              value={algorithm2}
              className="form-control"
              onChange={inputChange}
            >
              {selectOptionsAlgorithm}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="Status">Active</label>
          <select
            id="status"
            name="status"
            value={status}
            className="form-control"
            onChange={inputChange}
          >
            {selectOptionsStatus}
          </select>
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
