import { useState } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import Truth from "./assets/icons/truth.png";
import Dare from "./assets/icons/dare.png";

function Spin1Page({ playerName, onResult }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState("");
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    setIsSpinning(true);
    setSpinResult("");

    const result = Math.random() > 0.5 ? "TRUTH" : "DARE";
    const baseRotation = 1440;
    let finalAngle;

    if (result === "TRUTH") {
      finalAngle = 90 + (Math.random() * 60 - 30);
    } else {
      finalAngle = 270 + (Math.random() * 60 - 30);
    }

    const finalRotation = baseRotation + finalAngle;
    setRotation(finalRotation);

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
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative page-transition-enter">
      <Header title={`Halo, ${playerName}!`} />

      <div className="flex-1 flex flex-col items-center justify-center py-2 animate-slideInUp">
        <p className="text-base sm:text-lg md:text-xl text-white mb-3 sm:mb-4 font-semibold animate-fadeIn">
          Siap untuk tantangan?
        </p>

        <div className="relative w-52 h-52 sm:w-60 md:w-72 lg:w-80 sm:h-60 md:h-72 lg:h-80 flex items-center justify-center mb-4 sm:mb-6">
          <div
            className="absolute w-44 h-44 sm:w-52 md:w-60 lg:w-68 sm:h-52 md:h-60 lg:h-68 rounded-full overflow-hidden border-4 sm:border-6 border-white shadow-2xl transition-transform duration-[3000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <div className="absolute top-0 left-0 w-1/2 h-full bg-white flex items-center justify-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 -rotate-90 italic font-playfair">
                Truth
              </p>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 flex items-center justify-center">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white rotate-90 italic font-playfair">
                Dare
              </p>
            </div>

            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-600 transform -translate-x-1/2"></div>
          </div>

          <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <div className="w-0 h-0 border-l-[12px] sm:border-l-[15px] border-l-transparent border-r-[12px] sm:border-r-[15px] border-r-transparent border-t-[20px] sm:border-t-[25px] border-t-[#50C878]"></div>
          </div>

          {!isSpinning && !spinResult && (
            <button
              onClick={handleSpin}
              className="absolute z-20 w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 bg-[#50C878] rounded-full flex items-center justify-center shadow-xl hover:bg-[#FF1493] smooth-bounce border-3 sm:border-4 border-white animate-pulse-smooth btn-ripple"
            >
              <span className="text-white text-base sm:text-lg md:text-xl font-bold">
                SPIN
              </span>
            </button>
          )}

          {spinResult && !isSpinning && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 animate-fadeIn"></div>

              <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-8 animate-bounceIn relative">
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-[#50C878] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg animate-pulse-smooth">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="bg-pink-50 rounded-full p-4 sm:p-6 animate-scaleIn">
                      <img
                        src={spinResult === "TRUTH" ? Truth : Dare}
                        alt={spinResult}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                    </div>
                  </div>

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

                  <div className="space-y-3">
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#FF1493] text-white text-base sm:text-lg font-bold py-3 px-6 rounded-lg hover:bg-[#50C878] smooth-bounce shadow-lg transform hover:scale-105 active:scale-95 btn-ripple"
                    >
                      Lanjutkan →
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-100 text-gray-700 text-sm sm:text-base font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 smooth-transition active:scale-95"
                    >
                      Spin Ulang
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {!spinResult && !isSpinning && (
          <p className="text-sm sm:text-base text-white opacity-70 text-center px-4 animate-pulse-smooth">
            Tap SPIN untuk mulai!
          </p>
        )}
      </div>

      <BottomIcons />
    </div>
  );
}

export default Spin1Page;
