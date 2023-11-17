import React, { useEffect, useState } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import * as Utils from "./../assets/utils";
import moment from "moment";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
);

const ActivityChart = () => {
  const [dataLabel, setDataLabel] = useState([]);
  const DATA_COUNT = 200;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 20 };

  useEffect(() => {
    let startTime = moment("09:15:00", "hh:mm");
    let tmpArray = [startTime.format("hh:mm")];
    let tmp = startTime;
    for (let i = 0; i < DATA_COUNT; ++i) {
      tmp = tmp.add(2, "hours");
      tmpArray.push(tmp.format("hh:mm"));
    }
    setDataLabel(tmpArray);
  }, []);

  useEffect(() => {
    const c = Chart.getChart("track-chart");
    if (c) c.destroy();

    // console.log(dataLabel);

    // let categoryArr = ["productive", "neutral", "unproductive"];
    // for (let index = 0; index < categoryArr.length; index++) {
    //   categoryArr[index] = Utils.numbers(NUMBER_CFG);
    // }

    // const arrLabel = [
    //   "09:15",
    //   "10:15",
    //   "11:15",
    //   "12:15",
    //   "01:15",
    //   "02:15",
    //   "03:15",
    //   "04:15",
    //   "05:15",
    //   "06:15",
    //   "07:15",
    // ];

    // const objData = arrLabel.map((label, index) => {
    //   return {
    //     x: label,
    //     productive: categoryArr[0][index],
    //     neutral: categoryArr[1][index],
    //     unproductive: categoryArr[2][index],
    //   };
    // });

    // console.log(objData, "objData");

    // eslint-disable-next-line no-new
    new Chart("track-chart", {
      type: "bar",
      data: {
        labels: dataLabel,
        datasets: [
          {
            label: "Unproductive",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Utils.CHART_COLORS.red,
            parsing: {
              yAxisKey: "productive",
            },
          },
          {
            label: "Neutral",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Utils.CHART_COLORS.grey,
            parsing: {
              yAxisKey: "neutral",
            },
          },
          {
            label: "Productive",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Utils.CHART_COLORS.green,
            parsing: {
              yAxisKey: "unproductive",
            },
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Productivity Bar Chart",
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }, [dataLabel]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="chart-container">
          <canvas
            id="track-chart"
            // style={{ width: "100% !important" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
