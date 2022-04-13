import React from "react";
import moment from "moment";

export default function DatabaseView({ backload, itemState }) {
  let genericOrderCondition = {
    symbol:"",
    flashed: 0,
    checked: 0,
  }
  let goldenCross = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };
  let lowerBollingerBand = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };
  let upperBollingerBand = {
    day: genericOrderCondition,
    minute: genericOrderCondition,
  };

  if (itemState != null) {
    if (itemState.cache != null) {
      if (itemState.cache.goldenCross != null
        &&itemState.cache.goldenCross.day != null
        &&itemState.cache.goldenCross.minute != null) {
        goldenCross = itemState.cache.goldenCross;
      }
      if (itemState.cache.lowerBollingerBand != null
        &&itemState.cache.lowerBollingerBand.day != null
        &&itemState.cache.lowerBollingerBand.minute != null) {
        lowerBollingerBand = itemState.cache.lowerBollingerBand;
      }
      if (itemState.cache.upperBollingerBand != null
        &&itemState.cache.upperBollingerBand.day != null
        &&itemState.cache.upperBollingerBand.minute != null) {
        upperBollingerBand = itemState.cache.upperBollingerBand;
      }
    }
  }

  let automatedTradeTableRows = [];

  let cells1 = [];
  cells1.push(<td key="ORDERCONDITION">Golden Cross</td>);
  cells1.push(<td key="PERIOD">Day</td>);
  cells1.push(<td key="CHECKED">{String(goldenCross.day.checked)}</td>);
  cells1.push(<td key="FLASHED">{String(goldenCross.day.flashed)}</td>);
  cells1.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round((goldenCross.day.flashed / goldenCross.day.checked) * 1000) /
        10
      )}%
    </td>
  );

  let cells2 = [];
  cells2.push(<td key="ORDERCONDITION">Golden Cross</td>);
  cells2.push(<td key="PERIOD">Minute</td>);
  cells2.push(<td key="CHECKED">{String(goldenCross.minute.checked)}</td>);
  cells2.push(<td key="FLASHED">{String(goldenCross.minute.flashed)}</td>);
  cells2.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round(
          (goldenCross.minute.flashed / goldenCross.minute.checked) * 1000
        ) / 10
      )}%
    </td>
  );

  let cells3 = [];
  cells3.push(<td key="ORDERCONDITION">Lower Bollinger Band</td>);
  cells3.push(<td key="PERIOD">Day</td>);
  cells3.push(<td key="CHECKED">{String(lowerBollingerBand.day.checked)}</td>);
  cells3.push(<td key="FLASHED">{String(lowerBollingerBand.day.flashed)}</td>);
  cells3.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round((lowerBollingerBand.day.flashed / lowerBollingerBand.day.checked) * 1000) /
        10
      )}%
    </td>
  );

  let cells4 = [];
  cells4.push(<td key="ORDERCONDITION">Lower Bollinger Band</td>);
  cells4.push(<td key="PERIOD">Minute</td>);
  cells4.push(<td key="CHECKED">{String(lowerBollingerBand.minute.checked)}</td>);
  cells4.push(<td key="FLASHED">{String(lowerBollingerBand.minute.flashed)}</td>);
  cells4.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round((lowerBollingerBand.minute.flashed / lowerBollingerBand.minute.checked) * 1000) /
        10
      )}%
    </td>
  );

  let cells5 = [];
  cells5.push(<td key="ORDERCONDITION">Upper Bollinger Band</td>);
  cells5.push(<td key="PERIOD">Day</td>);
  cells5.push(<td key="CHECKED">{String(upperBollingerBand.day.checked)}</td>);
  cells5.push(<td key="FLASHED">{String(upperBollingerBand.day.flashed)}</td>);
  cells5.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round((upperBollingerBand.day.flashed / upperBollingerBand.day.checked) * 1000) /
        10
      )}%
    </td>
  );

  let cells6 = [];
  cells6.push(<td key="ORDERCONDITION">Upper Bollinger Band</td>);
  cells6.push(<td key="PERIOD">Minute</td>);
  cells6.push(<td key="CHECKED">{String(upperBollingerBand.minute.checked)}</td>);
  cells6.push(<td key="FLASHED">{String(upperBollingerBand.minute.flashed)}</td>);
  cells6.push(
    <td key="FLASHPERCENTAGE">
      {(
        Math.round((upperBollingerBand.minute.flashed / upperBollingerBand.minute.checked) * 1000) /
        10
      )}%
    </td>
  );


  automatedTradeTableRows.push(<tr key={0}>{cells1}</tr>);
  automatedTradeTableRows.push(<tr key={1}>{cells2}</tr>);
  automatedTradeTableRows.push(<tr key={2}>{cells3}</tr>);
  automatedTradeTableRows.push(<tr key={3}>{cells4}</tr>);
  automatedTradeTableRows.push(<tr key={4}>{cells5}</tr>);
  automatedTradeTableRows.push(<tr key={5}>{cells6}</tr>);


  let automatedTradeTableBody = <tbody>{automatedTradeTableRows}</tbody>;
  return (
    <div className="container">
      <div className="row">
        <p className="text-center fs-3 fw-bold"> Database </p>
      </div>
      <div className="row">
        <div className="col-sm-9" />
        <div className="col-sm-3">
          <i
            className="fa fa-plus-square fa-1 float-end"
            title="Modify"
            onClick={backload}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Condition</th>
              <th scope="col">Evaluation Period</th>
              <th scope="col">Checked</th>
              <th scope="col">Flashed</th>
              <th scope="col">Flash %</th>
            </tr>
          </thead>
          {automatedTradeTableBody}
        </table>
      </div>
    </div>
  );
}
