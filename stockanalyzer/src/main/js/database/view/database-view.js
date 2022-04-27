import React from "react";
import moment from "moment";

export default function DatabaseView({ onOption, itemState, inputChange }) {
  let genericOrderCondition = {
    symbol: "",
    flashed: 0,
    checked: 0,
    successes: 0,
  };
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

  let symbol1 = "GENERAL";
  let symbol2 = "GENERAL";
  let symbol3 = "GENERAL";
  let symbol4 = "GENERAL";
  let symbol5 = "GENERAL";
  let symbol6 = "GENERAL";

  let item = {};

  if (itemState != null) {
      if (itemState.symbol1 != null) {
        symbol1 = itemState.symbol1;
      }
      if (itemState.symbol2 != null) {
        symbol2 = itemState.symbol2;
      }
      if (itemState.symbol3 != null) {
        symbol3 = itemState.symbol3;
      }
      if (itemState.symbol4 != null) {
        symbol4 = itemState.symbol4;
      }
      if (itemState.symbol5 != null) {
        symbol5 = itemState.symbol5;
      }
      if (itemState.symbol6 != null) {
        symbol6 = itemState.symbol6;
      }
      
    if (itemState.cache != null) {
      if (
        itemState.cache.goldenCross != null &&
        itemState.cache.goldenCross.day != null &&
        itemState.cache.goldenCross.minute != null
      ) {
        goldenCross = itemState.cache.goldenCross;
      }
      if (
        itemState.cache.lowerBollingerBand != null &&
        itemState.cache.lowerBollingerBand.day != null &&
        itemState.cache.lowerBollingerBand.minute != null
      ) {
        lowerBollingerBand = itemState.cache.lowerBollingerBand;
      }
      if (
        itemState.cache.upperBollingerBand != null &&
        itemState.cache.upperBollingerBand.day != null &&
        itemState.cache.upperBollingerBand.minute != null
      ) {
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
  cells1.push(<td key="SUCCESSES">{String(goldenCross.day.successes)}</td>);
  cells1.push(
    <td key="FLASHPERCENTAGE">
      {Math.round((goldenCross.day.flashed / goldenCross.day.checked) * 1000) /
        10}
      %
    </td>
  );
  cells1.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (goldenCross.day.successes / goldenCross.day.flashed) * 1000
      ) / 10}
      %
    </td>
  );
  cells1.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol1"
        name="symbo1"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol1}
      />
    </td>
  );
  cells1.push(
    <td key="SYMBOL_SELECTOR">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "GOLDEN_CROSS_DAY",
              symbol: symbol1,
            })
          )
        }
      ></i>
    </td>
  );
  cells1.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", goldenCross.day)}
      ></i>
    </td>
  );

  let cells2 = [];
  cells2.push(<td key="ORDERCONDITION">Golden Cross</td>);
  cells2.push(<td key="PERIOD">Minute</td>);
  cells2.push(<td key="CHECKED">{String(goldenCross.minute.checked)}</td>);
  cells2.push(<td key="FLASHED">{String(goldenCross.minute.flashed)}</td>);
  cells2.push(<td key="SUCCESSES">{String(goldenCross.minute.successes)}</td>);
  cells2.push(
    <td key="FLASHPERCENTAGE">
      {Math.round(
        (goldenCross.minute.flashed / goldenCross.minute.checked) * 1000
      ) / 10}
      %
    </td>
  );
  cells2.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (goldenCross.minute.successes / goldenCross.minute.flashed) * 1000
      ) / 10}
      %
    </td>
  );
  cells2.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol2"
        name="symbol2"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol2}
      />
    </td>
  );
  cells2.push(
    <td key="MODIFY">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "GOLDEN_CROSS_MINUTE",
              symbol: symbol2,
            })
          )
        }
      ></i>
    </td>
  );
  cells2.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", goldenCross.minute)}
      ></i>
    </td>
  );

  let cells3 = [];
  cells3.push(<td key="ORDERCONDITION">Lower Bollinger Band</td>);
  cells3.push(<td key="PERIOD">Day</td>);
  cells3.push(<td key="CHECKED">{String(lowerBollingerBand.day.checked)}</td>);
  cells3.push(<td key="FLASHED">{String(lowerBollingerBand.day.flashed)}</td>);
  cells3.push(
    <td key="SUCCESSES">{String(lowerBollingerBand.day.successes)}</td>
  );
  cells3.push(
    <td key="FLASHPERCENTAGE">
      {Math.round(
        (lowerBollingerBand.day.flashed / lowerBollingerBand.day.checked) * 1000
      ) / 10}
      %
    </td>
  );
  cells3.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (lowerBollingerBand.day.successes / lowerBollingerBand.day.flashed) *
          1000
      ) / 10}
      %
    </td>
  );
  cells3.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol3"
        name="symbol3"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol3}
      />
    </td>
  );
  cells3.push(
    <td key="MODIFY">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "LOWER_BOLLINGER_BAND_DAY",
              symbol: symbol3,
            })
          )
        }
      ></i>
    </td>
  );
  cells3.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", lowerBollingerBand.day)}
      ></i>
    </td>
  );

  let cells4 = [];
  cells4.push(<td key="ORDERCONDITION">Lower Bollinger Band</td>);
  cells4.push(<td key="PERIOD">Minute</td>);
  cells4.push(
    <td key="CHECKED">{String(lowerBollingerBand.minute.checked)}</td>
  );
  cells4.push(
    <td key="FLASHED">{String(lowerBollingerBand.minute.flashed)}</td>
  );
  cells4.push(
    <td key="SUCCESSES">{String(lowerBollingerBand.minute.successes)}</td>
  );
  cells4.push(
    <td key="FLASHPERCENTAGE">
      {Math.round(
        (lowerBollingerBand.minute.flashed /
          lowerBollingerBand.minute.checked) *
          1000
      ) / 10}
      %
    </td>
  );
  cells4.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (lowerBollingerBand.minute.successes /
          lowerBollingerBand.minute.flashed) *
          1000
      ) / 10}
      %
    </td>
  );
  cells4.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol4"
        name="symbol4"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol4}
      />
    </td>
  );
  cells4.push(
    <td key="MODIFY">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "LOWER_BOLLINGER_BAND_MINUTE",
              symbol: symbol4,
            })
          )
        }
      ></i>
    </td>
  );
  cells4.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", lowerBollingerBand.minute)}
      ></i>
    </td>
  );

  let cells5 = [];
  cells5.push(<td key="ORDERCONDITION">Upper Bollinger Band</td>);
  cells5.push(<td key="PERIOD">Day</td>);
  cells5.push(<td key="CHECKED">{String(upperBollingerBand.day.checked)}</td>);
  cells5.push(<td key="FLASHED">{String(upperBollingerBand.day.flashed)}</td>);
  cells5.push(
    <td key="SUCCESSES">{String(upperBollingerBand.day.successes)}</td>
  );
  cells5.push(
    <td key="FLASHPERCENTAGE">
      {Math.round(
        (upperBollingerBand.day.flashed / upperBollingerBand.day.checked) * 1000
      ) / 10}
      %
    </td>
  );
  cells5.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (upperBollingerBand.day.successes / upperBollingerBand.day.flashed) *
          1000
      ) / 10}
      %
    </td>
  );
  cells5.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol5"
        name="symbol5"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol5}
      />
    </td>
  );
  cells5.push(
    <td key="MODIFY">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "UPPER_BOLLINGER_BAND_DAY",
              symbol: symbol5,
            })
          )
        }
      ></i>
    </td>
  );
  cells5.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", upperBollingerBand.day)}
      ></i>
    </td>
  );

  let cells6 = [];
  cells6.push(<td key="ORDERCONDITION">Upper Bollinger Band</td>);
  cells6.push(<td key="PERIOD">Minute</td>);
  cells6.push(
    <td key="CHECKED">{String(upperBollingerBand.minute.checked)}</td>
  );
  cells6.push(
    <td key="FLASHED">{String(upperBollingerBand.minute.flashed)}</td>
  );
  cells6.push(
    <td key="SUCCESSES">{String(upperBollingerBand.minute.successes)}</td>
  );
  cells6.push(
    <td key="FLASHPERCENTAGE">
      {Math.round(
        (upperBollingerBand.minute.flashed /
          upperBollingerBand.minute.checked) *
          1000
      ) / 10}
      %
    </td>
  );
  cells6.push(
    <td key="SUCCESSPERCENTAGE">
      {Math.round(
        (upperBollingerBand.minute.successes /
          upperBollingerBand.minute.flashed) *
          1000
      ) / 10}
      %
    </td>
  );
  cells6.push(
    <td key="SYMBOL">
      <input
        type="text"
        id="symbol6"
        name="symbol6"
        className="form-control"
        autoCapitalize="off"
        onChange={inputChange}
        value={symbol6}
      />
    </td>
  );
  cells6.push(
    <td key="MODIFY">
      <i
        className="fa fa-bullseye fa-1"
        title="Modify"
        onClick={() =>
          onOption(
            "GET_SYMBOL",
            Object.assign(item, {
              tradeSignal: "UPPER_BOLLINGER_BAND_MINUTE",
              symbol: symbol6,
            })
          )
        }
      ></i>
    </td>
  );
  cells6.push(
    <td key="DETAIL_VIEW">
      <i
        className="fa fa-microchip fa-1"
        title="Modify"
        onClick={() => onOption("DETAIL_VIEW", upperBollingerBand.minute)}
      ></i>
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
            className="fa fa-bolt fa-1 float-end"
            title="Backload"
            onClick={() => onOption("BACKLOAD")}
          ></i>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Condition</th>
              <th scope="col">Evaluation Period</th>
              <th scope="col">Checked</th>
              <th scope="col">Flashed</th>
              <th scope="col">Successes</th>
              <th scope="col">Flash %</th>
              <th scope="col">Success %</th>
              <th scope="col">Symbol</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {automatedTradeTableBody}
        </table>
      </div>
    </div>
  );
}
