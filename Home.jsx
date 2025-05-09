import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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
  const [eco_bowler, setEcobowler] = useState();
  const [mvp, setMvp] = useState();
  // const [emerging_players_name, setEmergingPlayer] = useState([]);
  const [MOM, setMom] = useState();
  const [showEP, setEPShow] = useState();
  const [showBT, setBTShow] = useState(false);
  const [show, setShow] = useState(true);
  const [showBL, setBLShow] = useState(false);

  const [hide, setHide] = useState(true);
  const [top_batsmen, setTopbatsmen] = useState([]);
  const [top_bowlers, setTopbowlers] = useState([]);
  const [id, setId] = useState(57);

  const [team, setTeam] = useState(true);

  const [first_tab, setFT] = useState();
  const [second_tab, setST] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/?id=${id}`);

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
        setTeam_I(response.data.team_I);
        setTeam_II(response.data.team_II);
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
        setEcobowler(response.data.eco_bowler);
        setMvp(response.data.mvp);
        //setEmergingPlayer(response.data.emerging_players_name);
        setMom(response.data.man_of_the_match);
        setTopbatsmen(response.data.top_batsmen);
        setTopbowlers(response.data.top_bowlers);
        setFT(response.data.first_tab);
        setST(response.data.second_tab);
      } catch (error) {
        console.log(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (inn) {
      setBatsmen(batsmen_I);
      setBowlers(bowlers_I);
    } else {
      setBatsmen(batsmen_II);
      setBowlers(bowlers_II);
    }
  }, [inn, batsmen_II, bowlers_II, batsmen, bowlers, batsmen_I, bowlers_I]);

  function show_top_batters() {
    setBTShow(!showBT);
  }

  function show_top_bowlers() {
    setBLShow(!showBL);
  }

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

  const innings_switch = () => {
    setInn(!inn);
    setTeam(!team);
  };

  const show_emerging_players = () => {
    setEPShow(!showEP);
    setHide(!hide);
  };

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
        {/* Left Label */}
        <span
          className={`text-sm tracking-wide font-medium transition-all duration-150 ${
            team ? "text-black text-xl" : "text-gray-250"
          }`}
        >
          {second_tab}
        </span>

        {/* Toggle Switch */}
        <label className="bg-gray-100 cursor-pointer relative w-20 h-10 rounded-full">
          <input
            type="checkbox"
            id="check"
            className="sr-only peer"
            onClick={innings_switch}
          />
          <span className="w-9 h-9 bg-rose-600 absolute rounded-full top-0.5 left-0.5 peer-checked:bg-rose-600 peer-checked:translate-x-10 transition-transform duration-300"></span>
        </label>

        {/* Right Label */}
        <span
          className={`text-sm tracking-wide font-medium transition-all duration-150${
            !team ? "text-black text-xl" : "text-gray-250"
          }`}
        >
          {first_tab}
        </span>
      </div>
      <div className="overflow-x-auto relative p-10">
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
      <div className="mt-8 flex gap-4 justify-center">
        {
          <button
            onClick={() => setId(id - 1)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow transition-transform transform hover:scale-105"
          >
            ← Prev match
          </button>
        }

        {id < 57 && (
          <>
            <button
              onClick={() => setId(id + 1)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow transition-transform transform hover:scale-105"
            >
              Next match →
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
