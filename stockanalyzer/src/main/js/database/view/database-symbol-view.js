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
        <td key="SYMBOL">
          {itemState.item.technicalIndicators[i].symbol}
        </td>
      );
      cells.push(
        <td key="CHECKED">{itemState.item.technicalIndicators[i].checked}</td>
      );
      cells.push(
        <td key="FLASHED">{itemState.item.technicalIndicators[i].flashed}</td>
      );
      cells.push(
        <td key="SUCCESSES">
          {itemState.item.technicalIndicators[i].successes}
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
        <div className="col-sm-9" />
        <div className="col-sm-3">
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Modify"
            onClick={(e) => onOption("MODIFY_VIEW", e)}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Checks</th>
              <th scope="col">Flashes</th>
              <th scope="col">Successes</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
