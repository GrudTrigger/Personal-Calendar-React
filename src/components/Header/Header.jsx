import PencilIcon from "./PencilIcon";
import moment from "moment";

const Header = ({ prevHandler, todayHandler, nextHandler, today }) => {
  return (
    <div className="flex justify-between items-center pt-3">
      <div className="flex items-center gap-6">
        <div className=" font-title font-bold text-gray-500 text-5xl leading-tight">
          {today.format("YYYY")}
        </div>
        <div className=" font-title font-bold text-5xl leading-tight ">
          {today.format("MMMM")}
        </div>
      </div>
      <div className=" w-28 flex justify-between">
        <button className=" w-5 border border-gray-200" onClick={prevHandler}>
          &lt;
        </button>
        <button className=" w-14 border border-gray-200" onClick={todayHandler}>
          Todat
        </button>
        <button className=" w-5 border border-gray-200" onClick={nextHandler}>
          &gt;
        </button>
      </div>
      <div className="flex items-center">
        <h1 className=" font-text text-black text-4xl font-normal">
          Personal Calendar
        </h1>
        <button className="w-8 h-8">
          <PencilIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
