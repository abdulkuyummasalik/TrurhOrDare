import FlowerPink from "./assets/icons/flower-pink.webp";
import FlowerOranye from "./assets/icons/flower-oranye.png";
import FlowerBW from "./assets/icons/flower-bw.png";

function BottomIcons() {
  return (
    <>
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 animate-pulse-smooth">
        <img
          src={FlowerPink}
          alt="Decoration"
          className="w-10 h-10 sm:w-12 md:w-14 object-contain opacity-60"
        />
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <img
          src={FlowerBW}
          alt="Decoration"
          className="w-8 h-8 sm:w-10 md:w-12 object-contain opacity-50"
        />
      </div>

      <div
        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 animate-pulse-smooth"
        style={{ animationDelay: "0.5s" }}
      >
        <img
          src={FlowerOranye}
          alt="Decoration"
          className="w-10 h-10 sm:w-12 md:w-14 object-contain opacity-60"
        />
      </div>
    </>
  );
}

export default BottomIcons;
