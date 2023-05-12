import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
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

const AttendanceDaysReports = ({ player_id }: Props) => {
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

  const [playerAttendance, setPlayerAttendance] = useState<PlayerAttendances>();

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
        user?.user_type !== "Parent",
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

  useEffect(() => {
    if (parentPlayerAttendance) setPlayerAttendance(parentPlayerAttendance);
    if (coachPlayerAttendance) setPlayerAttendance(coachPlayerAttendance);
    if (superPlayerAttendance) setPlayerAttendance(superPlayerAttendance);
    if (adminPlayerAttendance) setPlayerAttendance(adminPlayerAttendance);
  }, [
    parentPlayerAttendance,
    coachPlayerAttendance,
    superPlayerAttendance,
    adminPlayerAttendance,
  ]);

  // //! Dayes Formate
  const daysRows =
    selectedTeamInfo?.attend_per === "DAY" &&
    playerAttendance?.results.map((day) => (
      <div
        key={day.id}
        className="px-2 py-1 rounded-xl justify-between flex border-b border-gray-100 hover:bg-gray-50 my-1"
      >
        <div className="border-0 text-xs font-medium text-perfGray2">
          {myDate(day.day)}, {day.day}
        </div>
        <div className="border-0">
          {day.status === "ABSENT" ? (
            <AppIcons
              className="w-5 h-5 text-perfSecondary"
              icon="XMarkIcon:outline"
            />
          ) : day.status === "ATTENDED" ? (
            <AppIcons className="w-5 h-5 text-green" icon="CheckIcon:outline" />
          ) : (
            "_"
          )}
        </div>
      </div>
    ));

  //!sessions formate
  const sessionsRows =
    selectedTeamInfo?.attend_per === "SESSION" &&
    playerAttendance?.results.map((day) => (
      <div
        key={day.id}
        className="text-xs font-medium text-perfGray2 mt-2 flex flex-col"
      >
        {day.attendance_sessions.length > 0 && (
          <div className="font-semibold">
            {myDate(day.day)}, {day.day}
          </div>
        )}
        {day.attendance_sessions.map((session, index) => (
          <div
            className="px-2 py-1 rounded-xl justify-between flex border-b border-gray-100 hover:bg-gray-50 my-1"
            key={index}
          >
            <p>
              {session.from_hour} - {session.to_hour}{" "}
            </p>
            <p>
              {session.status === "ABSENT" ? (
                <AppIcons
                  className="w-5 h-5 text-perfSecondary"
                  icon="XMarkIcon:outline"
                />
              ) : session.status === "ATTENDED" ? (
                <AppIcons
                  className="w-5 h-5 text-green"
                  icon="CheckIcon:outline"
                />
              ) : (
                "_"
              )}
            </p>
          </div>
        ))}
      </div>
    ));

  return (
    <div className="h-full">
      <div className="flex justify-between mx-2 text-xs text-gray-300 mb-4">
        <p>{selectedTeamInfo?.attend_per}</p>
        <p>Attendance</p>
      </div>
      {playerAttendance && (
        <>
          {selectedTeamInfo?.attend_per === "SESSION" ? (
            <div>{sessionsRows}</div>
          ) : (
            <div>{daysRows}</div>
          )}
        </>
      )}
      <div className="text-center">
        {!playerAttendance && <p>No data yet.</p>}
      </div>
    </div>
  );
};

export default AttendanceDaysReports;
