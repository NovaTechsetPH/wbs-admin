import { useDashboardContext } from "@/context/DashboardContextProvider";
import React, { useEffect, useState } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  // Title,
  Legend,
  Tooltip,
} from "chart.js";
import * as Utils from "./../assets/utils";
import moment from "moment";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  // Title,
  Tooltip
);

const COLORS = {
  unproductive: "24.6 95% 53.1%",
  productive: "142.1 76.2% 36.3%",
  neutral: "240 4.8% 95.9%",
};

const ActivityChart = ({ productive, unproductive, neutral, productivity }) => {
  const { date } = useDashboardContext();
  const [dataLabel, setDataLabel] = useState([]);
  const DATA_COUNT = 13;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 30 };
  const activePeriod = "day";

  useEffect(() => {
    let startTime = moment("09:00:00", "hh:mm");
    let tmpArray = [startTime.format("hh:mm")];
    let tmp = startTime;
    for (let i = 1; i < DATA_COUNT; i++) {
      tmp = tmp.add(1, "hours");
      tmpArray.push(tmp.format("hh:mm"));
    }
    // console.log(Utils.numbers(NUMBER_CFG), "num");
    // let productivityArray = productivity.map((x) => x);
    console.log(typeof productivity);
    // console.log(productivityArray, "productivityArray");
    console.log(tmpArray);
    let timeArr = Object.keys(productivity).map((t) => {
      console.log(t);
      return moment(t, "hh:mm").format("HH:mm");
    });

    console.log(timeArr, "productivityArr");
    setDataLabel(timeArr);
  }, [productivity]);

  useEffect(() => {
    var myChart = Chart.getChart("track-chart");
    if (myChart) myChart.destroy();

    // eslint-disable-next-line no-new
    myChart = new Chart("track-chart", {
      type: "bar",
      data: {
        labels: dataLabel,
        datasets: [
          {
            label: "Productive",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : Utils.numbers(NUMBER_CFG),
            backgroundColor: `hsl(${COLORS.productive})`,
            parsing: {
              yAxisKey: "unproductive",
            },
          },
          {
            label: "Neutral",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : Utils.numbers(NUMBER_CFG),
            backgroundColor: Utils.CHART_COLORS.grey,
            parsing: {
              yAxisKey: "neutral",
            },
          },
          {
            label: "Unproductive",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : Utils.numbers(NUMBER_CFG),
            backgroundColor: `hsl(${COLORS.unproductive})`, // Utils.CHART_COLORS.red
            parsing: {
              yAxisKey: "productive",
            },
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
              // display: false,
              drawBorder: false,
              display: true,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 20,
            },
            afterBuildTicks: function (myChart) {
              let tiktok = myChart.ticks;
              if (activePeriod == "day") {
                myChart.ticks = [];
                tiktok.forEach((e) => {
                  myChart.ticks.push(e);
                  // if (e.value % 2 == 0 && e.value != 24) {
                  //   myChart.ticks.push(e);
                  // }
                });
              }
            },
          },
          y: {
            stacked: true,
            grid: {
              display: false,
              drawBorder: false,
              // display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            border: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: true,
              padding: 5,
              color: "#fbfbfb",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  }, [dataLabel, date]);

  const isFutureDate = (value) => {
    let d_now = new Date();
    let d_inp = new Date(value);
    return d_now < d_inp;
  };

  return (
    <div className="bg-base-100 rounded-lg border shadow-sm">
      <div className="chart-container">
        <canvas
          id="track-chart"
          // style={{ width: "100% !important" }}
        ></canvas>
      </div>
    </div>
  );
};

export default ActivityChart;
