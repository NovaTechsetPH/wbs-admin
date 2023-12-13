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
import { CandleData, secondsToHuman } from "@/lib/timehash";

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

const ActivityChart = ({ productivity, rawApps }) => {
  const { date } = useDashboardContext();
  const [dataLabel, setDataLabel] = useState([]);
  const DATA_COUNT = 13;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 30 };
  const activePeriod = "day";
  const [productive, setProductive] = useState([]);
  const [unproductive, setUnproductive] = useState([]);
  const [neutral, setNeutral] = useState([]);

  useEffect(() => {
    let tmpProductive = [];
    let tmpUnproductive = [];
    let tmpNeutral = [];

    for (const key in productivity) {
      tmpProductive.push(productivity[key].category["productive"]);
      tmpUnproductive.push(productivity[key].category["unproductive"]);
      tmpNeutral.push(productivity[key].category["neutral"]);
    }

    setProductive(tmpProductive);
    setUnproductive(tmpUnproductive);
    setNeutral(tmpNeutral);
  }, [productivity]);

  useEffect(() => {
    if (rawApps.length === 0) {
      setDataLabel(["NO DATA"]);
    } else {
      setDataLabel(
        CandleData(rawApps[0].time, rawApps[rawApps.length - 1].time, date)
      );
    }
  }, [rawApps]);

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
          tooltip: {
            callbacks: {
              label: function (context) {
                let data = parseInt(context.formattedValue.replace(/,/g, ""));
                let label = context.dataset.label;
                let formatedData =
                  secondsToHuman(data) == "" ? "0" : secondsToHuman(data);
                return `${label}: ${formatedData}`;
              },
            },
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
