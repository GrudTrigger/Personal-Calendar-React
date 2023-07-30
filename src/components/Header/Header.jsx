const Header = ({
  prevHandler,
  todayHandler,
  nextHandler,
  today,
  setDisplayMode,
  displayMode,
}) => {
  return (
    <>
      <div className="flex justify-between items-center pt-3">
        <div className="flex items-center gap-6">
          {displayMode === "day" ? (
            <div className="font-title font-bold text-gray-500 text-4xl leading-tight">
              {today.format("DD")}
            </div>
          ) : (
            <div className="font-title font-bold text-gray-500 text-4xl leading-tight">
              {today.format("YYYY")}
            </div>
          )}
          <div className="w-[200px] font-title font-bold text-4xl leading-tight">
            {today.format("MMMM")}
          </div>
        </div>

        <div className="flex items-center">
          <h1 className="font-text text-black text-4xl font-normal mr-8">
            Personal Calendar
          </h1>
        </div>
        <div className="w-28 flex justify-between items-center">
          <button
            className="w-5 h-5 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center pb-0.5"
            onClick={prevHandler}
          >
            <span className="text-gray-600">&lt;</span>
          </button>
          <button
            className="w-14 h-8 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center"
            onClick={todayHandler}
          >
            <span className="text-gray-600">Today</span>
          </button>
          <button
            className="w-5 h-5 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center pb-0.5"
            onClick={nextHandler}
          >
            <span className="text-gray-600">&gt;</span>
          </button>
        </div>
      </div>
      <div className=" w-80 mx-auto my-0 flex justify-center">
        <button
          className="w-14 h-8 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center"
          onClick={() => setDisplayMode("month")}
          // unPressed={displayMode === "month"}
        >
          <span className="text-gray-600">Month</span>
        </button>
        <button
          className="w-14 h-8 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center"
          onClick={() => setDisplayMode("day")}
          // unPressed={displayMode === "day"}
        >
          <span className="text-gray-600">Day</span>
        </button>
      </div>
    </>
  );
};

export default Header;
