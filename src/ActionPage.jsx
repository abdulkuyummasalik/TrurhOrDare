import { useState, useEffect } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import CatRun from "./assets/gifs/cat-run.gif";
import CatStop from "./assets/gifs/cat-stop.png";

function ActionPage({
  playerName,
  spinType,
  currentQuestion,
  onComplete,
  onFail,
}) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showConfirmation) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && !showConfirmation) {
      setTimeout(() => {
        setShowConfirmation(true);
      }, 500);
    }
  }, [timeLeft, showConfirmation]);

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  const handleFail = () => {
    if (onFail) onFail();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft >= 16) return "text-green-500";
    if (timeLeft >= 6) return "text-yellow-500";
    return "text-red-500 animate-pulse";
  };

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <Header
        title={showConfirmation ? "Bagaimana hasilnya?" : "Segera selesaikan!"}
      />

      {/* Main Content */}
      {!showConfirmation ? (
        /* Timer & GIF View */
        <div className="flex-1 flex flex-col items-center justify-center py-2">
          {/* Timer */}
          <div className="mb-4">
            <div
              className={`text-5xl sm:text-6xl md:text-7xl font-bold ${getTimerColor()} transition-all duration-300`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* GIF Display */}
          <div className="mb-2 transition-all duration-500">
            <img
              src={timeLeft > 0 ? CatRun : CatStop}
              alt="Cat Action"
              className="w-48 h-48 sm:w-56 md:w-64 object-contain mx-auto"
            />
          </div>

          <p className="text-sm sm:text-base text-white opacity-70 text-center">
            {timeLeft > 0 ? "Sedang berjalan..." : "Waktu habis!"}
          </p>
        </div>
      ) : (
        /* Confirmation View */
        <div className="flex-1 flex flex-col items-center justify-center py-2">
          {/* Question Display */}
          {/* <div className="w-full max-w-md bg-black text-white rounded-2xl p-3 sm:p-4 mb-6 shadow-xl">
            <p className="text-center text-sm sm:text-base font-semibold">
              Bagaimana hasilnya?
            </p>
          </div> */}

          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-3 px-4">
            <button
              onClick={handleComplete}
              className="w-full bg-white text-gray-800 text-lg sm:text-xl font-bold py-3 px-6 border-4 border-pink-200 hover:bg-pink-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              COMPLETE !
            </button>

            <button
              onClick={handleFail}
              className="w-full bg-white text-gray-800 text-lg sm:text-xl font-bold py-3 px-6 border-4 border-pink-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              tidak dilakukan.
            </button>
          </div>
        </div>
      )}

      <BottomIcons />
    </div>
  );
}

export default ActionPage;
