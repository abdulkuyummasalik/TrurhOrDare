import { useState } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";

function WelcomePage({ onStart }) {
  const [playerName, setPlayerName] = useState("");

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName.trim());
    }
  };

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative page-transition-enter">
      <Header title="Welcome!" />

      <div className="flex-1 flex flex-col items-center justify-center py-2 animate-slideInUp">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-center px-4 animate-float">
          Truth or Dare
        </h1>

        <div className="w-full max-w-md px-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleStart()}
            placeholder="Masukkan nama kamu..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg md:text-xl text-center border-3 sm:border-4 border-white focus:border-[#50C878] smooth-transition bg-white text-[#FF1493] rounded-lg shadow-lg"
          />

          <div className="flex justify-end mt-2 sm:mt-3">
            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="bg-[#FF1493] text-white text-base sm:text-lg md:text-xl font-bold py-2 px-5 sm:px-6 md:px-8 rounded-lg hover:bg-[#50C878] smooth-bounce disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg btn-ripple"
            >
              Mulai →
            </button>
          </div>
        </div>
      </div>

      <BottomIcons />
    </div>
  );
}

export default WelcomePage;
