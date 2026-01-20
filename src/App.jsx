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

  const handleActionComplete = () => {
    setCurrentPage("celebration");
  };

  const handleActionFail = () => {
    // Balik ke Spin1
    setSpinType("");
    setCurrentQuestion("");
    setCurrentPage("spin1");
  };

  const handleCelebrationNext = () => {
    // Console log sudah ada di CelebrationPage
    // Reset ke awal (welcome page)
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
          onComplete={handleActionComplete}
          onFail={handleActionFail}
        />
      )}
      {currentPage === "celebration" && (
        <CelebrationPage
          playerName={playerName}
          spinType={spinType}
          currentQuestion={currentQuestion}
          onNextToSheets={handleCelebrationNext}
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
