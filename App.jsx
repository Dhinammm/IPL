import { useState, useEffect, createContext } from "react";
import "./App.css";
import axios from "axios";

import Top_batsmen from "./Top_batsmen";
import Top_bowlers from "./Top_bowlers";
import Matches from "./Matches";
import Charts from "./Charts";
import Home from "./Home";
import Emergers from "./Emerg";
import Strikers from "./Striker";
import Navbar from "./Navbar";

export const batsmenContext = createContext([]);
export const bowlersContext = createContext([]);
export const matchContext = createContext([]);
export const chartContext = createContext([]);
export const homeContext = createContext([]);
export const emergeContext = createContext([]);
export const StrikerContext = createContext([]);
export const NavbarContext = createContext([]);

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
  const [last_match, setLastmatch] = useState(50);
  const [id, setId] = useState(57);
  const [team, setTeam] = useState(true);
  const [top_batsmen_all, setTopBatsmen] = useState([
    ["", "", ""],
    ["", "", ""],
  ]);
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
  const [val, setval] = useState(false);
  const [top_strikers, setTopstrikers] = useState([]);
  const [show_strikers, setStrikers] = useState(false);

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
        setTopstrikers(response.data.top_strikers);
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
      <NavbarContext.Provider
        value={{
          home,
          topbowlers,
          batters,
          show_strikers,
          charts,
          val,
          emp,
          setStrikers,
          setBL,
          setBT,
          setHome,
          setCharts,
          setval,
          setemp,
        }}
      >
        <Navbar />
      </NavbarContext.Provider>
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

            {id < last_match && (
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
      {show_strikers && (
        <StrikerContext.Provider value={top_strikers}>
          <Strikers />
        </StrikerContext.Provider>
      )}
      {charts && (
        <chartContext.Provider
          value={{ batsmen_name, batsmen_run, batsmen_name_II, batsmen_run_II }}
        >
          <Charts />
        </chartContext.Provider>
      )}
      {val && (
        <matchContext.Provider
          value={{
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
          }}
        >
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
