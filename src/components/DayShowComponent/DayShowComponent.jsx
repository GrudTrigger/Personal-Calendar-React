import FormEvent from "../FormEvent/FormEvent";
import moment from "moment";

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

  console.log(cells);
  return (
    <div className="flex justify-between pt-4">
      {/* <ul className=" w-7/12">
        {eventsForDay.map((eventEl) => (
          <li
            onClick={() => openFormHandler("Update", eventEl)}
            key={eventEl.id}
            className="bg-sky-700 text-white rounded mt-1 cursor-pointer"
          >
            {eventEl.title}
          </li>
        ))}
      </ul> */}
      <div className=" w-[665px] h-full flex flex-col pl-1 pr-1">
        {cells.map((eventsList, i) => (
          <div key={i} className=" flex-grow relative border-t ml-8">
            <div className=" absolute -left-7 -top-[10px] text-xs">
              {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
            </div>
            <div className=" h-8 min-h-full">
              {eventsList.map((event, index) => {
                return (
                  <span
                    className="ml-1 pl-1 pr-1 bg-sky-700 text-white rounded cursor-pointer"
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
