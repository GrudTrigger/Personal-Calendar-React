import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";
import { useState } from "react";
import moment from "moment";

const App = () => {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  // const startDay = moment().startOf("month").startOf("week");
  const [startDay, setStartDay] = useState(
    moment().startOf("month").startOf("week"),
  );
  // const today = moment();
  console.log(startDay);
  const prevHandler = () => {
    setStartDay((prevStartDay) =>
      prevStartDay
        .clone()
        .subtract(1, "month")
        .startOf("month")
        .startOf("week"),
    );
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    // setToday((prev) => prev.clone().add(1, "month"));
  };

  return (
    <div className="w-[900px] h-[932px] rounded-2xl bg-white border my-0 mx-auto pl-7 pr-7 mt-6">
      <header>
        <Header
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
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
