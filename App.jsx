import Home from "./Home.jsx";
import Top_bowlers from "./Top_bowlers.jsx";
import Top_batsmen from "./Top_batsmen.jsx";
import Charts from "./Charts.jsx";
import { useState, useEffect } from "react";
import "./App.css";
import cricket from "./assets/cricket.jpeg";
function App() {
  const [bowlers, setBL] = useState(false);
  const [batters, setBT] = useState(false);
  const [home, setHome] = useState(true);
  const [charts, setCharts] = useState(false);
  const image = { uri: "https://legacy.reactjs.org/logo-og.png" };
  function top_bowlers() {
    setBL(true);
    setBT(false);
    setHome(false);
    setCharts(false);
  }
  function top_batsmen() {
    setBL(false);
    setBT(true);
    setHome(false);
    setCharts(false);
  }
  function home_page() {
    setBL(false);
    setBT(false);
    setHome(true);
    setCharts(false);
  }
  function set_charts() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(true);
  }
  return (
    <>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${cricket})` }}
      />

      <div className="min-h-screen bg-white-100 py-10 px-4 font-serif text overflow-x-auto">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-xl">
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
                          bowlers
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {home && <Home />}
          {bowlers && <Top_bowlers />}
          {batters && <Top_batsmen />}
          {charts && <Charts />}
        </div>
      </div>
    </>
  );
}
function MyComponent() {
  return (
    <div
      style={{
        backgroundImage: `url(${""})`,
        backgroundSize: "cover", // or contain, auto, etc.
        backgroundRepeat: "no-repeat",
        height: "100vh", // Example height
      }}
    ></div>
  );
}
export default App;
