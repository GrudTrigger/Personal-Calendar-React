import clsx from "clsx";
import useDaysArray from "./useDaysArray";
import AddIcon from "../icons/AddIcon";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const DaysOfMonth = () => {
  const { daysArray, setDays } = useDaysArray();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const today = new Date().getDate();
  const [today, setToday] = useState(new Date().getDate());
  const [isToday, setIsToday] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setToday(new Date().getDate());
        setIsToday((s) => !s);
      },
      24 * 60 * 60 * 1000,
    );

    return () => {
      clearInterval(interval); // функция очистки useEffect
    };
  }, [isToday]);

  return (
    <DaysOfMonthGrid>
      {daysArray.map((dayItem, index) => {
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
            <Day today={today} dayItem={dayItem}></Day>
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
    isWeekend ? "bg-gray-200" : "bg-white",
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

const Day = ({ dayItem, today }) => {
  return (
    <div
      className={
        String(today) === dayItem.format("D")
          ? "w-7 h-7 font-title font-bold flex justify-end bg-red-500 border rounded-full"
          : "w-7 h-7 font-title font-bold flex justify-end"
      }
    >
      <div className="mx-auto">{dayItem.format("D")}</div>
    </div>
  );
};
