import "chart.js/auto";
import React from "react";
import { Chart } from "react-chartjs-2";
export default function TradeGraphView({ itemState, onOption }) {
  let tradeHistory = [];
  let colors = [];
  let borderColor =""

  function compare(a, b) {
    if (a.x > b.x) return 1;
    if (a.x < b.x) return -1;
    return 0;
  }

  if (itemState != null) {
    if (itemState.item != null) {
        if(itemState.item.totalValue > itemState.item.budget){
            borderColor = "rgb(170, 250, 167)"
        }
        else{
            borderColor = "rgb(250, 150, 157)"
        }
      if (itemState.item.tradeDetails != null) {
        itemState.item.tradeDetails.forEach((detail) => {
          if (detail.assetPrice != null && detail.filledAt != null) {
            if (detail.orderSide == "BUY") {
              colors.push("rgb(34, 179, 29)");
            }
            if (detail.orderSide == "SELL") {
              colors.push("rgb(237, 14, 22)");
            }
            tradeHistory.push(
              Object.assign(
                {},
                {
                  x: detail.filledAt,
                  y: detail.assetPrice,
                }
              )
            );
          }
        });
      }
    }
  }
  return (
    <div>
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <Chart
        datasetIdKey="id"
        data={{
          datasets: [
            {
              type: "line",
              id: 1,
              label: "Trade History",
              data: tradeHistory.sort(compare),
              pointBackgroundColor: colors,
              xAxisID: "Time",
              yAxisID: "Price",
              borderColor : borderColor
            },
          ],
        }}
        options={{
          animation: false,
          datasets: {
            line: {
              pointRadius: 5,
            },
          },
          scales: {
            Time: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Time",
              },
            },
            Price: {
              axis: "y",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Price",
              },
            },
          },
        }}
      />
    </div>
  );
}
