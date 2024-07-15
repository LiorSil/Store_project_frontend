import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchOnlyBoughtProducts } from "../../../Redux/Reducers/productsReducer";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const trendingColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F3FF33",
  "#FF33A8",
  "#33FFF3",
  "#F333FF",
  "#FF8C33",
  "#33FF8C",
  "#8C33FF",
  "#FF3333",
  "#33FF33",
  "#3333FF",
  "#FFB533",
  "#33FFB5",
  "#B533FF",
  "#FF3333",
  "#33FF33",
  "#3333FF",
  "#FFD633",
];

const DoughnutChart = React.memo(() => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.boughtProducts,
    shallowEqual
  );
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchOnlyBoughtProducts());
    }
  }, [dispatch, products.length]);

  const createChart = useCallback(() => {
    if (!products || products.length === 0) return;

    const totalBought = products.reduce(
      (sum, product) => sum + product.bought,
      0
    );
    const labels = products.map((product) => product.title);
    const data = products.map((product) => product.bought);
    const backgroundColors = products.map(
      (_, index) => trendingColors[index % trendingColors.length]
    );
    const borderColors = backgroundColors.map((color) => color);

    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            label: "# of Bought Products",
            data,
            borderWidth: 1,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          datalabels: {
            formatter: (value, context) => {
              const percentage = ((value / totalBought) * 100).toFixed(2);
              return `${percentage}%`;
            },
            color: "#fff",
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
            },
          },
        },
      },
    });
  }, [products]);

  useEffect(() => {
    createChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [products, createChart]);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "500px",
      }}
      ref={canvasRef}
    ></canvas>
  );
});

export default DoughnutChart;
