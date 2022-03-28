import React from "react";
import moment from "moment";

export default function DatabaseView({ backload, itemState }) {
  let stockDay = "";
  let stockMinute = "";
  let recentStockDayTime = "";
  let recentStockMinuteTime = "";
  let recentStockDayClose = "";
  let recentStockMinuteValue = "";

  if (itemState != null) {
    if (itemState.stockDay != null) {
      if (itemState.stockDay.epochSeconds != null) {
        recentStockDayTime = itemState.stockDay.epochSeconds;
      }
      if (itemState.stockDay.close != null) {
        recentStockDayClose = itemState.stockDay.close;
      }
    }
    if (itemState.stockMinute != null) {
      if (itemState.stockMinute.value != null) {
        recentStockMinuteValue = itemState.stockMinute.value;
      }
      if (itemState.stockMinute.epochSeconds != null) {
        recentStockMinuteTime = itemState.stockMinute.epochSeconds;
      }
    }
  }

  return (
    <div>
      <input
        type="submit"
        name="DatabaseButton"
        id="DatabaseButton"
        className="form-control"
        value="Load Database"
        onClick={backload}
      />
      <ul>
        Latest StockDay in Database : {moment(new Date(recentStockDayTime *1000)).format("YYYY-MM-DD")}
        <li>Epoch Seconds: {recentStockDayTime}</li>
        <li>Close: {recentStockDayClose}$</li>
      </ul>
      <ul>
        Latest StockMinute in Database : {moment(new Date(recentStockMinuteTime *1000)).format("YYYY-MM-DD (h:mm)")}
        <li>Epoch Seconds: {recentStockMinuteTime}</li>
        <li>Close: {recentStockMinuteValue}$</li>
      </ul>
    </div>
  );
}
