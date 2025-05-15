import { useState, useContext } from "react";
import "./App.css";
import { emergeContext } from "./App";

function Emergers() {
  const emergers = useContext(emergeContext);

  return (
    <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
        <table className="p-3 w-full table-auto border-collapse relative">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="border px-4 py-2">Players</th>
            </tr>
          </thead>
          <tbody>
            {emergers.map((match, i) => (
              <tr key={i} className="hover:bg-blue-100">
                <td className="border px-4 py-2">{match}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Emergers;
