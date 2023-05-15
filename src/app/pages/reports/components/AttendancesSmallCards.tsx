import React from "react";
import { Player, PlayerAttendances } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  timeFilterFn,
} from "~/app/store/parent/parentSlice";
import { usePlayerCalendarQuery } from "~/app/store/parent/parentApi";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerCalendarQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminPlayerCalendarQuery } from "~/app/store/clubManager/clubManagerApi";
import { useGetTeamInfoQuery, useUserQuery } from "~/app/store/user/userApi";

type Props = {
  player_id?: number | string | undefined;
};

const AttendancesSmallCards = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const timeFilter = useSelector(timeFilterFn);
  const { data: user } = useUserQuery({});

  const { data: selectedTeamInfo } = useGetTeamInfoQuery(
    {
      team_id: selectedPlayerTeam.id,
    },
    { skip: !selectedPlayerTeam.id }
  );

  const { data: parentPlayerAttendance } = usePlayerCalendarQuery(
    {
      id: selectedPlayer?.id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );
  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Coach",
    }
  );

  const { data: superPlayerAttendance } = useSuperPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Supervisor",
    }
  );

  const { data: adminPlayerAttendance } = useAdminPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Admin",
    }
  );
  const newData = [0, 0];

  function updateAttendanceData(attendance: any) {
    if (attendance) {
      for (let i = 0; i < attendance.results?.length; i++) {
        //!This is for sessions
        if (selectedTeamInfo?.attend_per === "SESSION") {
          console.log("ATT SESSIONS");

          const sessionList = attendance.results[i].attendance_sessions;
          if (sessionList) {
            for (let j = 0; j < sessionList.length; j++) {
              if (sessionList[j].status === "ATTENDED") {
                newData[0] += 1;
              } else if (sessionList[j].status === "ABSENT") {
                newData[1] += 1;
              }
            }
          }
        } else {
          console.log("ATT DAYES");

          //! this is for dayes
          if (attendance.results[i].status === "ATTENDED") {
            newData[0] += 1;
          } else if (attendance.results[i].status === "ABSENT") {
            newData[1] += 1;
          }
        }
      }
    }
  }

  // Usage:
  updateAttendanceData(parentPlayerAttendance);
  updateAttendanceData(coachPlayerAttendance);
  updateAttendanceData(superPlayerAttendance);
  updateAttendanceData(adminPlayerAttendance);
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
