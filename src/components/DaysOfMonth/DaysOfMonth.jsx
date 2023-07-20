import clsx from "clsx";
import moment from "moment";
import AddIcon from "../icons/AddIcon";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const DaysOfMonth = ({ startDay }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const today = new Date().getDate();
  const [isOpenModal, setIsOpenModal] = useState(false);

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
    const today = moment(); // Получаем текущую дату с помощью moment.js
    return day.isSame(today, "day"); // Сравниваем day с сегодняшней датой
  };

  return (
    <DaysOfMonthGrid>
      {daysArray.map((dayItem, index) => {
        const isToday = dayItem.isSame(moment(), "day");

        return (
          <DaysCell
            key={index}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <AddIcon
                setIsOpenModal={setIsOpenModal}
                onClick={() => setIsOpenModal(true)}
                className="mr-8 cursor-pointer"
              />
            )}
            <Day
              today={isToday} // Передаем текущую дату
              dayItem={dayItem}
              isCurrentDay={isCurrentDay}
            ></Day>
          </DaysCell>
        );
      })}
      <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className=" fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white border rounded-2xl p-7">
            <Dialog.Title className="font-text text-xl text-center mb-4">
              Add event
            </Dialog.Title>
            <input
              className=" w-[350px] border-b border-black focus:border-black focus:outline-none"
              type="text"
              placeholder="Title"
            />
            <div className="flex justify-between items-center mt-4 gap-3">
              <button
                className=" w-40 h-12 border-2 rounded-2xl border-green-400 text-black font-title font-normal hover:bg-green-300"
                onClick={() => setIsOpenModal(false)}
              >
                Save
              </button>
              <button
                className=" w-40 h-12 border-2 rounded-2xl border-grey-200 hover:bg-gray-300"
                onClick={() => setIsOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </DaysOfMonthGrid>
  );
};

export default DaysOfMonth;

const DaysOfMonthGrid = ({ children }) => {
  return <div className="grid grid-cols-7 grid-rows-6 gap-1">{children}</div>;
};

const DaysCell = ({ children, isWeekend, onMouseEnter, onMouseLeave }) => {
  const classCell = clsx(
    "w-31 h-32 border rounded-xl border-gray-200 flex justify-end pr-3 pt-2",
    isWeekend ? "bg-gray-300" : "bg-white",
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

const Day = ({ dayItem, isCurrentDay }) => {
  const isToday = isCurrentDay(dayItem);

  return (
    <div>
      <div className="mx-auto">
        {isToday ? (
          <div className="w-7 h-7 font-title font-bold flex items-center justify-center bg-red-500 border rounded-full">
            {dayItem.format("D")}
          </div>
        ) : (
          <div className="w-7 h-7 font-title font-bold flex justify-center items-center">
            {dayItem.format("D")}
          </div>
        )}
      </div>
    </div>
  );
};
