import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";
import { useEffect, useState } from "react";
import moment from "moment";

const url = "http://localhost:5000";
const defaultEvent = {
  title: "",
  descr: "",
  date: Number(moment().format("X")),
};
const App = () => {
  moment.updateLocale("en", { week: { dow: 1 } });
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [event, setEvent] = useState(null);
  const [method, setMethod] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
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

  const openFormHandler = (methodName, eventForUpdate) => {
    console.log("click", methodName);
    setIsOpenModal(true);
    setEvent(eventForUpdate || defaultEvent);
    setMethod(methodName);
  };

  const cancelButtonHandler = () => {
    setIsOpenModal(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  const eventFetchHandler = () => {
    const fetchUrl =
      method === "Update" ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === "Update" ? "PATCH" : "POST";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        if (method === "Update") {
          setEvents((prev) =>
            prev.map((eventEl) => (eventEl.id === res.id ? res : eventEl)),
          );
        } else {
          setEvents((prev) => [...prev, res]);
        }
        cancelButtonHandler();
      });
  };

  console.log(events);
  console.log(moment().format("X"));
  return (
    <>
      {isOpenModal ? (
        <div
          onClick={cancelButtonHandler}
          className="absolute z-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 bg-white text-black rounded-lg shadow-md p-4"
          >
            <input
              onChange={(e) => {
                changeEventHandler(e.target.value, "title");
              }}
              value={event.title}
              type="text"
              className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none"
              placeholder="Имя"
            />
            <input
              onChange={(e) => {
                changeEventHandler(e.target.value, "descr");
              }}
              value={event.descr}
              type="text"
              className="w-full mt-3 px-3 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none"
              placeholder="Email"
            />
            <div className="py-2 px-4 flex justify-between">
              <button
                onClick={cancelButtonHandler}
                className="mt-4 w-35 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={eventFetchHandler}
                className="mt-4 w-35 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                {method}
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
            openFormHandler={openFormHandler}
          />
        </main>
      </div>
    </>
  );
};

export default App;
