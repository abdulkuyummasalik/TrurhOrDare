import { useEffect } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import CatCelebration from "./assets/gifs/cat-selebration.png";

// Add confetti animation with MORE emojis
const style = document.createElement("style");
style.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    animation: confetti-fall 3s linear infinite;
    z-index: 50;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .bounce-in {
    animation: bounce-in 0.6s ease-out;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

function CelebrationPage({
  playerName,
  spinType,
  currentQuestion,
  onNextToSheets,
}) {
  useEffect(() => {
    // Console log data
    console.log("=== GAME DATA ===");
    console.log({
      playerName,
      spinType,
      currentQuestion,
      timestamp: new Date().toISOString(),
      status: "COMPLETED",
    });
    console.log("=================");

    // Create confetti elements - LEBIH BANYAK!
    const confettiContainer = document.createElement("div");
    confettiContainer.id = "confetti-container";
    document.body.appendChild(confettiContainer);

    const emojis = [
      "🎉",
      "🎊",
      "🎈",
      "🎀",
      "✨",
      "💖",
      "🌸",
      "🌺",
      "🌼",
      "🌻",
      "🦋",
      "⭐",
      "💫",
      "🎁",
      "🏆",
    ];

    // Buat 50 confetti (2.5x lebih banyak!)
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.fontSize = Math.random() * 10 + 15 + "px";
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      confettiContainer.appendChild(confetti);
    }

    // Cleanup
    return () => {
      if (confettiContainer) {
        confettiContainer.remove();
      }
    };
  }, [playerName, spinType, currentQuestion]);

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <Header title="Truth or Dare" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-2 px-4 relative z-10">
        {/* Success Message */}
        <div className="text-center mb-6 bounce-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Kamu berhasil!
          </h1>

          {/* GIF Celebration */}
          <div className="mb-4">
            <img
              src={CatCelebration}
              alt="Celebration"
              className="w-64 h-64 sm:w-72 md:w-80 mx-auto object-contain transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full max-w-md">
          <button
            onClick={onNextToSheets}
            className="w-full bg-white text-[#FF1493] text-base sm:text-lg font-bold py-3 px-6 hover:bg-[#50C878] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Lanjut →
          </button>
        </div>
      </div>

      <BottomIcons />
    </div>
  );
}

export default CelebrationPage;
