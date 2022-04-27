import "chart.js/auto";
import React from "react";
import { Line, Scatter } from "react-chartjs-2";
export default function DatabaseDetailView({ itemState , onOption }) {
  let volumeData = [];
  let vwapData = [];

  function sortVolume(a, b) {
    if (a.volume > b.volume) return 1;
    if (a.volume < b.volume) return -1;
    return 0;
  }
  function sortVwap(a, b) {
    if (a.vwap > b.vwap) return 1;
    if (a.vwap < b.vwap) return -1;
    return 0;
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
        });
      }
    }
  }
  return (
    <div>
      <button onClick={() => onOption("CANCEL")}>Back</button>
      <Scatter
        datasetIdKey="id"
        data={{
          datasets: [
            {
              id: 1,
              label: "Volume Association",
              data: volumeData,
              xAxisID: "Volume",
              yAxisID: "SuccessPercent",
              borderColor: "red",
            },
            {
              id: 2,
              label: "Vwap Association",
              data: vwapData,
              xAxisID: "Vwap",
              yAxisID: "SuccessPercent",
              borderColor: "blue",
            },
          ],
        }}
        options={{
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
