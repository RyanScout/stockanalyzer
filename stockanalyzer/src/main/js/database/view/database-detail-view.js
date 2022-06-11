import "chart.js/auto";
import React from "react";
import { Chart } from "react-chartjs-2";
export default function DatabaseDetailView({ itemState, onOption }) {
  let distributionPercentData = [];
  let cumulativeDistributionPercentData = [];

  function compare(a, b) {
    if (a.successPercent > b.successPercent) return 1;
    if (a.successPercent < b.successPercent) return -1;
    return 0;
  }

  if (itemState != null) {
    if (itemState.item != null) {
      if (itemState.item.details != null) {
        let arr = itemState.item.details.slice().sort(compare);

        let lowValue = Math.round(arr[0].successPercent * 10) / 10;

        let range = arr[arr.length - 1].successPercent - arr[0].successPercent;

        let precision = 25;

        let increment = Math.round((range / precision) * 10) / 10;

        let z = 0;
        let cumulativeSize = 0;
        for (let i = 0; i < precision; i++) {
          let size = 0;
          for (z; z < arr.length; z++) {
            if (arr[z].successPercent < lowValue + i * increment) {
              size++;
              cumulativeSize++;
              continue;
            }
            break;
          }
          distributionPercentData.push({
            x: lowValue + i * increment,
            y: size / arr.length,
          });
          cumulativeDistributionPercentData.push({
            x: lowValue + i * increment,
            y: cumulativeSize / arr.length,
          });
        }
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
              label: "Success Percent Distribution Spread",
              data: distributionPercentData,
              xAxisID: "SuccessPercent",
              yAxisID: "DistributionPercent",
              borderColor: "red",
            },
            {
              type: "line",
              id: 2,
              label: "Cumulative Success Percent Distribution Spread",
              data: cumulativeDistributionPercentData,
              xAxisID: "SuccessPercent",
              yAxisID: "DistributionPercent",
              borderColor: "blue",
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
            SuccessPercent: {
              axis: "x",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Success Percent",
              },
            },
            DistributionPercent: {
              axis: "y",
              type: "linear",
              display: "auto",
              title: {
                display: true,
                text: "Distribution %",
              },
            },
          },
        }}
      />
    </div>
  );
}
