import { Calendar } from "@mantine/dates";
import classNames from "classnames";
import { FC } from "react";

type Props = {
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[];
  pageName?: string;
};

const CustomCalendar = ({ data, pageName }: Props) => {
  return (
    <div className="bg-white rounded-3xl p-4">
      <h2 className="title text-lg text-perfGray1">Calendar.</h2>
      <div
        className={classNames(
          "calendar flex  w-full justify-center items-center xs:justify-around",
          {
            "flex-col xs:flex-row sm:flex-col":
              pageName && pageName === "reports",
          },
          { "flex-col xs:flex-row": pageName !== "reports" }
        )}
      >
        <div
          className={classNames(
            "details flex my-4 flex-wrap  gap-4 justify-center items-start",
            {
              "xs:flex-col sm:flex-row": pageName && pageName === "reports",
            },
            { "xs:flex-col": pageName !== "reports" }
          )}
        >
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
