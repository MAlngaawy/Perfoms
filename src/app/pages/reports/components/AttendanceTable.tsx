import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Player, PlayerAttendances } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn, timeFilterFn } from "~/app/store/parent/parentSlice";
import { usePlayerCalenderQuery } from "~/app/store/parent/parentApi";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerCalendarQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminPlayerCalendarQuery } from "~/app/store/clubManager/clubManagerApi";

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

const AttendanceTable = ({ player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const timeFilter = useSelector(timeFilterFn);

  const [playerAttendance, setPlayerAttendance] = useState<PlayerAttendances>();

  const { data: parentPlayerAttendance } = usePlayerCalenderQuery(
    {
      id: selectedPlayer?.id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !selectedPlayer?.id || !timeFilter?.from_date || !timeFilter?.to_date,
    }
  );

  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const { data: superPlayerAttendance } = useSuperPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const { data: adminPlayerAttendance } = useAdminPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
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

  const rows = playerAttendance?.results.map((day) => (
    <tr key={day.id}>
      <td className="border-0 text-xs font-medium text-perfGray2">
        {myDate(day.day)}, {day.day}
      </td>
      <td className="border-0">
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
      </td>
    </tr>
  ));

  return (
    <>
      {playerAttendance && (
        <Table className="pdf-print">
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
      )}
      <div className="text-center">
        {!playerAttendance && <p>No data yet.</p>}
      </div>
    </>
  );
};

export default AttendanceTable;
