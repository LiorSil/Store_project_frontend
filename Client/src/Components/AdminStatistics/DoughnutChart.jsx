import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchProductsData } from "../../Redux/Reducers/productsReducer";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DoughnutChart = React.memo(() => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.productsData,
    shallowEqual
  );
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  const createChart = useCallback(() => {
    if (!products || products.length === 0) return;

    const filteredProducts = products.filter((product) => product.bought > 0);
    const totalBought = filteredProducts.reduce(
      (sum, product) => sum + product.bought,
      0
    );
    const labels = filteredProducts.map((product) => product.title);
    const data = filteredProducts.map((product) => product.bought);
    const backgroundColors = filteredProducts.map(() => getRandomColor());
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
