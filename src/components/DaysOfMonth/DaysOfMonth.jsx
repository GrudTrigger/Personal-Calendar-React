import clsx from "clsx";
import moment from "moment";

const DaysOfMonth = ({ startDay, selectedMonth, events, openFormHandler }) => {
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
              openFormHandler={openFormHandler}
            ></Day>
            <ul className="m-0 list-inside p-1">
              {events
                .filter(
                  (event) =>
                    event.date >= dayItem.format("X") &&
                    event.date <= dayItem.clone().endOf("day").format("X"),
                )
                .map((event, index) => (
                  <button
                    key={index}
                    onClick={() => openFormHandler("Update", event)}
                    className=" relative -left-1 text-ellipsis overflow-hidden whitespace-nowrap w-28 border-0 text-green-400 cursor-pointer m-0 p-0 text-left"
                  >
                    <li key={event.id} className="">
                      {event.title}
                    </li>
                  </button>
                ))}
            </ul>
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

const Day = ({ dayItem, isCurrentDay, numberDay, openFormHandler }) => {
  const isToday = isCurrentDay(dayItem);
  const classDay = clsx(
    "w-7 h-7 font-title font-bold",
    numberDay === dayItem.month() ? "opacity-100" : "opacity-30",
  );
  return (
    <div
      onClick={() => openFormHandler("Create")}
      className="flex justify-end cursor-pointer"
    >
      {isToday ? (
        <div className="w-7 h-7 font-title font-bold flex items-center justify-center bg-red-500 border rounded-full">
          {dayItem.format("D")}
        </div>
      ) : (
        <div className={classDay}>{dayItem.format("D")}</div>
      )}
    </div>
  );
};
