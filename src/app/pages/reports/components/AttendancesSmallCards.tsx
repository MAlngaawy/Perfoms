import React from "react";
import { Player } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { usePlayerCalenderQuery } from "~/app/store/parent/parentApi";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";

type Props = {
  player_id?: number | string | undefined;
};

const AttendancesSmallCards = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const { data: playerAttendance } = usePlayerCalenderQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer?.id }
  );

  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const newData = [0, 0];

  if (playerAttendance) {
    for (let i = 0; i < playerAttendance?.results?.length; i++) {
      if (playerAttendance?.results[i].status === "ATTENDED") {
        newData[0] += 1;
      } else if (playerAttendance?.results[i].status === "ABSENT") {
        newData[1] += 1;
      }
    }
  }

  if (coachPlayerAttendance) {
    for (let i = 0; i < coachPlayerAttendance?.results?.length; i++) {
      if (coachPlayerAttendance?.results[i].status === "ATTENDED") {
        newData[0] += 1;
      } else if (coachPlayerAttendance?.results[i].status === "ABSENT") {
        newData[1] += 1;
      }
    }
  }

  return (
    <div className="main-teams bg-white p-4 rounded-3xl">
      <h2 className="text-sm mb-4">Attendance Report summary - main team</h2>
      <div className="flex gap-6 flex-wrap">
        <PerformanceCard
          bgColor="rgba(0, 224, 150, 0.1)"
          textColor="#27AE60"
          name="Attendance"
          number={newData[0]}
        >
          <img
            className="w-8 h-8"
            src="/assets/images/gym_1.png"
            alt="gym icon"
          />
        </PerformanceCard>

        <PerformanceCard
          bgColor="rgba(235, 87, 87, 0.1)"
          textColor="#EB5757"
          name="Absence"
          number={newData[1]}
        >
          <img
            className="w-8 h-8"
            src="/assets/images/weakness_1.png"
            alt="weakness icon"
          />
        </PerformanceCard>

        <PerformanceCard
          bgColor="rgba(47, 128, 237, 0.1)"
          textColor="#2F80ED"
          name="Total"
          number={newData[0] + newData[1]}
        >
          <img
            className="w-8 h-8"
            src="/assets/images/tasks.png"
            alt="weakness icon"
          />
        </PerformanceCard>
      </div>
    </div>
  );
};

export default AttendancesSmallCards;

export const PerformanceCard = ({
  number,
  name,
  bgColor,
  textColor,
  children,
}: {
  number: number;
  name: string;
  bgColor: string;
  textColor: string;
  children: any;
}) => {
  return (
    <div
      style={{ background: bgColor }}
      className="card flex items-start py-1 px-8 gap-4 font-semibold rounded-full"
    >
      <div className="icon flex justify-center items-center">{children}</div>
      <div
        style={{ color: textColor }}
        className="info flex flex-col leading-4 text-xs"
      >
        <h2>{number}</h2>
        <h2>{name}</h2>
      </div>
    </div>
  );
};
