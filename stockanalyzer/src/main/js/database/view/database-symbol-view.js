import React from "react";
import moment from "moment";

export default function DatabaseSymbolView({
  onOption,
  itemState,
  inputChange,
}) {
  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.item != null &&
    itemState.item.technicalIndicators != null &&
    itemState.item.technicalIndicators.length > 0
  ) {
    for (let i = 0; i < itemState.item.technicalIndicators.length; i++) {
      if (itemState.item.technicalIndicators[i] === null) {
        continue;
      }
      let cells = [];
      cells.push(
        <td key="SYMBOL">{itemState.item.technicalIndicators[i].symbol}</td>
      );
      cells.push(
        <td key="FLASH_PERCENT">
          {Math.round(
            (itemState.item.technicalIndicators[i].flashed /
              itemState.item.technicalIndicators[i].checked) *
              1000
          ) / 10}
        </td>
      );
      cells.push(
        <td key="AVG_SUCCESS_PERCENT">
          {(() => {
            let total = 0.0;
            itemState.item.technicalIndicators[i].details.forEach((detail) => {
              total += detail.successPercent;
            });
            return (
              Math.round(
                (total / itemState.item.technicalIndicators[i].details.length) *
                  10
              ) / 10
            );
          })()}
        </td>
      );
      cells.push(
        <td key="DETAIL_VIEW">
          <i
            className="fa fas fa-chart-bar"
            title="DetailView"
            onClick={() =>
              onOption("DETAIL_VIEW", itemState.item.technicalIndicators[i])
            }
          ></i>{" "}
          <i
            className="fa fas fa-bolt"
            title="Backload"
            onClick={() =>
              onOption("BACKLOAD", itemState.item.technicalIndicators[i])
            }
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

  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Algorithm Analysis </p>
      </div>
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Flash %</th>
              <th scope="col">Avg. Success %</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
