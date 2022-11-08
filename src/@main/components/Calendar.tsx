import { Calendar } from "@mantine/dates";
import { FC } from "react";

type Props = {
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[];
};

const testData2 = {
  ATTENDED: ["11/2/2022", "11/7/2022"],
  ABSENT: ["11/3/2022", "11/5/2022"],
  UPCOMING: ["11/20/2022", "11/25/2022"],
};

const CustomCalendar = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-3xl p-4">
      <h2 className="title text-lg text-perfGray1">Calendar.</h2>
      <div className="calendar flex flex-col xs:flex-row w-full justify-center items-center xs:justify-around ">
        <div className="details flex my-4 flex-wrap xs:flex-col gap-4 justify-center items-start">
          <div className="flex gap-1">
            <div className="dot w-5 h-5 rounded-full bg-perfBlue"></div>
            <h2>Attended</h2>
          </div>
          <div className=" flex gap-1">
            <div className="dot w-5 h-5 rounded-full bg-perfSecondary"></div>
            <h2>Absent</h2>
          </div>
          <div className=" flex gap-1">
            <div className="dot w-5 h-5 rounded-full border border-perfBlue"></div>
            <h2>Upcoming</h2>
          </div>
        </div>
        <div className="datePicker overflow-auto">
          <Calendar
            initialMonth={new Date()}
            sx={{
              ".mantine-Calendar-day": {
                borderRadius: "50%",
                color: "#000",
              },
            }}
            dayStyle={(date) => testFun(date, data)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;

const testFun = (
  thisDate: Date,
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[]
): { background?: string; border?: string; color?: string } => {
  for (let oneDate of data) {
    if (
      new Date(oneDate.day).getDate() === thisDate.getDate() &&
      new Date(oneDate.day).getMonth() === thisDate.getMonth() &&
      new Date(oneDate.day).getFullYear() === thisDate.getFullYear()
    ) {
      if (oneDate.attendance === "ATTENDED") {
        return { background: "#1976D2", color: "#fff" };
      } else if (oneDate.attendance === "ABSENT") {
        return { background: "#C32B43", color: "#fff" };
      } else if (oneDate.attendance === "UPCOMING") {
        return { border: "1px solid #00f" };
      } else {
        return {};
      }
    }
  }
  return {};
};
