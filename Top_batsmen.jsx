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
    <>
      <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
        Top batsmen
      </h1>

      <table className="table-auto w-full bg-white shadow-md  overflow-hidden">
        <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
          <div className="mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
            <thead className="bg-blue-500 text-white">
              <tr>
                {batsmanHeaders.map((header, index) => (
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
              {top_batsmen.map((batsmen, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-100 transition-colors`}
                >
                  {batsmen.map((value, j) => (
                    <td key={j} className="px-4 py-3 text-xl">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      </table>
    </>
  );
}

export default Top_batsmen;
