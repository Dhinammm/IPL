import { useState, useContext } from "react";
import "./App.css";
import { matchContext } from "./App";

function Matches() {
  function click_here(i) {
    setId(last_match - i);
    setBL(false);
    setBT(false);
    setHome(true);
    setCharts(false);
    setval(false);
    setemp(false);
  }
  const {
    matches,
    Team_I,
    Team_II,
    last_match,
    setId,
    setHome,
    setBL,
    setBT,
    setCharts,
    setval,
    setemp,
  } = useContext(matchContext);

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <table className="p-3 w-full table-auto border-collapse relative">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="border px-4 py-2">Match No</th>
              <th className="border px-4 py-2">Team 1</th>
              <th className="border px-4 py-2">Team 2</th>
              <th className="border px-4 py-2">View match result</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, i) => (
              <tr key={i} className="hover:bg-blue-100">
                <td className="border px-4 py-2">{match}</td>
                <td className="border px-4 py-2">{Team_I[i]}</td>
                <td className="border px-4 py-2">{Team_II[i]}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => click_here(i)}
                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Click here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Matches;
