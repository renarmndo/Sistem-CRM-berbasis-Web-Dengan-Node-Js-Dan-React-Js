import { Player } from "@lottiefiles/react-lottie-player"; // Lottie React Library
import animationData from "../animation/Animation - 1732947393117.json"; // Animasi JSON

const DashboardFirst = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        {/* Heading */}
        <h1 className="text-4xl font-semibold font-second text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 bg-clip-text">
          SISTEM CUSTOMERS RELATIONSHIP MANAGEMENT
        </h1>

        {/* Animation */}
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "400px", width: "400px" }}
        />

        {/* Subtitle */}
        <div className="flex justify-center">
          <h1>
            by{" "}
            <span className="font-second font-semibold text-blue-500">
              Nebula<span className="font-second text-yellow-500">CRM</span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardFirst;
