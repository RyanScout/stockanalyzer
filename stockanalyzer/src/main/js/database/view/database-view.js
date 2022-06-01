import React from "react";
import moment from "moment";

export default function DatabaseView({ onOption, itemState, inputChange }) {
  let automatedTradeTableRows1 = [];
  // fill latest tradestable
  if (
    itemState != null &&
    itemState.items != null &&
    itemState.items.length > 0
  ) {
    for (let i = 0; i < itemState.items.length; i++) {
      let cells = [];
      cells.push(<td key="NAME">{itemState.items[i].name}</td>);
      cells.push(<td key="EVALPERIOD">{itemState.items[i].evalPeriod}</td>);
      cells.push(<td key="SYMBOL">{itemState.items[i].symbol}</td>);
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
              <th scope="col">Name</th>
              <th scope="col">Evaluation Period</th>
              <th scope="col">Symbol</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody1}
        </table>
      </div>
    </div>
  );
}
