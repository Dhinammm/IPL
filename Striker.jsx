import { useState, useContext } from "react";
import "./App.css";
import { StrikerContext } from "./App";

function Strikers() {
  const top_strikers = useContext(StrikerContext);
  const strikerheaders = [
    "POS",
    "PLAYER",
    "SR",
    "RUNS",
    "BF",
    "4s",
    "6s",
    "AGAINST ",
    "VENUE",
    "MATCH DATE",
  ];

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Super strikers
        </h1>
        <table className="table-auto w-full bg-white shadow-md  overflow-hidden">
          <thead className="bg-red-500 text-white">
            <tr>
              {strikerheaders.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {top_strikers.map((striker, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-100 transition-colors`}
              >
                {striker.map((value, j) => (
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

export default Strikers;
