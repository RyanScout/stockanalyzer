import "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";
export default function DatabaseDetailView({itemState}) {
    let labels = [];
    let data = [];
    function compare(a, b) {
        if (a.volume > b.volume) return 1;
        if (a.volume < b.volume) return -1;
        return 0;
      }
    if(itemState != null){
        if(itemState.item != null){
            if(itemState.item.goldenCrossDetails != null){
                itemState.item.goldenCrossDetails.sort(compare);
                itemState.item.goldenCrossDetails.forEach(detail => {
                    if(detail.successPercent != null && detail.volume != null){
                    labels.push(detail.volume)
                    data.push(detail.successPercent)
                    }
                });
            }
            if(itemState.item.lowerBollingerBandDetails != null){
                itemState.item.lowerBollingerBandDetails.sort(compare);
                itemState.item.lowerBollingerBandDetails.forEach(detail => {
                    if(detail.successPercent != null && detail.volume != null){
                        labels.push(detail.volume)
                        data.push(detail.successPercent)
                        }
                });
            }
            if(itemState.item.upperBollingerBandDetails != null){
                itemState.item.upperBollingerBandDetails.sort(compare);
                itemState.item.upperBollingerBandDetails.forEach(detail => {
                    if(detail.successPercent != null && detail.volume != null){
                        labels.push(detail.volume)
                        data.push(detail.successPercent)
                        }
                });
            }
        }
    }
  return (
    <div>
      <Line
        datasetIdKey="id"

        data={{
          labels: labels,
          datasets: [
            {
              id: 1,
              label: "Volume Success Percent Correlation",
              data: data,
              xAxisID:"Volume",
              yAxisID:"SuccessPercent",
              borderColor:"red",
              tension:1
            },
          ],
        }}

        options={{
           scales:{
               x:{
                   type:"linear",
                   title: "Volume"
               },

               y:{
                   type:"linear",
                   title:"Success Percent"
               }
        },
        }}
      />
    </div>
  );
}
