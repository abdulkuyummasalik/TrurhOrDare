import { useEffect } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import CatCelebration from "./assets/gifs/cat-selebration.png";

function CelebrationPage({
  playerName,
  spinType,
  currentQuestion,
  onNextToSheets,
}) {
  useEffect(() => {
    const confettiContainer = document.createElement("div");
    confettiContainer.id = "confetti-container";
    confettiContainer.className =
      "fixed inset-0 pointer-events-none z-50 overflow-hidden";
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
      "🎆",
      "🎉",
      "🎊",
      "🎉",
      "🎊",
      "🎇",
      "💝",
      "💗",
      "💓",
      "💕",
      "🌹",
      "🌷",
      "🏵️",
      "🦄",
      "🌈",
      "☀️",
      "🌟",
      "💐",
      "🎪",
    ];

    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-particle";
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const startX = Math.random() * 100;
      const startY = -20 - Math.random() * 80;
      const endX = startX + (Math.random() * 40 - 20);
      const rotation = Math.random() * 1080 - 540;

      confetti.style.left = startX + "vw";
      confetti.style.top = startY + "vh";
      confetti.style.fontSize = Math.random() * 18 + 24 + "px";
      confetti.style.animationDelay = Math.random() * 1.5 + "s";
      confetti.style.animationDuration = Math.random() * 2.5 + 4 + "s";
      confetti.style.setProperty("--end-x", endX + "vw");
      confetti.style.setProperty("--rotation", rotation + "deg");
      confetti.style.opacity = Math.random() * 0.3 + 0.7;

      confettiContainer.appendChild(confetti);
    }

    return () => {
      if (confettiContainer) {
        confettiContainer.remove();
      }
    };
  }, []);

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative page-transition-enter">
      <Header title="Truth or Dare" />

      <div className="flex-1 flex flex-col items-center justify-center py-4 px-4 relative z-10">
        <div className="text-center space-y-6">
          <div className="relative animate-bounceIn">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse-smooth"></div>
            <img
              src={CatCelebration}
              alt="Celebration"
              className="w-64 h-64 sm:w-72 md:w-80 lg:w-96 mx-auto object-contain smooth-transition hover:scale-110 hover:rotate-3 relative z-10 drop-shadow-2xl"
            />
          </div>

          <div
            className="space-y-3 animate-slideInUp"
            style={{ animationDelay: "0.15s" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              Kamu Berhasil!
            </h1>
            <p className="text-base sm:text-lg text-white opacity-90 font-medium drop-shadow-lg">
              Hebat! Tantangan diselesaikan dengan sempurna! 🎉
            </p>
          </div>

          <div
            className="w-full max-w-md mx-auto pt-2 animate-slideInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={onNextToSheets}
              className="w-full bg-white text-[#FF1493] text-base sm:text-lg md:text-xl font-bold py-2 px-4 rounded-xl hover:bg-[#50C878] hover:text-white smooth-bounce shadow-2xl transform hover:scale-105 active:scale-95 btn-ripple border-4 border-white hover:border-[#50C878]"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Kembali ke Awal</span>
                <span className="text-xl">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <BottomIcons />
    </div>
  );
}

export default CelebrationPage;
