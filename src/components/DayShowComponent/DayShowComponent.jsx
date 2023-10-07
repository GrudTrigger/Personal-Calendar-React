import FormEvent from "../FormEvent/FormEvent";
import moment from "moment";
import {useEffect, useState} from "react";

const DayShowComponent = ({
  events,
  today,
  event,
  cancelButtonHandler,
  changeEventHandler,
  eventFetchHandler,
  method,
  eventDelete,
  openFormHandler,
}) => {
  const eventsForDay = events.filter(
    (event) =>
      event.date >= today.startOf("day").format("X") &&
      event.date <= today.endOf("day").format("X"),
  );

  const hoursOfDay = 24;
  const cells = [...new Array(hoursOfDay)].map((_, i) => {
    const temp = [];
    eventsForDay.forEach((event) => {
      if (+moment.unix(+event.date).format("H") === i) {
        temp.push(event);
      }
    });
    return temp;
  });

  const getRedLinePosition = () => ((moment().format('X') - today.format('X')) / 86400) * 100
  const isDayContaintCurrentTimestamp = (x, b) => {
    return  x >= b.startOf('day').format('X') && x <= b.clone().endOf('day').format('X');
  }

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timerId = setInterval(()=> {
      setCounter(prevState => prevState + 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, []);

  return (
    <div className="flex justify-between pt-4">
      <div className=" w-[665px] h-full flex flex-col pl-1 pr-1 relative">
        {
          isDayContaintCurrentTimestamp(moment().format('X'), today) ? (
              <div className="bg-red-600 h-[1px] absolute left-0 right-0" style={{top: `${getRedLinePosition()}%`}}></div>
          ) : null
        }
        {cells.map((eventsList, i) => (
          <div key={i} className=" flex-grow relative border-t ml-8">
            <div className=" absolute -left-7 -top-[10px] text-xs">
              {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
            </div>
            <div className=" h-8 min-h-full pt-1">
              {eventsList.map((event, index) => {
                return (
                  <span
                    className="ml-2 px-1 bg-sky-700 text-white rounded cursor-pointer"
                    onClick={() => openFormHandler("Update", event)}
                    key={index}
                  >
                    {event.title}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="w-5/12 h-[840px] bg-gray-200 rounded relative mt-1">
        {event ? (
          <div>
            <FormEvent
              cancelButtonHandler={cancelButtonHandler}
              changeEventHandler={changeEventHandler}
              event={event}
              eventFetchHandler={eventFetchHandler}
              method={method}
              eventDelete={eventDelete}
            />
          </div>
        ) : (
          <>
            <div>
              <button
                onClick={() => openFormHandler("Create", null, today)}
                className=" w-36 absolute bg-blue-400 left-2 top-2 rounded hover:bg-blue-500"
              >
                Create new event
              </button>
            </div>
            <div className=" absolute left-[38%] top-2/4 opacity-50">
              No event selected
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DayShowComponent;
