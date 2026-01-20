import { useState, useEffect } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import FlowerBW from "./assets/icons/flower-bw.png";
import CatBW from "./assets/icons/cat-bw.png";

// Data pertanyaan TRUTH
const truthQuestions = [
  "Hal kecil dari aku yang paling kamu suka?",
  "Kapan pertama kali kamu ngerasa suka sama aku?",
  "Apa yang kamu pikirin tentang aku hari ini?",
  "Momen apa yang paling berkesan bareng aku?",
  "Kalau bisa, kamu mau ubah apa dari hubungan kita?",
  "Apa yang bikin kamu nyaman pas lagi sama aku?",
  "Cerita paling lucu yang kamu inget tentang aku?",
  "Apa kebiasaan aku yang bikin kamu gemas?",
  "Kamu pernah cemburu gak sama aku? Kapan?",
  "Apa harapan kamu buat kita ke depannya?",
  "Lagu apa yang bikin kamu inget sama aku?",
  "Apa yang kamu suka dari cara aku ngomong?",
  "Tempat favorit kamu buat kencan sama aku?",
  "Apa yang bikin kamu bangga punya aku?",
  "Cerita awkward kita yang paling kamu inget?",
];

// Data tantangan DARE
const dareChallenges = [
  "Pegang tangan sambil jalan selama 10 langkah",
  "Kasih compliment tulus ke pasangan kamu",
  "Foto bareng dengan pose lucu",
  "Nyanyi lagu favorit kamu (minimal 30 detik)",
  "Ceritain kenapa kamu suka sama dia",
  "Peluk selama 15 detik tanpa ngomong",
  "Buat pose romantis buat difoto",
  "Kasih tebak-tebakan lucu ke pasangan",
  "Joget bareng lagu random di HP",
  "Bilang 3 hal yang kamu syukurin hari ini",
  "Main suit, yang kalah harus piggyback 10 langkah",
  "Tuker barang (HP/dompet) selama 5 menit",
  "Buatin origami simple dari tisu/kertas",
  "Tebak makanan/minuman favorit pasangan",
  "Selfie dengan ekspresi paling lebay",
];

function Spin2Page({ playerName, spinType, onNext }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  useEffect(() => {
    handleSpin();
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    setCurrentQuestion("");

    setTimeout(() => {
      const questions = spinType === "TRUTH" ? truthQuestions : dareChallenges;
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  const handleReload = () => {
    handleSpin();
  };

  return (
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <Header
        title={`Kamu dapat ${spinType === "TRUTH" ? "Truth" : "Dare"}!`}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 px-4">
        {/* Question/Challenge Label */}
        <p className="text-sm sm:text-base text-white font-semibold mb-3 opacity-80">
          {spinType === "TRUTH" ? "Pertanyaan:" : "Tantangan:"}
        </p>

        {/* Question/Challenge Box */}
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 relative border-4 border-pink-200 min-h-[200px] flex items-center justify-center transition-all duration-500">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3">
            <img
              src={FlowerBW}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-30"
            />
          </div>
          <div className="absolute top-3 right-3">
            <img
              src={FlowerBW}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-30"
            />
          </div>

          {isSpinning ? (
            <div className="text-center">
              <div className="animate-spin mb-4">
                <img
                  src={CatBW}
                  alt=""
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-50"
                />
              </div>
              <p className="text-gray-400 text-base sm:text-lg italic">
                Mengacak...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
                "{currentQuestion}"
              </p>
            </div>
          )}

          {/* Decorative bottom corners */}
          <div className="absolute bottom-3 left-3">
            <img
              src={CatBW}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-20"
            />
          </div>
          <div className="absolute bottom-3 right-3">
            <img
              src={CatBW}
              alt=""
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-20"
            />
          </div>
        </div>

        {/* Reload/Acak Button */}
        {!isSpinning && currentQuestion && (
          <button
            onClick={handleReload}
            className="mt-4 text-white text-sm sm:text-base font-semibold underline hover:text-[#50C878] transition-colors flex items-center gap-2"
          >
            🔄 Reload / Acak lagi
          </button>
        )}

        {/* Action Buttons */}
        {!isSpinning && currentQuestion && (
          <div className="w-full max-w-md mt-6 space-y-3">
            <button
              onClick={() => onNext(currentQuestion)}
              className="w-full bg-white text-[#FF1493] text-lg sm:text-xl font-bold py-3 px-8 hover:bg-[#50C878] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Mulai →
            </button>
          </div>
        )}
      </div>

      <BottomIcons />
    </div>
  );
}

export default Spin2Page;
