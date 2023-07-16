import moment from "moment";
import { useState } from "react";

moment.updateLocale("en", { week: { dow: 1 } });
const startDay = moment().startOf("month").startOf("week");
let day = startDay.clone().subtract(1, "day");

const useDaysArray = () => {
  const [daysArray, setDays] = useState(
    [...Array(42)].map(() => day.add(1, "day").clone()),
  );

  return {
    daysArray,
    setDays,
  };
};

export default useDaysArray;
