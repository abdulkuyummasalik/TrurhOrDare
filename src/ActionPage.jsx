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
  isSubmitting, // 🆕 Terima loading state dari App
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
          {/* Action Buttons */}
          <div className="w-full max-w-md space-y-3 px-4">
            <button
              onClick={handleComplete}
              disabled={isSubmitting} // 🆕 Disable saat loading
              className={`w-full text-lg sm:text-xl font-bold py-3 px-6 border-4 border-pink-200 transition-all duration-300 transform shadow-lg ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-pink-100 hover:scale-105 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Memproses...</span>
                </span>
              ) : (
                "COMPLETE !"
              )}
            </button>

            <button
              onClick={handleFail}
              disabled={isSubmitting} // 🆕 Disable saat loading
              className={`w-full text-lg sm:text-xl font-bold py-3 px-6 border-4 border-pink-200 transition-all duration-300 transform shadow-lg ${
                isSubmitting
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-800 hover:bg-gray-100 hover:scale-105 active:scale-95"
              }`}
            >
              tidak dilakukan.
            </button>
          </div>

          {/* 🆕 Loading Indicator Text */}
          {isSubmitting && (
            <p className="text-white text-sm text-center mt-4 animate-pulse">
              Menyimpan hasil permainan...
            </p>
          )}
        </div>
      )}

      <BottomIcons />
    </div>
  );
}

export default ActionPage;
