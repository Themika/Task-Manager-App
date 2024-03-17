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
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color of the line fill
            borderColor: "rgba(75, 192, 192, 1)", // Color of the line
            pointBackgroundColor: "rgba(75, 192, 192, 1)", // Color of the points
            pointBorderColor: "rgba(75, 192, 192, 1)", // Border color of the points
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Tasks done", // Title for the Y axis
              color: "#000", // Color of the title
              font: {
                family: "Poppins", // Font family for the Y axis title
                size: 14, // Font size of the title
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Days of the week", // Title for the X axis
              color: "#000", // Color of the title
              font: {
                family: "Poppins", // Font family for the X axis title
                size: 14, // Font size of the title
              },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "My Chart Title", // Title for the chart
            color: "#000", // Color of the title
            font: {
              family: "Poppins", // Font family for the chart title
              size: 20, // Font size of the title
            },
          },
        },
        legend: {
          display: true, // Change this to true to display the legend
          position: "left", // Position of the legend. Other options are 'top', 'left', 'right'
          labels: {
            color: "rgb(0,0,0)", // Color of the legend labels
            font: {
              family: "Poppins", // Font family for the legend labels
              size: 14, // Font size of the legend labels
              style: "italic", // Font style of the legend labels
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [deletedTasks]);

  return (
    <div className="analytics-container">
      <div className="chart-container">
        <canvas ref={canvasRef} className="chart" />
      </div>
      <div className="analytics-description">
        <p>
          The chart data is gathered using the useTaskContext hook, which
          provides the number of tasks that have been deleted. This data is
          stored in the deletedTasks variable. The daysOfWeek array is used to
          create the labels for the X-axis of the chart, representing each day
          of the week. The useEffect hook is used to update the chart whenever
          deletedTasks changes. Inside this hook, the current day of the week is
          determined and a new data array is created. This array contains the
          number of deletedTasks for the current day and zeros for all other
          days. This data array is then used to create a line chart using
          Chart.js, with the number of tasks on the Y-axis and the days of the
          week on the X-axis. The chart provides a visual representation of the
          number of tasks that have been completed (deleted) on the current day
          of the week. The number of tasks saved is equal to the value of
          deletedTasks.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
