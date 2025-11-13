import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-20">
        <h1 className="text-black font-black text-3xl sm:text-5xl text-center ">
          Track Smarter with <span className="text-amber-800">ExpenseFlow</span>
        </h1>

        <p className="text-black text-base sm:text-lg md:text-xl text-center font-medium max-w-2xl mt-4">
          A smart and simple expense tracker for transport owners and
          individuals — track every trip, every rupee, effortlessly with{" "}
          <span className=" underline decoration-amber-800 decoration-2 underline-offset-4 font-bold">
            ExpenseFlow
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-6">
          <Link
            to="/login"
            className="font-black text-[15px] md:text-1xl uppercase text-black rounded-2xl bg-yellow-400 px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform  hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all cursor-pointer  select-none"
          >
            Get Started - It's Free
          </Link>

          <button className="font-black text-[15px] md:text-1xl uppercase text-black rounded-2xl bg-yellow-400 px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform  hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all cursor-pointer select-none">
            Get Preview
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
