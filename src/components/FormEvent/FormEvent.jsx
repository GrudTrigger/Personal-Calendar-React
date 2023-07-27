const FormEvent = ({
  cancelButtonHandler,
  changeEventHandler,
  event,
  eventFetchHandler,
  method,
  eventDelete,
}) => {
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
