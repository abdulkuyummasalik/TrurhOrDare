import { useState } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";

function WelcomePage({ onStart }) {
  const [playerName, setPlayerName] = useState("");

  const playerOptions = [
    { value: "", label: "-- Pilih Nama --" },
    { value: "Aa Khoyum", label: "Aa Khoyum" },
    { value: "Dede Reeva", label: "Dede Reeva" },
  ];

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName.trim());
    }
  };

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative page-transition-enter">
      <Header title="Welcome!" />

      <div className="flex-1 flex flex-col items-center justify-center py-2 animate-slideInUp">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-center px-4 animate-float drop-shadow-lg">
          Truth or Dare
        </h1>

        <div className="w-full max-w-md px-4">
          {/* Dropdown Select */}
          <div className="relative">
            <select
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-center border-3 sm:border-4 border-white focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878] smooth-transition bg-white text-[#FF1493] rounded-lg shadow-lg appearance-none cursor-pointer font-semibold"
            >
              {playerOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.value === ""}
                >
                  {option.label}
                </option>
              ))}
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF1493]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-end mt-3 sm:mt-4">
            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="bg-white text-[#FF1493] text-base sm:text-lg md:text-xl font-bold py-2.5 px-6 sm:px-8 md:px-10 rounded-lg hover:bg-[#50C878] hover:text-white smooth-bounce disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg border-3 border-white disabled:hover:bg-white disabled:hover:text-[#FF1493]"
            >
              Mulai →
            </button>
          </div>

          {/* Info Text */}
          <p className="text-white text-xs sm:text-sm text-center mt-4 opacity-80">
            Pilih nama kamu untuk memulai permainan
          </p>
        </div>
      </div>

      <BottomIcons />
    </div>
  );
}

export default WelcomePage;
