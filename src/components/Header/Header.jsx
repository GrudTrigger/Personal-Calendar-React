import PencilIcon from "./PencilIcon";

const Header = () => {
  return (
    <div className="flex justify-between pt-3">
      <div className="flex items-center gap-6">
        <div className=" font-title font-bold text-gray-500 text-5xl leading-tight">
          2023
        </div>
        <div className=" font-title font-bold text-5xl leading-tight ">
          July
        </div>
      </div>
      <div className="flex items-center">
        <h1 className=" font-text text-black text-4xl font-normal">
          Personal Calendar
        </h1>
        <button className="w-8 h-8">
          <PencilIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
