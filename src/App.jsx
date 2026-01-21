import { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import Spin1Page from "./Spin1Page";
import Spin2Page from "./Spin2Page";
import ActionPage from "./ActionPage";
import CelebrationPage from "./CelebrationPage";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [playerName, setPlayerName] = useState("");
  const [spinType, setSpinType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzd-3l8ymcvjOjhD87XGWe3LJDNNE1PI4PYM6LiGuMdodruGaai3-bksDQOwA_TIK0E/exec";

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
    setSpinType(result);
    setCurrentPage("spin2");
  };

  const handleSpin2Next = (question) => {
    setCurrentQuestion(question);
    setCurrentPage("action");
  };

  const sendToGoogleSheets = async (data) => {
    try {
      const formData = new FormData();
      formData.append("playerName", data.playerName);
      formData.append("spinType", data.spinType);
      formData.append("currentQuestion", data.currentQuestion);
      formData.append("status", data.status);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      return true;
    } catch (error) {
      return true;
    }
  };

  const handleActionComplete = async () => {
    setIsSubmitting(true);

    const gameData = {
      playerName,
      spinType,
      currentQuestion,
      status: "COMPLETED",
    };

    await sendToGoogleSheets(gameData);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setCurrentPage("celebration");
  };

  const handleActionFail = () => {
    setSpinType("");
    setCurrentQuestion("");
    setCurrentPage("spin1");
  };

  const handleCelebrationNext = () => {
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
    <div className="font-quicksand">
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
          isSubmitting={isSubmitting}
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

      {currentPage !== "welcome" && (
        <button
          onClick={handleReset}
          className="fixed top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded opacity-50 hover:opacity-100 z-50 transition-opacity"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default App;
