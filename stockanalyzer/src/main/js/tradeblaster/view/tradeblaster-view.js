/**
 *
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TradeBlasterView({ itemState, appPrefs, onOption }) {
  const nav = useNavigate();
  const x = window.location.pathname;

  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.items != null &&
    itemState.items.trades != null &&
    itemState.items.trades.length > 0
  ) {
    for (let i = 0; i < itemState.items.trades.length; i++) {
      let cells = [];
      let status = "Not Running";
      cells.push(<td key="NAME">{itemState.items.trades[i].name}</td>);
      cells.push(<td key="ORDERTYPE">{itemState.items.trades[i].orderType}</td>);
      cells.push(<td key="FREQUENCY">{itemState.items.trades[i].frequency}</td>);
      cells.push(<td key="STOCK">{itemState.items.trades[i].stock}</td>);
      cells.push(<td key="AMOUNT">{itemState.items.trades[i].amount}</td>);
      cells.push(<td key="ALGORITHUM">{itemState.items.trades[i].algorithm}</td>);
      cells.push(<td key="PROFITLIMIT">{itemState.items.trades[i].profitLimit}</td>);
      cells.push(
        <td key="TRAILINGSTOPPERCENT">
          {itemState.items.trades[i].trailingStopPercent}
        </td>
      );
      if (itemState.items.trades[i].runStatus == "Yes") {
        status = "Running";
      }
      cells.push(<td key="STATUS">{status}</td>);
      cells.push(
        <td key="MODIFY">
          <i
            className="fa fa-edit fa-1"
            title="Modify"
            onClick={() => onOption("MODIFY", itemState.items.trades[i])}
          ></i>{" "}
          <i
            className="fa fa-clipboard fa-1"
            title="Historical_Analysis"
            onClick={() => onOption("HISTORICAL_ANALYSIS_VIEW", itemState.items.trades[i])}
          ></i>{" "}
          <i
            className="fa fa-trash fa-1"
            title="Delete"
            onClick={() => onOption("DELETE", itemState.items.trades[i])}
          ></i>
        </td>
      );
      automatedTradeTableRows1.push(<tr key={i}>{cells}</tr>);
    }
  } else {
    automatedTradeTableRows1.push(
      <tr key="1">
        <td id="EMPTY">Empty</td>
      </tr>
    );
  }
  let automatedTradeTableBody1 = <tbody>{automatedTradeTableRows1}</tbody>;

  let automatedTradeTableRows2 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.items != null &&
    itemState.items.historicalAnalyses != null &&
    itemState.items.historicalAnalyses.length > 0
  ) {
    for (let i = 0; i < itemState.items.historicalAnalyses.length; i++) {
      let cells = [];
      cells.push(<td key="NAME">{itemState.items.historicalAnalyses[i].name}</td>);
      cells.push(<td key="STOCK">{itemState.items.historicalAnalyses[i].stock}</td>);
      cells.push(<td key="TYPE">{itemState.items.historicalAnalyses[i].type}</td>);
      cells.push(<td key="STARTDATE">{itemState.items.historicalAnalyses[i].stringedStartTime}</td>);
      cells.push(<td key="ENDDATE">{itemState.items.historicalAnalyses[i].stringedEndTime}</td>);
      cells.push(<td key="AMOUNT">{itemState.items.historicalAnalyses[i].amount}</td>);
      cells.push(<td key="ALGORITHUM">{itemState.items.historicalAnalyses[i].algorithm}</td>);
      cells.push(
        <td key="PROFITLIMIT">{itemState.items.historicalAnalyses[i].profitLimit}</td>
      );
      cells.push(
        <td key="TRAILINGSTOPPERCENT">
          {itemState.items.historicalAnalyses[i].trailingStopPercent}
        </td>
      );
      cells.push(<td key="MONEYSPENT">{itemState.items.historicalAnalyses[i].moneySpent}</td>);
      cells.push(<td key="TOTALVALUE">{itemState.items.historicalAnalyses[i].totalValue}</td>);
      cells.push(
        <td key="DELETE">
           <i
            className="fa fa-microchip fa-1"
            title="Modify"
            onClick={() => onOption("HISTORICAL_DETAIL_VIEW", itemState.items.historicalAnalyses[i])}
          ></i>{" "}
          <i
            className="fa fa-trash fa-1"
            title="Delete"
            onClick={() => onOption("DELETE", itemState.items.historicalAnalyses[i])}
          ></i>
        </td>
      );
      automatedTradeTableRows2.push(<tr key={i}>{cells}</tr>);
    }
  } else {
    automatedTradeTableRows2.push(
      <tr key="1">
        <td id="EMPTY">Empty</td>
      </tr>
    );
  }
  let automatedTradeTableBody2 = <tbody>{automatedTradeTableRows2}</tbody>;

  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Trade Blaster </p>
      </div>
      <div className="row">
        <div className="col-sm-9"> Automated Trades </div>
        <div className="col-sm-3">
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Modify"
            onClick={(e) => onOption("ADD", e)}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Order Type</th>
              <th scope="col">Frequency</th>
              <th scope="col">Stock</th>
              <th scope="col">Amount</th>
              <th scope="col">Algorithm</th>
              <th scope="col">Profit Limit</th>
              <th scope="col">Trailing Stop Percent</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
        <div className="col-sm-9"> Historical Analyses </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Type</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Algorithm</th>
              <th scope="col">Profit Limit</th>
              <th scope="col">Trailing Stop Percent</th>
              <th scope="col">Money Spent</th>
              <th scope="col">Total Value</th>
            </tr>
          </thead>
          {automatedTradeTableBody2}
        </table>
      </div>
    </div>
  );
}
