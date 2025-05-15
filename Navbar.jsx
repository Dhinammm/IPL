import React, { useContext } from "react";
import { NavbarContext } from "./App";
function Navbar() {
  const {
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
  } = useContext(NavbarContext);

  function top_batsmen() {
    setBL(false);
    setBT(true);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(false);
    setStrikers(false);
  }
  function top_bowlers() {
    setBL(true);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(false);
    setStrikers(false);
  }

  function home_page() {
    setBL(false);
    setBT(false);
    setHome(true);
    setCharts(false);
    setval(false);
    setemp(false);
    setStrikers(false);
  }
  function set_charts() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(true);
    setval(false);
    setemp(false);
    setStrikers(false);
  }
  function view_results() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(true);
    setemp(false);
    setStrikers(false);
  }

  function show_emerging_players() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(true);
    setStrikers(false);
  }
  function show_top_strikers() {
    setBL(false);
    setBT(false);
    setHome(false);
    setCharts(false);
    setval(false);
    setemp(false);
    setStrikers(true);
  }
  return (
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
                  onClick={show_top_strikers}
                  className={`rounded-md cursor-pointer px-3 py-2 text-sm font-medium ${
                    show_strikers
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Super strikers
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
  );
}
export default Navbar;
