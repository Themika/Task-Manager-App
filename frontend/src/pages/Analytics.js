import { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useTaskContext } from "../hooks/useTaskContext";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

let myChart;

const Analytics = () => {
  const canvasRef = useRef(null);
  const { deletedTasks } = useTaskContext();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  useEffect(() => {
    const currentDay = new Date()
      .toLocaleString("en-ca", { weekday: "long" })
      .toLowerCase();

    const data = daysOfWeek.map((day) => {
      return day === currentDay ? deletedTasks : 0;
    });

    myChart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: daysOfWeek,
        datasets: [
          {
            label: "Number of Tasks",
            data: data,
            backgroundColor: ["rgb(255, 99, 132)"],
            borderColor: ["rgba(255, 99, 132, 0.2)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [deletedTasks]);

  return <canvas ref={canvasRef} />;
};

export default Analytics;
