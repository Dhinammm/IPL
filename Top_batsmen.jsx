import React, { useContext } from "react";
import "./App.css";
import { batsmenContext } from "./App";

function Top_batsmen() {
  const top_batsmen = useContext(batsmenContext);

  const batsmanHeaders = [
    "POS",
    "PLAYER",
    "RUNS",
    "MAT",
    "INNS",
    "NOT OUTS",
    "HIGHEST SCORE",
    "AVERAGE",
    "BEST FIGURES",
    "STRIKE RATE",
    "100s",
    "50s",
    "4s",
    "6s",
  ];

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Top batsmen
        </h1>

        <table className="table-auto w-full bg-white border border-gray-300">
          <thead className="bg-pink-500 text-white">
            <tr>
              {batsmanHeaders.map((header, index) => (
                <th key={index} className="p-2 border text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top_batsmen.map((batsmen, i) => (
              <tr key={i} className="hover:bg-blue-100">
                {batsmen.map((value, j) => (
                  <td key={j} className="p-2 border">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Top_batsmen;
