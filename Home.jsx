import { useState, useEffect, useContext } from "react";
import "./App.css";
import { homeContext } from "./App.jsx";
import App from "./App.jsx";
function Home() {
  function innings_switch() {
    setInn(!inn);
    setTeam(!team);
  }

  const {
    venue,
    innings_I,
    innings_II,
    team_I,
    team_II,
    winner,
    first_batting,
    date,
    referee,
    umpire_names,
    count,
    toss_details,
    teams,
    MOM,
    best_partnership,
    top_run_getter,
    top_wicket_taker,
    eco_bowler,
    mvp,
    team,
    first_tab,
    second_tab,
    batsmen,
    inn,
    batsmen_I,
    batsmen_II,
    bowlers_I,
    bowlers_II,
    bowlers,
    id,
    setInn,
    setTeam,
    setBatsmen,
    setBowlers,
    Team_I,
    Team_II,
    last_match,
  } = useContext(homeContext);

  const batsmanHeaders = [
    "Name",
    "Dismissal",
    "Runs",
    "Balls",
    "4s",
    "6s",
    "Strike Rate",
  ];

  const bowlersHeaders = [
    "Name",
    "          ",
    "Overs",
    "Maiden",
    "Runs",
    "Wickets",
    "Economy",
    "Dots",
  ];
  useEffect(() => {
    if (inn) {
      setBatsmen(batsmen_I);
      setBowlers(bowlers_I);
    } else {
      setBatsmen(batsmen_II);
      setBowlers(bowlers_II);
    }
  }, [inn, batsmen_II, bowlers_II, batsmen_I, bowlers_I]);

  return (
    <>
      <h1 className="p-3 text-3xl font-extrabold text-center text-green-700 mb-6">
        Match Summary
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-400 text-white ">
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm text-xl">
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold ">Venue</td>
              <td className="p-3 ">{venue}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Winner</td>
              <td className="p-3">{winner}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">{team_I} innings</td>
              <td className="p-3">{innings_I}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">{team_II} innings</td>
              <td className="p-3">{innings_II}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Date</td>
              <td className="p-3">{date}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">First Batting</td>
              <td className="p-3">{first_batting}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Toss Details</td>
              <td className="p-3">{toss_details}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Umpires</td>
              <td className="p-3">{umpire_names}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Referee</td>
              <td className="p-3">{referee}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Teams</td>
              <td className="p-3">{teams}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Man of the match</td>
              <td className="p-3">{MOM}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Best partnership</td>
              <td className="p-3">{best_partnership}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Top Batsman</td>
              <td className="p-3">{top_run_getter}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Top Bowler</td>
              <td className="p-3">{top_wicket_taker}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Most economical bowler</td>
              <td className="p-3">{eco_bowler}</td>
            </tr>
            <tr className="hover:bg-indigo-50 transition">
              <td className="p-3 font-semibold">Most valuable player</td>
              <td className="p-3">{mvp}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <span
          className={`text-sm tracking-wide font-medium transition-all duration-150 ${
            team ? "text-black text-xl" : "text-gray-250"
          }`}
        >
          {second_tab}
        </span>

        <label className="bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full">
          <input
            type="checkbox"
            id="check"
            className="sr-only peer"
            onClick={innings_switch}
          />
          <span className="w-9 h-9 bg-rose-600 absolute rounded-full top-0.5 left-0.5 peer-checked:bg-rose-600 peer-checked:translate-x-10 transition-transform duration-300"></span>
        </label>

        <span
          className={`text-sm tracking-wide font-medium transition-all duration-150${
            !team ? "text-black text-xl" : "text-gray-250"
          }`}
        >
          {first_tab}
        </span>
      </div>
      <div className="overflow-x-auto relative p-10 ">
        <table className="w-full table-auto border-collapse relative">
          <tbody className="text-gray-700 text-sm text-xl">
            <tr className="hover:bg-indigo-50 transition align-top">
              <td className="p-3 font-semibold">Batsmen Data</td>
              <td className="p-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-xl md:text-sm mb-4">
                    <thead className="bg-blue-200">
                      <tr>
                        {batsmanHeaders.map((header, index) => (
                          <th key={index} className="p-2 border text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {batsmen.map((batsman, i) => (
                        <tr key={i} className="hover:bg-blue-100">
                          {batsman.map((value, j) => (
                            <td key={j} className="p-2 border">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-indigo-50 transition align-top">
              <td className="p-3 font-semibold">Bowlers Data</td>
              <td className="p-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-xs md:text-sm">
                    <thead className="bg-blue-200">
                      <tr>
                        {bowlersHeaders.map((header, index) => (
                          <th key={index} className="p-2 border text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bowlers.map((bowler, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                          {bowler.map((value, j) => (
                            <td key={j} className="p-2 border">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
