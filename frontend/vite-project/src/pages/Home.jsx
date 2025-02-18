import "animate.css";
import { FaDonate } from "react-icons/fa";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://example.com/blood-donation-image.jpg')", // Use your image URL here
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 p-6 text-white text-center">
        <h1 className="text-4xl font-extrabold text-shadow-lg animate__animated animate__fadeIn">
          Welcome to the Blood Donation App
        </h1>
        <p className="text-xl mt-4 animate__animated animate__fadeIn animate__delay-1s">
          Find donors or donate blood to save lives.
        </p>

        <div className="mt-6">
          <FaDonate className="mx-auto text-6xl text-red-600 animate__animated animate__bounceIn animate__delay-2s" />
        </div>

        <div className="mt-8">
         
        </div>
      </div>
    </div>
  );
};

export default Home;
