import React from "react";
import { useState, useEffect, useContext } from "react";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { PieChart } from "react-minimal-pie-chart";
import "./App.css";
import { chartContext } from "./App";

function Charts() {
  const colors = [
    "#E38627",
    "#C13C37",
    "#6A2135",
    "#3E8E41",
    "#1F75FE",
    "#F1C40F",
    "#9B59B6",
    "#FF5733",
    "#2E4053",
    "#7F8C8D",
  ];
  const { batsmen_name, batsmen_run, batsmen_name_II, batsmen_run_II } =
    useContext(chartContext);
  return (
    <>
      <>
        <Bar
          data={{
            labels: batsmen_name.map((batsman) => batsman.name),
            datasets: [
              {
                label: "Team I run distribution",
                data: batsmen_run.map((batsman) => batsman.runs),
                backgroundColor: colors,
                borderRadius: 2,
                width: 100,
              },
            ],
          }}
        />
        <Bar
          data={{
            labels: batsmen_name_II.map((batsman) => batsman.name),
            datasets: [
              {
                label: "Team II run distribution",
                data: batsmen_run_II.map((batsman) => batsman.runs),
                backgroundColor: colors,
                borderRadius: 2,
                width: 100,
              },
            ],
          }}
        />
      </>
    </>
  );
}

export default Charts;
