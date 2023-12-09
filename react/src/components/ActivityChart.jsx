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

const ActivityChart = ({ productivity, appList }) => {
  const { date } = useDashboardContext();
  const [dataLabel, setDataLabel] = useState([]);
  const DATA_COUNT = 13;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 30 };
  const activePeriod = "day";
  const [productive, setProductive] = useState([]);
  const [unproductive, setUnproductive] = useState([]);
  const [neutral, setNeutral] = useState([]);

  useEffect(() => {
    let startTime = moment("09:00:00", "hh:mm");
    let tmpArray = [startTime.format("hh:mm")];
    let tmp = startTime;
    for (let i = 1; i < DATA_COUNT; i++) {
      tmp = tmp.add(1, "hours");
      tmpArray.push(tmp.format("hh:mm"));
    }

    let timeArr = Object.keys(productivity).map((t) => {
      return moment(t, "hh:mm").format("HH:mm");
    });

    let tenMinutes = [];
    timeArr.forEach((ten) => {
      const extraMins = ["0", "10", "20", "30", "40", "50"];
      const extraTicks = extraMins.map((ex) => {
        return moment(ten, "HH:mm").add(ex, "minutes").format("HH:mm");
      });
      tenMinutes = tenMinutes.concat(extraTicks);
      // console.log(extraTicks);
    });

    setDataLabel(tenMinutes);

    let tmpProductive = [];
    let tmpUnproductive = [];
    let tmpNeutral = [];

    for (const key in productivity) {
      tmpProductive.push(productivity[key].productive);
      tmpUnproductive.push(productivity[key].unproductive);
      tmpNeutral.push(productivity[key].neutral);
    }

    setProductive(tmpProductive);
    setUnproductive(tmpUnproductive);
    setNeutral(tmpNeutral);
  }, [productivity]);

  useEffect(() => {
    console.log(appList, "appList");
  }, [appList]);

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
              : productive, // productivity.map((x) => x.productive),
            backgroundColor: `hsl(${COLORS.productive})`,
            parsing: {
              yAxisKey: "unproductive",
            },
          },
          {
            label: "Neutral",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : neutral,
            backgroundColor: Utils.CHART_COLORS.grey,
            parsing: {
              yAxisKey: "neutral",
            },
          },
          {
            label: "Unproductive",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : unproductive,
            backgroundColor: `hsl(${COLORS.unproductive})`, // Utils.CHART_COLORS.red
            parsing: {
              yAxisKey: "productive",
            },
          },
        ],
      },
      options: {
        animation: {
          onProgress: function (animation) {
            let progress = document.getElementById("process-bar");
            // console.log("test progress");
            progress.value = animation.currentStep / animation.numSteps;
          },
          onComplete: function (complete) {
            // console.log(complete, "complete");
          },
        },
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
        <div id="process-bar"></div>
        <canvas id="track-chart"></canvas>
      </div>
    </div>
  );
};

export default ActivityChart;
