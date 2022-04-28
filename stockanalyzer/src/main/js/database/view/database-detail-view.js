import "chart.js/auto";
import React from "react";
import { Chart } from "react-chartjs-2";
export default function DatabaseDetailView({ itemState, onOption }) {
  let volumeData = [];
  let vwapData = [];
  let priceData =[];

  function compare(a, b) {
    if (a.x > b.x) return 1;
    if (a.x < b.x) return -1;
    return 0;
  }

  function findLineByLeastSquares(values) {
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;
    let count = 0;

    let x = 0;
    let y = 0;
    let values_length = values.length;

    if (values_length === 0) {
      return [];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (let v = 0; v < values_length; v++) {
      x = values[v].x;
      y = values[v].y;
      sum_x += x;
      sum_y += y;
      sum_xx += x * x;
      sum_xy += x * y;
      count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    let m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    let b = sum_y / count - (m * sum_x) / count;

    /*
     * We will make the x and y result line now
     */
    let result_values = [];

    for (let v = 0; v < values_length; v++) {
      x = values[v].x;
      y = x * m + b;
      result_values.push(
        Object.assign(
          {},
          {
            x: x,
            y: y,
          }
        )
      );
    }
    result_values.sort(compare);
    return result_values;
  }

  if (itemState != null) {
    if (itemState.item != null) {
      if (itemState.item.goldenCrossDetails != null) {
        itemState.item.goldenCrossDetails.forEach((detail) => {
          if (detail.successPercent != null && detail.volume != null) {
            volumeData.push(
              Object.assign(
                {},
                {
                  x: detail.volume,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.vwap != null) {
            vwapData.push(
              Object.assign(
                {},
                {
                  x: detail.vwap,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.flashPrice != null) {
            priceData.push(
              Object.assign(
                {},
                {
                  x: detail.flashPrice,
                  y: detail.successPercent,
                }
              )
            );
          }
        });
      }
      if (itemState.item.lowerBollingerBandDetails != null) {
        itemState.item.lowerBollingerBandDetails.forEach((detail) => {
          if (detail.successPercent != null && detail.volume != null) {
            volumeData.push(
              Object.assign(
                {},
                {
                  x: detail.volume,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.vwap != null) {
            vwapData.push(
              Object.assign(
                {},
                {
                  x: detail.vwap,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.flashPrice != null) {
            priceData.push(
              Object.assign(
                {},
                {
                  x: detail.flashPrice,
                  y: detail.successPercent,
                }
              )
            );
          }
        });
      }
      if (itemState.item.upperBollingerBandDetails != null) {
        itemState.item.upperBollingerBandDetails.forEach((detail) => {
          if (detail.successPercent != null && detail.volume != null) {
            volumeData.push(
              Object.assign(
                {},
                {
                  x: detail.volume,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.vwap != null) {
            vwapData.push(
              Object.assign(
                {},
                {
                  x: detail.vwap,
                  y: detail.successPercent,
                }
              )
            );
          }
          if (detail.successPercent != null && detail.flashPrice != null) {
            priceData.push(
              Object.assign(
                {},
                {
                  x: detail.flashPrice,
                  y: detail.successPercent,
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
              type: "scatter",
              id: 1,
              label: "Volume Association",
              data: volumeData,
              xAxisID: "Volume",
              yAxisID: "SuccessPercent",
              borderColor: "red",
            },
            {
              type: "line",
              id: 2,
              label: "Volume Association Best Fit",
              data: findLineByLeastSquares(volumeData),
              xAxisID: "Volume",
              yAxisID: "SuccessPercent",
              borderColor: "red",
              spanGaps: true,
            },
            {
              type: "scatter",
              id: 3,
              label: "Vwap Association",
              data: vwapData,
              xAxisID: "Vwap",
              yAxisID: "SuccessPercent",
              borderColor: "blue",
            },
            {
              type: "line",
              id: 4,
              label: "Vwap Association Best Fit",
              data: findLineByLeastSquares(vwapData),
              xAxisID: "Vwap",
              yAxisID: "SuccessPercent",
              borderColor: "blue",
              spanGaps: true,
            },
            {
              type: "scatter",
              id: 5,
              label: "Price Association",
              data: priceData,
              xAxisID: "Price",
              yAxisID: "SuccessPercent",
              borderColor: "green",
            },
            {
              type: "line",
              id: 6,
              label: "Price Association Best Fit",
              data: findLineByLeastSquares(priceData),
              xAxisID: "Price",
              yAxisID: "SuccessPercent",
              borderColor: "green",
              spanGaps: true,
            },
          ],
        }}
        options={{
          animation: false,
          datasets: {
            line: {
              pointRadius: 0,
            },
          },
          scales: {
            Volume: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Volume",
              },
            },
            Vwap: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Vwap",
              },
            },
            Price: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Price",
              },
            },
            SuccessPercent: {
              axis: "y",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Success Percent",
              },
            },
          },
        }}
      />
    </div>
  );
}
