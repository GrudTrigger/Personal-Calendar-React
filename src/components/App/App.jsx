import Header from "../Header/Header";
import DayOfTheWeek from "../DayOfTheWeek/DayOfTheWeek";
import DaysOfMonth from "../DaysOfMonth/DaysOfMonth";

const App = () => {
  return (
    <div className="w-[900px] h-[932px] rounded-2xl bg-white border my-0 mx-auto pl-7 pr-7 mt-6">
      <header>
        <Header />
      </header>
      <main>
        <DayOfTheWeek />
        <DaysOfMonth />
      </main>
    </div>
  );
};

export default App;
