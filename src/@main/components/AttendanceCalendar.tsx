import React from "react";
// import { DatePicker } from "../molecules/DatePicker";
import { Calendar } from "@mantine/dates";
import { useMantineTheme } from "@mantine/core";

type Props = {
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[];
};

const AttendanceCalender = ({ data }: Props) => {
  return (
    <div className="bg-white p-4 rounded-3xl h-full">
      <h2 className="title text-lg text-perfGray1">Calendar.</h2>
      <div className="flex justify-around flex-col 2xl:flex-row">
        <div>
          <div className="flex flex-col gap-2 justify-center h-full w-full  items-center mx-auto">
            <div className="flex 2xl:flex-col justify-between my-6 gap-1 sm:gap-4">
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
          </div>
        </div>
        <div className="border 2xl:border-0 rounded-xl overflow-auto">
          <CustomDatePicker data={data} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalender;

const CustomDatePicker = ({ data }: { data: any }) => {
  const theme = useMantineTheme();

  return (
    <Calendar
      initialMonth={new Date(2021, 7)}
      dayStyle={(date) =>
        date.getDay() === 5 && date.getDate() === 13
          ? { backgroundColor: theme.colors.red[9], color: theme.white }
          : { backgroundColor: "", color: "" }
      }
    />
  );
};
