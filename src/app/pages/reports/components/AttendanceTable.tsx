import React from "react";
import { Table } from "@mantine/core";
import AppIcons from "@main/core/AppIcons";

type Props = {
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[];
};

const myDate = (theDate: string) => {
  var a = new Date(theDate);
  var days = new Array(7);
  days[0] = "Sunday";
  days[1] = "Monday";
  days[2] = "Tuesday";
  days[3] = "Wednesday";
  days[4] = "Thursday";
  days[5] = "Friday";
  days[6] = "Saturday";
  var r = days[a.getDay()];
  return r;
};

const AttendanceTable = ({ data }: Props) => {
  const rows = data.map((day) => (
    <tr key={day.day}>
      <td className="border-0 text-sm font-medium ">
        {myDate(day.day)}, {day.day}
      </td>
      <td className="border-0">
        {day.attendance === "ABSENT" ? (
          <AppIcons
            className="w-5 h-5 text-perfSecondary"
            icon="XMarkIcon:outline"
          />
        ) : day.attendance === "ATTENDED" ? (
          <AppIcons className="w-5 h-5 text-green" icon="CheckIcon:outline" />
        ) : (
          "__"
        )}
      </td>
    </tr>
  ));

  return (
    <Table striped>
      <thead>
        <tr>
          <th className="flex items-center gap-1 text-sm font-medium border-0 border-r">
            <p>Day</p>
            <AppIcons
              className="w-4 h-4 text-perfGray3"
              icon="ArrowSmallUpIcon:outline"
            />
          </th>
          <th className="text-sm font-medium border-0">Attendance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default AttendanceTable;
