import React from "react";
import AttendanceReport, { AttendanceReportProps } from "./AttendanceReport";

const player: any = {
  name: "Ahmed Saleh Mostafa",
  icon_url:
    "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  attendances: 18,
  absence: 3,
  total: () => {
    return player.attendances + player.absence;
  },
};
const playerSummary = [
  {
    name: "Attendance",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Absence",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
  },
  {
    name: "Total",
    number: 8,
    bgColor: "#2F80ED1A",
    textColor: "#2F80ED",
    icon: "/assets/images/tasks.png",
  },
];

const AttendanceCard = () => {
  return (
    <div>
      <div>
        <AttendanceReport player={player} playerSummary={playerSummary} />
      </div>
    </div>
  );
};

export default AttendanceCard;
