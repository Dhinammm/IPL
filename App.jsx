import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [venue, setVenue] = useState("Loading...");
  const [innings_II, setInnings_II] = useState("-/-");
  const [innings_I, setInnings_I] = useState("-/-");
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
  const [emerging_players_name, setEmergingPlayer] = useState([]);
  const [MOM, setMom] = useState();
  const [showEP, setEPShow] = useState();
  const [showBT, setBTShow] = useState(false);
  const [show, setShow] = useState(true);
  const [showBL, setBLShow] = useState(false);
  const [last_match, setLastmatch] = useState(50);
  const [hide, setHide] = useState(true);
  // const [top_batsmen, setTopbatsmen] = useState([]);
  // const [top_bowlers, setTopbowlers] = useState([]);
  const [id, setId] = useState(57);

  const [team, setTeam] = useState(true);
  const [top_batsmen_all, setTopBatsmen] = useState([]);
  const [top_bowlers_all, setTopbowlers] = useState([]);
  const [first_tab, setFT] = useState();
  const [second_tab, setST] = useState();

  const [matches, setMatches] = useState(["------------------"]);
  const [Team_I, setTeamsI] = useState([]);
  const [Team_II, setTeamsII] = useState([]);

  const [topbowlers, setBL] = useState(false);
  const [batters, setBT] = useState(false);
  const [home, setHome] = useState(true);
  const [charts, setCharts] = useState(false);
  const [batsmen_run, setBatsmenRun] = useState([]);
  const [batsmen_run_II, setBatsmenRunII] = useState([]);
  const [batsmen_name, setBatsmenname] = useState([]);
  const [batsmen_name_II, setBatsmennameII] = useState([]);
  const [emp, setemp] = useState(false);
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
  const [val, setval] = useState(false);
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
        setEmergingPlayer(response.data.emerging_players_name);
        setMom(response.data.man_of_the_match);
        setTopBatsmen(response.data.top_batsmen);
        setTopbowlers(response.data.top_bowlers);
        setFT(response.data.first_tab);
        setST(response.data.second_tab);
        setBatsmenRun(response.data.batsmen_run);
        setBatsmenRunII(response.data.batsmen_run_II);
        setBatsmenname(response.data.batsmen_name);
        setBatsmennameII(response.data.batsmen_name_II);
      } catch (error) {
        console.log(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/match_index`);
        setMatches(
          Array.isArray(response.data.matches) ? response.data.matches : []
        );
        setTeamsI(response.data.team1);
        setTeamsII(response.data.team2);
        setLastmatch(response.data.last_match);
      } catch (error) {
        console.log(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  function top_batsmen() {
    setBL(false);
    setBT(true);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(false);
  }
  function top_bowlers() {
    setBL(true);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(false);
  }

  function home_page() {
    setBL(false);
    setBT(false);
    setHome(true);
    setCharts(false);
    setval(false);
    setemp(false);
  }
  function set_charts() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(true);
    setval(false);
    setemp(false);
  }
  function view_results() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(true);
    setemp(false);
  }
  function click_here(i) {
    setId(last_match - i);
    setBL(false);
    setBT(false);
    setHome(true);
    setCharts(false);
    setval(false);
    setemp(false);
  }
  function show_emerging_players() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(true);
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
  const batsmenHeaders = [
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

  const innings_switch = () => {
    setInn(!inn);
    setTeam(!team);
  };

  return (
    <>
      <nav className="bg-gray-800 w-full table-auto border-collapse">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="relative cursor-pointer inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center"></div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <button
                    onClick={home_page}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      home
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    aria-current="page"
                  >
                    Home
                  </button>
                  <button
                    onClick={top_bowlers}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      topbowlers
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    aria-current="page"
                  >
                    Top_bowlers
                  </button>
                  <button
                    onClick={top_batsmen}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      batters
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Top_batsmen
                  </button>

                  <button
                    onClick={set_charts}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      charts
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Charts
                  </button>
                  <button
                    onClick={view_results}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      val
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    View results
                  </button>
                  <button
                    onClick={show_emerging_players}
                    className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                      emp
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Emerging Players 2025
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {home && (
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
      )}
      {batters && (
        <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
            <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
              Top batsmen
            </h1>

            <table className="table-auto w-full bg-white border border-gray-300">
              <thead className="bg-pink-500 text-white">
                <tr>
                  {batsmenHeaders.map((header, index) => (
                    <th key={index} className="p-2 border text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {top_batsmen_all.map((batsmen, i) => (
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
      )}
      {topbowlers && (
        <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
            <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
              Top bowlers
            </h1>

            <table className="table-auto w-full bg-white border border-gray-300">
              <thead className="bg-pink-500 text-white">
                <tr>
                  {bowlerheaders.map((header, index) => (
                    <th key={index} className="p-2 border text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {top_bowlers_all.map((bowlers, i) => (
                  <tr key={i} className="hover:bg-blue-100">
                    {bowlers.map((value, j) => (
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
      )}
      {charts && (
        <>
          <Bar
            data={{
              labels: batsmen_name.map((batsman) => batsman.name),
              datasets: [
                {
                  label: "Team I run distribution",
                  data: batsmen_run.map((batsman) => batsman.runs),
                  backgroundColor: colors,
                  borderRadius: 2,
                  width: 100,
                },
              ],
            }}
          />
          <Bar
            data={{
              labels: batsmen_name_II.map((batsman) => batsman.name),
              datasets: [
                {
                  label: "Team II run distribution",
                  data: batsmen_run_II.map((batsman) => batsman.runs),
                  backgroundColor: colors,
                  borderRadius: 2,
                  width: 100,
                },
              ],
            }}
          />
        </>
      )}
      {val && (
        <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
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
      )}
      {emp && (
        <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
            <table className="p-3 w-full table-auto border-collapse relative">
              <thead className="bg-pink-500 text-white">
                <tr>
                  <th className="border px-4 py-2">Players</th>
                </tr>
              </thead>
              <tbody>
                {emerging_players_name.map((match, i) => (
                  <tr key={i} className="hover:bg-blue-100">
                    <td className="border px-4 py-2">{match}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
