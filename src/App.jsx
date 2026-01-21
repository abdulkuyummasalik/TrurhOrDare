import { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import Spin1Page from "./Spin1Page";
import Spin2Page from "./Spin2Page";
import ActionPage from "./ActionPage";
import CelebrationPage from "./CelebrationPage";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [playerName, setPlayerName] = useState("");
  const [spinType, setSpinType] = useState(""); // TRUTH or DARE
  const [currentQuestion, setCurrentQuestion] = useState(""); // Question from Spin2
  const [isSubmitting, setIsSubmitting] = useState(false); // 🆕 Loading state

  // 🔥 GANTI INI DENGAN WEB APP URL ANDA DARI GOOGLE APPS SCRIPT
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzd-3l8ymcvjOjhD87XGWe3LJDNNE1PI4PYM6LiGuMdodruGaai3-bksDQOwA_TIK0E/exec";

  // Load dari localStorage saat refresh (optional)
  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    const savedPage = localStorage.getItem("currentPage");
    const savedSpinType = localStorage.getItem("spinType");
    const savedQuestion = localStorage.getItem("currentQuestion");

    if (savedName && savedPage) {
      setPlayerName(savedName);
      setCurrentPage(savedPage);
      if (savedSpinType) setSpinType(savedSpinType);
      if (savedQuestion) setCurrentQuestion(savedQuestion);
    }
  }, []);

  // Save ke localStorage setiap kali berubah
  useEffect(() => {
    if (playerName) {
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("currentPage", currentPage);
      if (spinType) localStorage.setItem("spinType", spinType);
      if (currentQuestion)
        localStorage.setItem("currentQuestion", currentQuestion);
    }
  }, [playerName, currentPage, spinType, currentQuestion]);

  const handleStart = (name) => {
    setPlayerName(name);
    setCurrentPage("spin1");
  };

  const handleSpin1Result = (result) => {
    setSpinType(result); // TRUTH or DARE
    setCurrentPage("spin2");
  };

  const handleSpin2Next = (question) => {
    setCurrentQuestion(question);
    setCurrentPage("action");
  };

  // 🚀 FUNGSI: Kirim data ke Google Sheets (silent)
  const sendToGoogleSheets = async (data) => {
    try {
      const formData = new FormData();
      formData.append("playerName", data.playerName);
      formData.append("spinType", data.spinType);
      formData.append("currentQuestion", data.currentQuestion);
      formData.append("status", data.status);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("✅ Data tersimpan", result); // Hanya di console, user ga tau
      return true;
    } catch (error) {
      console.error("❌ Gagal menyimpan:", error);
      // Tetap return true biar user ga tahu ada error
      return true;
    }
  };

  // 🆕 DIPINDAH: Handle Complete dengan submit data
  const handleActionComplete = async () => {
    // 1️⃣ Tampilkan loading
    setIsSubmitting(true);

    // 2️⃣ Siapkan data
    const gameData = {
      playerName,
      spinType,
      currentQuestion,
      status: "COMPLETED",
    };

    // 3️⃣ Console log untuk tracking
    console.log("=== GAME DATA ===");
    console.log({
      ...gameData,
      timestamp: new Date().toISOString(),
    });
    console.log("=================");

    // 4️⃣ Kirim ke Google Sheets (silent)
    await sendToGoogleSheets(gameData);

    // 5️⃣ Delay dikit biar smooth (opsional)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 6️⃣ Set loading false dan pindah ke celebration
    setIsSubmitting(false);
    setCurrentPage("celebration");
  };

  const handleActionFail = () => {
    // Balik ke Spin1
    setSpinType("");
    setCurrentQuestion("");
    setCurrentPage("spin1");
  };

  const handleCelebrationNext = () => {
    // Langsung reset tanpa submit lagi (sudah submit di ActionPage)
    handleReset();
  };

  const handleReset = () => {
    localStorage.clear();
    setPlayerName("");
    setSpinType("");
    setCurrentQuestion("");
    setCurrentPage("welcome");
  };

  return (
    <div className="font-['Poppins']">
      {currentPage === "welcome" && <WelcomePage onStart={handleStart} />}
      {currentPage === "spin1" && (
        <Spin1Page playerName={playerName} onResult={handleSpin1Result} />
      )}
      {currentPage === "spin2" && (
        <Spin2Page
          playerName={playerName}
          spinType={spinType}
          onNext={handleSpin2Next}
        />
      )}
      {currentPage === "action" && (
        <ActionPage
          playerName={playerName}
          spinType={spinType}
          currentQuestion={currentQuestion}
          onComplete={handleActionComplete} // 🆕 Sekarang async
          onFail={handleActionFail}
          isSubmitting={isSubmitting} // 🆕 Pass loading state
        />
      )}
      {currentPage === "celebration" && (
        <CelebrationPage
          playerName={playerName}
          spinType={spinType}
          currentQuestion={currentQuestion}
          onNextToSheets={handleCelebrationNext} // Sekarang hanya reset
        />
      )}

      {/* Debug Reset Button (hapus nanti di production) */}
      {currentPage !== "welcome" && (
        <button
          onClick={handleReset}
          className="fixed top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded opacity-50 hover:opacity-100 z-50"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default App;
