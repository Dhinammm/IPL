import { useState, useContext } from "react";
import "./App.css";
import { bowlersContext } from "./App";

function Top_bowlers() {
  const top_bowlers = useContext(bowlersContext);
  const bowlerheaders = [
    "POS",
    "PLAYER",
    "WICKETS",
    "MAT",
    "INNS",
    "OVERS",
    "RUNS",
    "BBI",
    "AVERAGE",
    "ECONOMY",
    "STRIKE RATE",
    "4W",
    "5W",
  ];

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Top bowlers
        </h1>

        <table className="table-auto w-full bg-white shadow-md  overflow-hidden">
          <thead className="bg-pink-500 text-white">
            <tr>
              {bowlerheaders.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top_bowlers.map((bowlers, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 transition-colors`}
              >
                {bowlers.map((value, j) => (
                  <td key={j} className="px-4 py-3 text-xl">
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

export default Top_bowlers;
