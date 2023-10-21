import moment from "moment";
import { useState } from "react";

const FormEvent = ({
  cancelButtonHandler,
  changeEventHandler,
  event,
  eventFetchHandler,
  method,
  eventDelete,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const setTimeForEvent = (i) => {
    setShowTimePicker(false);
    const time = moment.unix(+event.date).hour(i).minute(0).format("X");
    changeEventHandler(time, "date");
  };
  const setDurationForEvent = (i) => {
    // const a = moment.unix(+event.date).hour();
    // console.log("duration", i);
    setShowDurationPicker(false);
    changeEventHandler(i, "duration");
  };
  //https://timeconverter.online/1697846400
  return (
    <div
      onClick={cancelButtonHandler}
      className="absolute z-50 top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 bg-white text-black rounded-lg shadow-md p-4"
      >
        <input
          onChange={(e) => {
            changeEventHandler(e.target.value, "title");
          }}
          value={event.title}
          type="text"
          className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none"
          placeholder="Title"
        />
        <div className=" px-3 py-2 border-b flex">
          <button>{moment.unix(event.date).format("dddd, D MMMM")}</button>

          <button
            className="ml-2"
            onClick={() => setShowTimePicker((prevState) => !prevState)}
          >
            {moment.unix(+event.date).format("HH:mm")}
          </button>

          {showTimePicker ? (
            <div className=" relative">
              <ul className="m-0 p-0 h-16 overflow-scroll absolute bg-black text-white -right- top-5 rounded-md shadow-md">
                {[...new Array(24)].map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setTimeForEvent(i)}
                      className="block px-3 py-2 text-left w-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    >
                      {`${i}`.padStart(2, "0")}:00
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className=" px-3 py-2 border-b flex">
          <button
            className="ml-2"
            onClick={() => setShowDurationPicker((prevState) => !prevState)}
          >
            {`${event.duration}`.padStart(2, "0")}:00
          </button>

          {showDurationPicker ? (
            <div className=" relative">
              <ul className="m-0 p-0 h-16 overflow-scroll absolute bg-black text-white -right- top-5 rounded-md shadow-md">
                {[...new Array(24)].map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setDurationForEvent(i + 1)}
                      className="block px-3 py-2 text-left w-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    >
                      {`${i + 1}`.padStart(2, "0")}:00
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <input
          onChange={(e) => {
            changeEventHandler(e.target.value, "descr");
          }}
          value={event.descr}
          type="text"
          className="w-full mt-3 px-3 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none"
          placeholder="Description"
        />
        <div className="py-2 px-4 flex justify-between">
          <button
            onClick={cancelButtonHandler}
            className="mt-4 w-35 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Cancel
          </button>

          <button
            onClick={() => eventDelete(event.id)}
            className="mt-4 w-35 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>

          <button
            onClick={eventFetchHandler}
            className="mt-4 w-35 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {method}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEvent;
