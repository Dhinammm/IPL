import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { PieChart } from "react-minimal-pie-chart";
import "./App.css";
import axios from "axios";

function Charts() {
  const [id, setId] = useState(57);
  const [batsmen_run, setBatsmenrun] = useState([""]);
  const [batsmen_run_II, setBatsmenrunII] = useState([""]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/?id=${id}`);
        setBatsmenrun(
          response.data.batsmen_run
            .filter((player) => player.runs !== 0)
            .map((player, index) => ({
              title: player.name,
              value: player.runs,
              color: colors[index % 10],
            }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/?id=${id}`);
        setBatsmenrunII(
          response.data.batsmen_run_II
            .filter((player) => player.runs !== 0)
            .map((player, index) => ({
              title: player.name,
              value: player.runs,
              color: colors[index % 10],
            }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <h1
        className="p-5
       text-3xl font-extrabold text-center text-green-700 mb-6"
      >
        Team I Run Distribution
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PieChart
          data={batsmen_run}
          Team
          I
          Run
          radius={30}
          center={[30, 50]}
          segmentsStyle={{ transition: "stroke .3s" }}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          labelPosition={70}
          labelStyle={{
            fontSize: "3px",
            fontFamily: "sans-serif",
            fill: "#121212",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0px",
          }}
        >
          {batsmen_run.map((player, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: player.color,
                  borderRadius: "50%",
                  marginRight: "3px",
                }}
              ></div>
              <span>
                {player.title}: {player.value} runs
              </span>
            </div>
          ))}
        </div>
      </div>

      <h1
        className="p-5
       text-3xl font-extrabold text-center text-green-700 mb-6"
      >
        Team II Run Distribution
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PieChart
          data={batsmen_run_II}
          radius={30}
          center={[30, 50]}
          segmentsStyle={{ transition: "stroke .3s" }}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          labelPosition={70}
          labelStyle={{
            fontSize: "3px",
            fontFamily: "sans-serif",
            fill: "#121212",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "0px",
          }}
        >
          {batsmen_run_II.map((player, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: player.color,
                  borderRadius: "50%",
                  marginRight: "3px",
                }}
              ></div>
              <span>
                {player.title}: {player.value} runs
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Charts;
