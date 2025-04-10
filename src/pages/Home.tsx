import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center text-white px-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          AnswersAi
        </h1>

        <div className="flex justify-center">
          <Link to="/dashboard">
            <button
              className="relative px-[20px] py-2 rounded-[8px] flex items-center text-[#C9FF3B] overflow-hidden"
              style={{
                border: "2px solid #577113",
                background: "linear-gradient(to bottom, #C8E972, #23291E)",
                outline: "1px solid #23291E",
                outlineOffset: "-1px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "1px",
                  bottom: "1px",
                  left: "1px",
                  right: "1px",
                  borderRadius: "6px",
                  background: "#23291E",
                  outline: "1px solid #23291E",
                  outlineOffset: "-1px",
                  zIndex: 0,
                }}
              />
              <span className="relative z-10 font-semibold">Go to Dashboard</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
