import { useState } from "react";

const DayOfTheWeek = () => {
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  return (
    <div className="grid grid-cols-7 gap-3 mt-6 ml-2 text-center">
      {days.map((day, index) => (
        <div
          className={`font-text font-normal text-${
            index >= days.length - 2 ? "black" : "grey"
          }-200 text-4`}
          key={index}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DayOfTheWeek;
// flex gap-12 mt-6 ml-12
