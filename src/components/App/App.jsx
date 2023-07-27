import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";
import FormEvent from "../FormEvent/FormEvent";
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

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    console.log("click", methodName);
    setIsOpenModal(true);
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format("X") });
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

  const eventDelete = (id) => {
    const deleteUrl = `${url}/events/${id}`;

    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const updateEvents = events.filter((eventEl) => eventEl.id !== id);
    setEvents(updateEvents);
    cancelButtonHandler();
  };
  return (
    <div className="pt-6 pb-[15px]">
      {isOpenModal ? (
        <FormEvent
          cancelButtonHandler={cancelButtonHandler}
          changeEventHandler={changeEventHandler}
          event={event}
          eventFetchHandler={eventFetchHandler}
          method={method}
          eventDelete={eventDelete}
        />
      ) : null}
      <div className="w-[1200px] h-[930px] rounded-2xl bg-white border my-0 mx-auto pl-7 pr-7">
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
    </div>
  );
};

export default App;
