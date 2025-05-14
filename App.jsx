import { useState, useEffect, createContext } from "react";
import "./App.css";
import axios from "axios";

import Top_batsmen from "./Top_batsmen";
import Top_bowlers from "./Top_bowlers";
import Matches from "./Matches";
import Charts from "./Charts";
import Home from "./Home";
import Emergers from "./Emerg";

export const batsmenContext = createContext([]);
export const bowlersContext = createContext([]);
export const matchContext = createContext([]);
export const chartContext = createContext([]);
export const homeContext = createContext([]);
export const emergeContext = createContext([]);

function App() {
  function innings_switch() {
    setInn(!inn);
    setTeam(!team);
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
  const [top_batsmen_all, setTopBatsmen] = useState([
    ["xkcjnbvb", "sdongsdlijkgn", "soihdgoisujnd"],
    ["skdjngs", "sdkljnbgsdkljnb", "kspdjngskdjn"],
  ]);

  const [top_bowlers_all, setTopbowlers] = useState([]);
  const [first_tab, setFT] = useState();
  const [second_tab, setST] = useState();

  const [matches, setMatches] = useState(["------------------"]);
  const [Team_I, setTeamsI] = useState([]);
  const [Team_II, setTeamsII] = useState([]);
  const team_context = { matches, Team_I, Team_II };
  const [topbowlers, setBL] = useState(false);
  const [batters, setBT] = useState(false);
  const [home, setHome] = useState(true);
  const [charts, setCharts] = useState(false);
  const [batsmen_run, setBatsmenRun] = useState([]);
  const [batsmen_run_II, setBatsmenRunII] = useState([]);
  const [batsmen_name, setBatsmenname] = useState([]);
  const [batsmen_name_II, setBatsmennameII] = useState([]);
  const [emp, setemp] = useState(false);

  const [val, setval] = useState(false);
  const [value, setValue] = useState("Hello world");
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
          <homeContext.Provider
            value={{
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
            }}
          >
            <Home />
          </homeContext.Provider>
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
        <batsmenContext.Provider value={top_batsmen_all}>
          <Top_batsmen />
        </batsmenContext.Provider>
      )}
      {topbowlers && (
        <bowlersContext.Provider value={top_bowlers_all}>
          <Top_bowlers />
        </bowlersContext.Provider>
      )}
      {charts && (
        <chartContext.Provider
          value={{ batsmen_name, batsmen_run, batsmen_name_II, batsmen_run_II }}
        >
          <Charts />
        </chartContext.Provider>
      )}
      {val && (
        <matchContext.Provider value={{ matches, Team_I, Team_II }}>
          <Matches />
        </matchContext.Provider>
      )}
      {emp && (
        <emergeContext.Provider value={emerging_players_name}>
          <Emergers />
        </emergeContext.Provider>
      )}
    </>
  );
}

export default App;
