import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";
import { useState } from "react";
import moment from "moment";

const App = () => {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [selectedMonth, setSelectedMonth] = useState(moment());
  const startDay = selectedMonth.clone().startOf("month").startOf("week");

  const prevHandler = () => {
    setSelectedMonth((prevMonth) => prevMonth.clone().subtract(1, "month"));
  };

  const todayHandler = () => {
    setSelectedMonth(moment());
  };

  const nextHandler = () => {
    setSelectedMonth((prevMonth) => prevMonth.clone().add(1, "month"));
  };

  return (
    <div className="w-[1200px] h-[932px] rounded-2xl bg-white border my-0 mx-auto pl-7 pr-7 mt-6">
      <header>
        <Header
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          today={selectedMonth}
        />
      </header>
      <main>
        <DayOfTheWeek />
        <DaysOfMonth startDay={startDay} />
      </main>
    </div>
  );
};

export default App;
