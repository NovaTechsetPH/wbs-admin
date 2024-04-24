import { useDashboardContext } from "@/context/DashboardContextProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import * as Utils from "./../assets/utils";
import { CandleData, secondsToHuman } from "@/lib/timehash";

import { Avatar} from "@ui/avatar";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const COLORS = {
  unproductive: "24.6 95% 53.1%",
  productive: "142.1 76.2% 36.3%",
  neutral: "240 4.8% 95.9%",
};

const ActivityIcon = ({ productivity, rawApps, isLoading }) => {
  const { date } = useDashboardContext();
  const [dataLabel, setDataLabel] = useState(["00:00"]);
  const NUMBER_CFG = { count: 30, min: 0, max: 30 };
  const activePeriod = "day";
  const [productive, setProductive] = useState([]);
  const [unproductive, setUnproductive] = useState([]);
  const [neutral, setNeutral] = useState([]);
  const progress = useRef(null);
  const [dataLength, setDataLength] = useState(0);

  const isFutureDate = (value) => {
    let d_now = new Date();
    let d_inp = new Date(value);
    return d_now < d_inp;
  };

  useEffect(() => {
    let tmpProductive = [];
    let tmpUnproductive = [];
    let tmpNeutral = [];

    setDataLength(productivity.length);

    for (const key in productivity) {
      tmpProductive.push(productivity[key].category["productive"]);
      tmpUnproductive.push(productivity[key].category["unproductive"]);
      tmpNeutral.push(productivity[key].category["neutral"]);
    }

    setProductive(tmpProductive);
    setUnproductive(tmpUnproductive);
    setNeutral(tmpNeutral);
  }, [productivity]);

  useMemo(() => {
    if (rawApps.length !== 0) {
      let tmp = CandleData(
        rawApps[0].time,
        rawApps[rawApps.length - 1].time,
        date
      );

      setDataLabel(tmp.slice(0, dataLength >= 30 ? dataLength + 1 : 30));
    }
  }, [rawApps, dataLength]);

  useMemo(() => {
    try {
      let chart = Chart.getChart("track-chart");
      if (chart) chart.destroy();

      const data = {
        labels: dataLabel,
        datasets: [
          {
            label: "Productive",
            data: isFutureDate(date)
              ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
              : productive,
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
            backgroundColor: `hsl(${COLORS.unproductive})`,
            parsing: {
              yAxisKey: "productive",
            },
          },
        ],
      };

      chart = new Chart("track-chart", {
        type: "bar",
        data: data,
        options: {
          animation: {
            duration: 1000,
            onProgress: function (animation) {
              progress.value = animation.currentStep / animation.numSteps;
            },
            onComplete: function (animation) {
              window.setTimeout(function () {
                progress.value = 0;
              }, 2000);
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
                    secondsToHuman(data) === "" ? "0" : secondsToHuman(data);
                  return `${label}: ${formatedData}`;
                },
              },
            },
          },
          interaction: {
            intersect: true,
            mode: "point",
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              grid: {
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
                if (activePeriod === "day") {
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
    } catch (err) {
      console.log(err);
    }
  }, [neutral, productive, unproductive, dataLabel]);

  return (
    <div className="bg-base-100 rounded-lg border shadow-sm">
      <div className="chart-container">
        <LoadingOverlay active={isLoading} spinner text="Loading graph...">
          <canvas id="track-chart"></canvas>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default ActivityIcon;