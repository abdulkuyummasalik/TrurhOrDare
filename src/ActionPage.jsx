import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import BottomIcons from "./BottomIcons";
import CatRun from "./assets/gifs/cat-run.gif";
import CatStop from "./assets/gifs/cat-stop.png";

function ActionPage({
  playerName,
  spinType,
  currentQuestion,
  onSubmit,
  onRetry,
  onBackToHome,
  isSubmitting,
}) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [answer, setAnswer] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showFailModal, setShowFailModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting && !showFailModal) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Auto submit when time is up
    if (timeLeft === 0 && !isSubmitting && !showFailModal) {
      handleTimeUp();
    }
  }, [timeLeft, isSubmitting, showFailModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTimeUp = async () => {
    // Cek apakah ada input (jawaban atau gambar)
    const hasAnswer = answer.trim() !== "";
    const hasImage = imageFile !== null;

    if (!hasAnswer && !hasImage) {
      // Jika tidak ada input, kirim INCOMPLETE dan tampilkan modal
      await submitData("INCOMPLETE", "", "");
      setShowFailModal(true);
    } else {
      // Jika ada input, submit normal
      handleSubmit();
    }
  };

  const submitData = async (status, answerText, imageBase64) => {
    if (onSubmit) {
      await onSubmit({
        answer: answerText,
        imageBase64: imageBase64,
        status: status,
      });
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Convert image to Base64 if exists
    let imageBase64 = "";
    if (imageFile) {
      const reader = new FileReader();
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageFile);
      });
    }

    // Determine status
    const status =
      answer.trim() !== "" || imageBase64 !== "" ? "COMPLETED" : "INCOMPLETE";

    // Send data
    await submitData(status, answer.trim(), imageBase64);

    // Jika INCOMPLETE, tampilkan modal
    if (status === "INCOMPLETE") {
      setShowFailModal(true);
    }
  };

  const handleRetry = () => {
    setShowFailModal(false);
    if (onRetry) onRetry();
  };

  const handleBackToHome = () => {
    setShowFailModal(false);
    if (onBackToHome) onBackToHome();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft >= 16) return "text-green-400";
    if (timeLeft >= 6) return "text-yellow-400";
    return "text-red-400 animate-pulse";
  };

  return (
    <div className="min-h-screen bg-[#FF1493] flex flex-col px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
      {/* Header - Fixed positioning */}
      <div className="sticky top-0 z-10 bg-[#FF1493] pb-2">
        <Header title="Segera selesaikan!" />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col items-center py-4 sm:py-6 space-y-4 overflow-y-auto">
        {/* Timer Section */}
        <div className="w-full max-w-md text-center">
          <div
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${getTimerColor()} smooth-transition drop-shadow-lg`}
          >
            {formatTime(timeLeft)}
          </div>
          <p className="text-white text-xs sm:text-sm mt-1 opacity-80">
            {timeLeft > 0 ? "Waktu tersisa" : "Waktu habis!"}
          </p>
        </div>

        {/* Cat Animation */}
        <div className="w-full max-w-md flex justify-center">
          <img
            src={timeLeft > 0 ? CatRun : CatStop}
            alt="Cat Action"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain drop-shadow-xl"
          />
        </div>

        {/* Question Display */}
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-white/30 shadow-xl">
            <p className="text-white text-center font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
              <span className="text-yellow-300 text-xl sm:text-2xl">"</span>
              {currentQuestion}
              <span className="text-yellow-300 text-xl sm:text-2xl">"</span>
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-md space-y-3 px-2">
          {/* Answer Textarea */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2 drop-shadow">
              📝 Jawaban (opsional)
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Tulis jawaban kamu di sini..."
              disabled={isSubmitting}
              className="w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-3 border-white/50 bg-white/95 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 focus:outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base transition-all shadow-lg"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-white text-sm font-semibold mb-2 drop-shadow">
              📸 Dokumentasi (opsional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="hidden"
              id="image-upload"
            />

            {!imagePreview ? (
              <label
                htmlFor="image-upload"
                className={`w-full flex flex-col items-center justify-center gap-2 py-6 sm:py-8 px-4 border-3 border-dashed border-white/60 bg-white/10 backdrop-blur-sm rounded-xl cursor-pointer hover:bg-white/20 hover:border-white transition-all shadow-lg ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white font-semibold text-xs sm:text-sm text-center drop-shadow">
                  Tap untuk upload foto
                </span>
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-3 border-white/50">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 disabled:opacity-50 shadow-lg transition-all hover:scale-110 active:scale-95"
                  aria-label="Hapus gambar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center font-semibold drop-shadow">
                    ✓ Foto siap di-upload
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full text-base sm:text-lg md:text-xl font-bold py-3 sm:py-4 px-6 border-4 border-white rounded-2xl shadow-2xl smooth-transition ${
              isSubmitting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-white text-pink-600 hover:bg-pink-50 hover:scale-105 active:scale-95 hover:shadow-3xl"
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
                <span>Mengirim...</span>
              </span>
            ) : (
              <span className="drop-shadow">SUBMIT / SKIP ⚡</span>
            )}
          </button>

          {isSubmitting && (
            <p className="text-white text-xs sm:text-sm text-center animate-pulse drop-shadow">
              ⏳ Menyimpan data dan upload gambar...
            </p>
          )}
        </div>
      </div>

      {/* Bottom Icons - Fixed positioning */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FF1493] to-transparent pt-4 pb-2">
        <BottomIcons />
      </div>

      {/* Fail Modal */}
      {showFailModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-scaleIn border-4 border-pink-300">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 sm:h-16 sm:w-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
              Waktu Habis! ⏰
            </h3>

            {/* Message */}
            <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
              Kamu tidak mengisi jawaban atau upload dokumentasi. Tantangan
              gagal diselesaikan!
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
              >
                🔄 Coba Lagi
              </button>
              <button
                onClick={handleBackToHome}
                className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
              >
                🏠 Kembali ke Awal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionPage;
