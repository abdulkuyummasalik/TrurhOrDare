import { useState, useEffect } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import FlowerBW from "./assets/icons/flower-bw.png";
import CatBW from "./assets/icons/cat-bw.png";

const truthQuestions = [
  "Hal pertama yang kepikiran pas pertama kali liat aku hari ini?",
  "Kalau aku tiba-tiba ngilang seminggu, hal apa tentang aku yang paling kamu cari?",
  "Hal paling kecil dari aku yang sebenernya kamu perhatiin?",
  "Pernah kepikiran “kok dia begini ya” tentang aku? Apa?",
  "Pernah ga pengen bilang sesuatu ke aku tapi ditahan?",
  "Hal apa dari aku/yang lain yang bikin kamu senyum tanpa sadar?",
  "Kamu ngerasa aku aman buat kamu ga?",
  "Kamu lebih sering mikir pake logika atau perasaan pas sama aku?",
  "Pernah salah nangkep omongan aku ga?",
  "Kalau aku tiba-tiba ngajak main truth or dare, kamu langsung mikir apa?",
  "Satu kata paling cocok buat ngegambarin vibe aku hari ini?",
  "Aku keliatan lebih tua, seumuran, atau lebih muda dari umur asli?",
  "Kalau aku telat bales chat, kamu mikir aku ngapain?",
  "Kalau aku duduk lebih dekat, kamu risih atau biasa aja?",
  "Ada ga bagian dari aku yang menurut kamu 'kok gitu sih' tapi lucu?",
  "Dari tadi, kamu lebih fokus ke obrolan atau ke aku?",
  "Ada ga satu hal hari ini yang bikin kamu mikir 'oh ternyata…' tentang aku?",
  "Hal apa dari diri kamu yang lagi kamu usahain buat diperbaiki?",
  "Ada ga bagian dari diri kamu yang pengen lebih dimengerti orang?",
  "Kamu lebih sering dengerin perasaan sendiri atau nurutin keadaan?",
  "Kalau lagi seneng, kamu keliatan ga atau dipendem?",
  "Biasanya kamu yang mulai ngobrol atau nunggu diajak?",
  "Kamu lebih nyaman dengerin atau cerita?",
  "Kalau kamu jadi versi diri kamu pas lagi capek, kayak gimana?",
  "Biasanya kamu ngerasa nyaman karena orangnya atau suasananya?",
  "Kamu tipe yang gampang percaya orang?",
  "Kalau lagi seneng, kamu tipe yang pengen share atau simpen sendiri?",
  "Kalau lagi ga mood, kamu keliatan atau ketutup rapi?",
  "Kamu orang yang gampang kepikiran omongan orang?",
  "Kamu lebih sering jadi pendengar atau yang butuh didenger?",
];

const dareChallenges = [
  "Tegur aku seolah aku salah, tapi kasih alasan paling konyol.",
  "Jepret selfie absurd, tapi pura-pura serius kayak model.",
  "Tiru gaya aku ngomong, tapi lebay.",
  "Tahan ekspresi malu-malu sambil aku liatin selama 10 detik.",
  "Pegang kepala sendiri seolah lagi berpikir keras, lebay banget.",
  "Pegang benda di dekatmu, angkat tinggi, bilang 'ini milikku!'.",
  "Tunjukkin foto masa kecil kamu.",
  "Ngomong ke aku sesuatu, tapi itu bohong.",
  "Suruh aku nilai ekspresi sedih palsu kamu selama 3 detik.",
  "Pura-pura lupa namaku dan minta aku ngenalin diri lagi.",
  "Nyanyi 5 detik lagu random.",
  "Jalan kayak model runway tapi lebay.",
  "Ngomong 1 kalimat dengan nada marah padahal isinya pujian.",
  "Pura-pura wawancara aku: 'Gimana rasanya ketemu aku hari ini?'",
  "Minta aku nilai senyum kamu dari 1–10.",
  "Makan sebungkus saus pedas secara langsung.",
  "Tunjukkan foto paling memalukan di galeri HP kamu.",
  "Biarkan orang lain menggelitikimu dan tahan untuk tidak tertawa.",
  "Baca keras-keras lima hal terakhir di riwayat pencarian kamu.",
  "Tutup mata dan biarkan seseorang menyuapi sesuatu.",
  "Ngobrol ke benda seolah itu orang yang kamu suka.",
  "Unggah foto random ke Instagram.",
  "Tunjukkan pesan favorit dari orang yang kamu suka.",
  "Telepon teman secara acak dan bilang: 'Ada apa menelponku?!'",
  "Akhiri setiap kalimat dengan kata 'guk' sampai giliran berikutnya.",
  "Buat ekspresi seperti habis makan sesuatu yang nggak enak dan tahan.",
  "Ulangi setiap perkataan orang di sampingmu sampai giliran selanjutnya.",
  "Minta aku nebak first impression kamu.",
  "Minta satu kata dari aku, lalu bikin kalimat manis dari kata itu.",
  "Main 'jangan senyum' selama 10 detik.",
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
    <div className="h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 overflow-hidden relative page-transition-enter">
      <Header
        title={`Kamu dapat ${spinType === "TRUTH" ? "Truth" : "Dare"}!`}
      />

      <div className="flex-1 flex flex-col items-center justify-center py-4 px-4 animate-slideInUp">
        <p className="text-sm sm:text-base text-white font-semibold mb-3 opacity-80 animate-fadeIn">
          {spinType === "TRUTH" ? "Pertanyaan:" : "Tantangan:"}
        </p>

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 relative border-4 border-pink-200 min-h-[200px] flex items-center justify-center smooth-transition hover:shadow-3xl animate-scaleIn">
          <div className="absolute top-3 left-3 animate-pulse-smooth">
            <img
              src={FlowerBW}
              alt="Decoration"
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-30"
            />
          </div>
          <div
            className="absolute top-3 right-3 animate-pulse-smooth"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={FlowerBW}
              alt="Decoration"
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-30"
            />
          </div>

          {isSpinning ? (
            <div className="text-center">
              <div className="animate-spin mb-4">
                <img
                  src={CatBW}
                  alt="Loading"
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-50"
                />
              </div>
              <p className="text-gray-400 text-base sm:text-lg italic">
                Mengacak...
              </p>
            </div>
          ) : (
            <div className="text-center animate-fadeIn">
              <p className="text-xl sm:text-2xl md:text-3xl font-playfair italic text-gray-800 leading-relaxed">
                "{currentQuestion}"
              </p>
            </div>
          )}

          <div className="absolute bottom-3 left-3 animate-wiggle">
            <img
              src={CatBW}
              alt="Decoration"
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-20"
            />
          </div>
          <div
            className="absolute bottom-3 right-3 animate-wiggle"
            style={{ animationDelay: "0.5s" }}
          >
            <img
              src={CatBW}
              alt="Decoration"
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-20"
            />
          </div>
        </div>

        {!isSpinning && currentQuestion && (
          <button
            onClick={handleReload}
            className="mt-4 text-white text-sm sm:text-base font-semibold underline hover:text-[#50C878] smooth-transition flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            🔄 Reload / Acak lagi
          </button>
        )}

        {!isSpinning && currentQuestion && (
          <div className="w-full max-w-md mt-6 space-y-3 animate-slideInUp">
            <button
              onClick={() => onNext(currentQuestion)}
              className="w-full bg-white text-[#FF1493] text-lg sm:text-xl font-bold py-3 px-8 rounded-lg hover:bg-[#50C878] hover:text-white smooth-bounce shadow-lg transform hover:scale-105 active:scale-95 btn-ripple"
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
