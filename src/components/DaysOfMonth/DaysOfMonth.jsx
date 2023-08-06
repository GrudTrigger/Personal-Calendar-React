import clsx from "clsx";
import moment from "moment";

const DaysOfMonth = ({
  startDay,
  selectedMonth,
  events,
  openModalFormHandler,
  setDisplayMode,
}) => {
  const totalDay = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDay)].map((_, index) =>
    startDay
      .clone()
      .subtract(1, "day")
      .add(index + 1, "day")
      .clone(),
  );

  const isCurrentDay = (day) => {
    const today = moment();
    return day.isSame(today, "day");
  };
  const numberDay = selectedMonth.month();
  return (
    <DaysOfMonthGrid>
      {daysArray.map((dayItem, index) => {
        const isToday = dayItem.isSame(moment(), "day");
        const eventsForDay = events.filter(
          (event) =>
            event.date >= dayItem.format("X") &&
            event.date <= dayItem.clone().endOf("day").format("X"),
        );

        return (
          <DaysCell
            key={index}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
          >
            <Day
              today={isToday}
              dayItem={dayItem}
              isCurrentDay={isCurrentDay}
              numberDay={numberDay}
              openModalFormHandler={openModalFormHandler}
            />
            <Events
              eventsForDay={eventsForDay}
              openModalFormHandler={openModalFormHandler}
              dayItem={dayItem}
              setDisplayMode={setDisplayMode}
            />
          </DaysCell>
        );
      })}
    </DaysOfMonthGrid>
  );
};

export default DaysOfMonth;

const DaysOfMonthGrid = ({ children }) => {
  return <div className="grid grid-cols-7 grid-rows-6 gap-1">{children}</div>;
};

const DaysCell = ({ children, isWeekend }) => {
  const classCell = clsx(
    "w-31 h-32 border rounded-xl border-gray-200 pr-3 pl-1 pt-2 flex flex-col",
    isWeekend ? "bg-gray-300" : "bg-white",
  );
  return <div className={classCell}>{children}</div>;
};

const Day = ({ dayItem, isCurrentDay, numberDay, openModalFormHandler }) => {
  const isToday = isCurrentDay(dayItem);
  const classDay = clsx(
    "w-7 h-7 font-title font-bold cursor-pointer",
    numberDay === dayItem.month() ? "opacity-100" : "opacity-30",
  );
  return (
    <div className="flex justify-end ">
      {isToday ? (
        <div
          onClick={() => openModalFormHandler("Create", null, dayItem)}
          className="w-7 h-7 font-title font-bold flex items-center justify-center bg-red-500 border rounded-full cursor-pointer"
        >
          {dayItem.format("D")}
        </div>
      ) : (
        <div
          onClick={() => openModalFormHandler("Create", null, dayItem)}
          className={classDay}
        >
          {dayItem.format("D")}
        </div>
      )}
    </div>
  );
};

const Events = ({
  eventsForDay,
  openModalFormHandler,
  dayItem,
  setDisplayMode,
}) => {
  const showMoreButton = eventsForDay.length > 2;
  return (
    <ul className="m-0 list-inside p-1">
      {eventsForDay
        .slice(0, showMoreButton ? 2 : eventsForDay.length)
        .map((event, index) => (
          <button
            key={index}
            onClick={() => openModalFormHandler("Update", event)}
            className="relative -left-1 text-ellipsis overflow-hidden whitespace-nowrap w-28 border-0 text-green-400 cursor-pointer m-0 p-0 text-left mb-1"
          >
            <li key={event.id} className="bg-sky-700 text-white rounded pl-1">
              {event.title}
            </li>
          </button>
        ))}
      {showMoreButton ? (
        <button
          onClick={() => setDisplayMode("day")}
          key={dayItem.format("X")}
          className="relative -left-1 text-ellipsis overflow-hidden whitespace-nowrap w-28 border-0 text-green-400 cursor-pointer m-0 p-0 text-left mb-1"
        >
          <li className="bg-sky-700 text-white rounded pl-1">Show more...</li>
        </button>
      ) : null}
    </ul>
  );
};
