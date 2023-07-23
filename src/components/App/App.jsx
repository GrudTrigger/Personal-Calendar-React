import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";
import { useEffect, useState } from "react";
import moment from "moment";

const url = "http://localhost:5000";

const App = () => {
  moment.updateLocale("en", { week: { dow: 1 } });
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const startDay = selectedMonth.clone().startOf("month").startOf("week");
  const startDayQuery = startDay.clone().format("X");
  const endDayQuery = startDay.clone().add(42, "days").format("X");

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => setEvents(res));
  }, [selectedMonth]);

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
        <DaysOfMonth
          startDay={startDay}
          selectedMonth={selectedMonth}
          events={events}
        />
      </main>
    </div>
  );
};

export default App;
