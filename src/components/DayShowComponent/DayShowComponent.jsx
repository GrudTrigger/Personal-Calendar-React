const DayShowComponent = ({ events, today, event, setEvent }) => {
  const eventsForDay = events.filter(
    (event) =>
      event.date >= today.startOf("day").format("X") &&
      event.date <= today.endOf("day").format("X"),
  );

  console.log(eventsForDay);
  return (
    <div className="flex justify-between">
      <ul className=" w-7/12">
        {eventsForDay.map((eventEl) => (
          <li
            onClick={() => setEvent(eventEl)}
            key={event.id}
            className="bg-sky-700 text-white rounded mt-1 cursor-pointer"
          >
            {event.title}
          </li>
        ))}
      </ul>
      <div className="w-5/12 h-[840px] bg-gray-200 rounded relative">
        {event ? (
          <div>
            <h3>{event.title}</h3>
          </div>
        ) : (
          <div className=" absolute left-[38%] top-2/4 opacity-50">
            No event selected
          </div>
        )}
      </div>
    </div>
  );
};

export default DayShowComponent;
