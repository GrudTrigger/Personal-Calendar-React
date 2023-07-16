import clsx from "clsx";
import useDaysArray from "./useDaysArray";
import AddIcon from "../icons/AddIcon";
import { useState } from "react";

const DaysOfMonth = () => {
  const { daysArray, setDays } = useDaysArray();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <DaysOfMonthGrid>
      {daysArray.map((dayItem, index) => {
        return (
          <DaysCell
            key={index}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            onMouseEnter={() => {
              handleMouseEnter();
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
            {isHovered && <AddIcon className={"mr-8 cursor-pointer"} />}
            <Day dayItem={dayItem}></Day>
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

const DaysCell = ({ children, isWeekend, onMouseEnter, onMouseLeave }) => {
  const classCell = clsx(
    "w-31 h-32 bg-white border rounded-xl border-gray-200 flex justify-end pr-3 pt-2",
    { "bg-gray-200": isWeekend, "bg-white": !isWeekend },
  );
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classCell}
    >
      {children}
    </div>
  );
};

const Day = ({ dayItem }) => {
  return (
    <div className=" w-6 h-6 font-title font-bold flex justify-end">
      {dayItem.format("D")}
    </div>
  );
};
