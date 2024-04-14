import { useDashboardContext } from "@/context/DashboardContextProvider";
import { useStateContext } from "@/context/ContextProvider";
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
  // Title,
} from "chart.js";
import * as Utils from "../assets/utils";
import { CandleData, secondsToHuman } from "@/lib/timehash";
import { set } from "date-fns";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
  // Title,
);

const COLORS = {
  unproductive: "24.6 95% 53.1%",
  productive: "142.1 76.2% 36.3%",
  neutral: "240 4.8% 95.9%",
};

const NUMBER_CFG = { count: 11, min: 0, max: 12 };

const ProductivityChart = ({ productivity, rawApps, isLoading }) => {
  const { date } = useDashboardContext();
  const { employees } = useStateContext();
  const [dataLabel, setDataLabel] = useState([]);
  // const NUMBER_CFG = { count: 30, min: 0, max: 30 };
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

    const label = employees.map((emp) => {
      return `${emp.first_name}`;
    });
    setDataLabel(label);
    console.log(employees);
  }, [productivity, employees]);

  // useMemo(() => {
  //   if (rawApps.length !== 0) {
  //     let tmp = CandleData(
  //       rawApps[0].time,
  //       rawApps[rawApps.length - 1].time,
  //       date
  //     );

  //     setDataLabel(tmp.slice(0, dataLength >= 30 ? dataLength + 1 : 30));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rawApps, dataLength]);

  useEffect(() => {
    try {
      if (Chart.getChart("track-chart")) {
        Chart.getChart("track-chart").destroy();
      }

      const data = {
        labels: dataLabel,
        datasets: [
          {
            label: "Productive",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: `hsl(${COLORS.productive})`,
            stack: "productive",
          },
          {
            label: "Neutral",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: Utils.CHART_COLORS.grey,
            stack: "neutral",
          },
          {
            label: "Unproductive",
            data: Utils.numbers(NUMBER_CFG),
            backgroundColor: `hsl(${COLORS.unproductive})`,
            stack: "unproductive",
          },
        ],
      };

      new Chart("track-chart", {
        type: "bar",
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Chart.js Bar Chart - Stacked",
            },
          },
          responsive: true,
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                // display: false,
                drawBorder: true,
                display: true,
                drawOnChartArea: true,
                drawTicks: true,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "grey",
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
                display: true,
                drawBorder: false,
                // display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: function (context) {
                  if (context.tick.value == 8) {
                    return "#000";
                  }
                },
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
                color: "#000",
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
    } catch (error) {
      console.log(error);
    }
  }, [dataLabel]);

  // useEffect(() => {
  //   try {
  //     if (Chart.getChart("track-chart")) {
  //       Chart.getChart("track-chart").destroy();
  //     }

  //     const data = {
  //       labels: dataLabel,
  //       datasets: [
  //         {
  //           label: "Productive",
  //           data: isFutureDate(date)
  //             ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
  //             : productive, // productivity.map((x) => x.productive),
  //           backgroundColor: `hsl(${COLORS.productive})`,
  //           parsing: {
  //             yAxisKey: "unproductive",
  //           },
  //         },
  //         {
  //           label: "Neutral",
  //           data: isFutureDate(date)
  //             ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
  //             : neutral,
  //           backgroundColor: Utils.CHART_COLORS.grey,
  //           parsing: {
  //             yAxisKey: "neutral",
  //           },
  //         },
  //         {
  //           label: "Unproductive",
  //           data: isFutureDate(date)
  //             ? Utils.numbers(NUMBER_CFG).map((x) => x * 0)
  //             : unproductive,
  //           backgroundColor: `hsl(${COLORS.unproductive})`, // Utils.CHART_COLORS.red
  //           parsing: {
  //             yAxisKey: "productive",
  //           },
  //         },
  //       ],
  //     };

  //     // eslint-disable-next-line no-new
  //     new Chart("track-chart", {
  //       type: "bar",
  //       data: data,
  //       options: {
  //         animation: {
  //           duration: 1000,
  //           onProgress: function (animation) {
  //             progress.value = animation.currentStep / animation.numSteps;
  //           },
  //           onComplete: function (animation) {
  //             window.setTimeout(function () {
  //               progress.value = 0;
  //             }, 2000);
  //           },
  //         },
  //         plugins: {
  //           legend: {
  //             display: false,
  //           },
  //           tooltip: {
  //             callbacks: {
  //               label: function (context) {
  //                 let data = parseInt(context.formattedValue.replace(/,/g, ""));
  //                 let label = context.dataset.label;
  //                 let formatedData =
  //                   secondsToHuman(data) === "" ? "0" : secondsToHuman(data);
  //                 return `${label}: ${formatedData}`;
  //               },
  //             },
  //           },
  //         },
  //         interaction: {
  //           intersect: true,
  //           mode: "point",
  //         },
  //         maintainAspectRatio: false,
  //         responsive: true,
  //         scales: {
  //           x: {
  //             stacked: true,
  //             grid: {
  //               // display: false,
  //               drawBorder: false,
  //               display: true,
  //               drawOnChartArea: false,
  //               drawTicks: false,
  //               borderDash: [5, 5],
  //             },
  //             ticks: {
  //               display: true,
  //               color: "#ccc",
  //               padding: 20,
  //             },
  //             afterBuildTicks: function (myChart) {
  //               let tiktok = myChart.ticks;
  //               if (activePeriod === "day") {
  //                 myChart.ticks = [];
  //                 tiktok.forEach((e) => {
  //                   myChart.ticks.push(e);
  //                 });
  //               }
  //             },
  //           },
  //           y: {
  //             stacked: true,
  //             grid: {
  //               display: false,
  //               drawBorder: false,
  //               // display: true,
  //               drawOnChartArea: true,
  //               drawTicks: false,
  //               borderDash: [5, 5],
  //             },
  //             border: {
  //               display: false,
  //             },
  //             gridLines: {
  //               drawBorder: false,
  //             },
  //             ticks: {
  //               beginAtZero: true,
  //               display: true,
  //               padding: 5,
  //               color: "#fbfbfb",
  //               font: {
  //                 size: 11,
  //                 family: "Open Sans",
  //                 style: "normal",
  //                 lineHeight: 2,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [neutral, productive, unproductive, dataLabel]);

  return (
    <div className="bg-base-100 rounded-lg border shadow-sm">
      <div className="chart-container overflow-y-auto">
        <LoadingOverlay active={isLoading} spinner text="Loading graph...">
          <canvas id="track-chart"></canvas>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default ProductivityChart;
