import CatBW from "./assets/icons/cat-bw.png";
import MonkeyBW from "./assets/icons/monkey-bw.png";

function Header({ title }) {
  return (
    <div className="w-full mt-2 sm:mt-5 md:mt-6 relative">
      <div className="bg-gradient-to-br from-white via-pink-50 to-white rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden py-4 sm:py-5 md:py-6">
        {/* Decorative Corner Cats */}
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 opacity-10">
          <img
            src={CatBW}
            alt=""
            className="w-full h-full object-contain transform rotate-6"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 opacity-10">
          <img
            src={CatBW}
            alt=""
            className="w-full h-full object-contain transform -rotate-6"
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 py-3 sm:py-4 md:py-5 px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {/* Cat Icon - Kiri */}
            <img
              src={CatBW}
              alt="Cat"
              className="w-16 h-16 sm:w-18 md:w-24 object-contain drop-shadow-lg"
            />

            {/* Text dan Bunga SVG */}
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold leading-tight">
                {title}
              </h2>
              
              {/* Tiga Bunga SVG Kecil */}
                <div className="flex justify-center gap-1 mt-1">
                  <span className="text-pink-400 text-lg">✿</span>
                  <span className="text-purple-400 text-lg">❀</span>
                  <span className="text-pink-400 text-lg">✿</span>
                </div>
                </div>
            {/* Monkey Icon - Kanan */}
            <img
              src={MonkeyBW}
              alt="Monkey"
              className="w-18 h-16 sm:w-18 md:w-24 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
      </div>
    </div>
  );
}

export default Header;