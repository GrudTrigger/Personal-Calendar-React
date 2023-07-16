import moment from "moment";

const DaysOfMonth = () => {
  const totalDays = 42;
  const daysArray = [...Array(42)];

  moment.updateLocale("en", { week: { dow: 1 } });
  const startDay = moment().startOf("month").startOf("week");
  const endDay = moment().endOf("month").endOf("week");

  const calendar = [];

  let day = startDay.clone();
  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }
  console.log(daysArray);
  return (
    <div className="grid grid-cols-7 grid-rows-6 gap-1">
      {daysArray.map((_, index) => {
        return (
          <div
            className="w-31 h-32 bg-white border rounded-xl border-gray-200 flex justify-end pr-3 pt-2"
            key={index}
          >
            <div className=" font-title font-bold">{index}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfMonth;
