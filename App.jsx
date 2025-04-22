import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [venue, setVenue] = useState("Loading...");
  const [innings_II, setInnings_II] = useState("");
  const [innings_I, setInnings_I] = useState("");
  const [team_I, setTeam_I] = useState("");
  const [team_II, setTeam_II] = useState("");
  const [winner, setWinner] = useState("Loading...");
  const [first_batting, setFirstBatting] = useState("");
  const [date, setDate] = useState("");
  const [referee, setReferee] = useState("");
  const [umpire_names, setUmpireNames] = useState("");
  const [count, setCount] = useState(0);
  const [toss_details, setTossDetails] = useState("");
  const [teams, setTeams] = useState("");
  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [batsmen_I, setBatsmen_I] = useState([]);
  const [bowlers_I, setBowlers_I] = useState([]);
  const [extras, setExtras] = useState([]);
  const [batsmen_II, setBatsmen_II] = useState([]);
  const [bowlers_II, setBowlers_II] = useState([]);
  const [best_partnership, setBestPartnership] = useState();
  const [max_runs, setMaxruns] = useState();
  const [max_wickets, setMaxwickets] = useState();
  const [top_run_getter, setTopRG] = useState();
  const [top_wicket_taker, setTopWT] = useState();
  const [inn, setInn] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");

        setVenue(response.data.venue);
        setWinner(response.data.winner);
        setInnings_I(response.data.innings_I);
        setInnings_II(response.data.innings_II);
        setDate(response.data.date);
        setFirstBatting(response.data.first_batting);
        setTossDetails(response.data.toss_details);
        setUmpireNames(response.data.umpire_names);
        setReferee(response.data.referee);
        setTeams(response.data.teams);
        setTeam_I(response.data.team_I)
        setTeam_II(response.data.team_II)
        setBatsmen_I(response.data.batsmen_data);
        setBowlers_I(response.data.bowlers_data);
        setExtras(response.data.extras);
        setBatsmen_II(response.data.batsmen_data_II);
        setBowlers_II(response.data.bowlers_data_II);
        setBestPartnership(response.data.best_partnership);
        setTopRG(response.data.top_run_getter);
        setTopWT(response.data.top_wicket_taker);
        setMaxruns(response.data.max_runs);
        setMaxwickets(response.data.max_wickets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    if (inn) {
      setBatsmen(batsmen_I);
      setBowlers(bowlers_I);
    } else {
      setBatsmen(batsmen_II);
      setBowlers(bowlers_II);
    }
  }, [inn, batsmen_II, bowlers_II, batsmen, bowlers, batsmen_I, bowlers_I]);

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
    "Dots"
  ];

  const innings_switch = () => {
    setInn(!inn);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Match Summary
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Venue</td><td className="p-3">{venue}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Winner</td><td className="p-3">{winner}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">{team_I} innings</td><td className="p-3">{innings_I}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">{team_II} innings</td><td className="p-3">{innings_II}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Date</td><td className="p-3">{date}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">First Batting</td><td className="p-3">{first_batting}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Toss Details</td><td className="p-3">{toss_details}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Umpires</td><td className="p-3">{umpire_names}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Referee</td><td className="p-3">{referee}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Teams</td><td className="p-3">{teams}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Best partnership</td><td className="p-3">{best_partnership}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Top Batsman</td><td className="p-3">{top_run_getter}</td></tr>
              <tr className="hover:bg-indigo-50 transition"><td className="p-3 font-semibold">Top Bowler</td><td className="p-3">{top_wicket_taker}</td></tr>
              <tr className="hover:bg-indigo-50 transition align-top">
                <td className="p-3 font-semibold">Batsmen Data</td>
                <td className="p-3">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-xs md:text-sm mb-4">
                      <thead className="bg-gray-200">
                        <tr>
                          {batsmanHeaders.map((header, index) => (
                            <th key={index} className="p-2 border text-left">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {batsmen.map((batsman, i) => (
                          <tr key={i} className="hover:bg-gray-100">
                            {batsman.map((value, j) => (
                              <td key={j} className="p-2 border">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <table className="min-w-full border text-xs md:text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          {bowlersHeaders.map((header, index) => (
                            <th key={index} className="p-2 border text-left">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bowlers.map((bowler, i) => (
                          <tr key={i} className="hover:bg-gray-100">
                            {bowler.map((value, j) => (
                              <td key={j} className="p-2 border">{value}</td>
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

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => setCount(count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow transition-transform transform hover:scale-105"
          >
            Refresh Data
          </button>
          <button
            onClick={innings_switch}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow transition-transform transform hover:scale-105"
          >
            Switch Innings
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
