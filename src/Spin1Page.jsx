import { useState } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import Truth from "./assets/icons/truth.png";
import Dare from "./assets/icons/dare.png";

// Add custom animations
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.8);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

function Spin1Page({ playerName, onResult }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState("");
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    setIsSpinning(true);
    setSpinResult("");

    // Tentukan hasil dulu
    const result = Math.random() > 0.5 ? "TRUTH" : "DARE";

    // Hitung rotasi berdasarkan hasil
    const baseRotation = 1440; // 4 putaran
    let finalAngle;

    if (result === "TRUTH") {
      finalAngle = 90 + (Math.random() * 60 - 30);
    } else {
      finalAngle = 270 + (Math.random() * 60 - 30);
    }

    const finalRotation = baseRotation + finalAngle;
    setRotation(finalRotation);

    // Animasi spin selama 3 detik
    setTimeout(() => {
      setSpinResult(result);
      setIsSpinning(false);
    }, 3000);
  };

  const handleReset = () => {
    setSpinResult("");
    setRotation(0);
  };

  const handleNext = () => {
    if (onResult) {
      onResult(spinResult);
    }
  };

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <Header title={`Halo, ${playerName}!`} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <p className="text-base sm:text-lg md:text-xl text-white mb-3 sm:mb-4 font-semibold">
          Siap untuk tantangan?
        </p>

        {/* Spin Wheel Container */}
        <div className="relative w-52 h-52 sm:w-60 md:w-72 lg:w-80 sm:h-60 md:h-72 lg:h-80 flex items-center justify-center mb-4 sm:mb-6">
          {/* Spin Wheel */}
          <div
            className="absolute w-44 h-44 sm:w-52 md:w-60 lg:w-68 sm:h-52 md:h-60 lg:h-68 rounded-full overflow-hidden border-4 sm:border-6 border-white shadow-2xl transition-transform duration-[3000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Truth Side (Left) */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-white flex items-center justify-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 -rotate-90 italic font-serif">
                Truth
              </p>
            </div>

            {/* Dare Side (Right) */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 flex items-center justify-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white rotate-90 italic font-serif">
                Dare
              </p>
            </div>

            {/* Center Line */}
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-600 transform -translate-x-1/2"></div>
          </div>

          {/* Arrow Pointer (Top) */}
          <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[12px] sm:border-l-[15px] border-l-transparent border-r-[12px] sm:border-r-[15px] border-r-transparent border-t-[20px] sm:border-t-[25px] border-t-[#50C878]"></div>
          </div>

          {/* Center Button */}
          {!isSpinning && !spinResult && (
            <button
              onClick={handleSpin}
              className="absolute z-20 w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 bg-[#50C878] rounded-full flex items-center justify-center shadow-xl hover:bg-[#FF1493] transition-all duration-300 transform hover:scale-110 active:scale-95 border-3 sm:border-4 border-white"
            >
              <span className="text-white text-base sm:text-lg md:text-xl font-bold">
                SPIN
              </span>
            </button>
          )}

          {/* Result Display - MODAL */}
          {spinResult && !isSpinning && (
            <>
              {/* Backdrop Blur */}
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 animate-fadeIn"></div>

              {/* Modal Container */}
              <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-8 animate-scaleIn relative">
                  {/* Close Decoration */}
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-[#50C878] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg animate-pulse-slow">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                  </div>

                  {/* Icon based on result */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-pink-50 rounded-full p-4 sm:p-6">
                      <img
                        src={spinResult === "TRUTH" ? Truth : Dare}
                        alt={spinResult}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                    </div>
                  </div>

                  {/* Result Text */}
                  <h3 className="text-3xl sm:text-4xl font-bold text-center mb-2">
                    <span
                      className={
                        spinResult === "TRUTH"
                          ? "text-pink-500"
                          : "text-gray-800"
                      }
                    >
                      {spinResult}!
                    </span>
                  </h3>

                  <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
                    {spinResult === "TRUTH"
                      ? "Siap menjawab dengan jujur?"
                      : "Siap melakukan tantangan?"}
                  </p>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#FF1493] text-white text-base sm:text-lg font-bold py-3 px-6 hover:bg-[#50C878] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                      Lanjutkan →
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-100 text-gray-700 text-sm sm:text-base font-semibold py-2 px-6 hover:bg-gray-200 transition-all duration-300 active:scale-95"
                    >
                      Spin Ulang
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Text */}
        {!spinResult && !isSpinning && (
          <p className="text-sm sm:text-base text-white opacity-70 text-center px-4">
            Tap SPIN untuk mulai!
          </p>
        )}
      </div>

      <BottomIcons />
    </div>
  );
}

export default Spin1Page;
