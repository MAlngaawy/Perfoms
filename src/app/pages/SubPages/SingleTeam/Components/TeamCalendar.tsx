import { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import classNames from "classnames";
import {
  useSuperAddTeamCalendarMutation,
  useSuperTeamAttendanceQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  teamId: string;
};

const TeamCalendar = ({ teamId }: Props) => {
  const { data: attDates } = useSuperTeamAttendanceQuery(
    { team_id: +teamId },
    { skip: !teamId }
  );

  const [addDay, isLoading] = useSuperAddTeamCalendarMutation();

  return (
    <div>
      <h2>Team Calendar</h2>
      <div className="w-full flex justify-center">
        <Calendar
          dayStyle={(date) => {
            if (attDates?.player_attendance) {
              return testFun(date, attDates?.player_attendance);
            } else {
              return { background: "#fff" };
            }
          }}
          sx={{
            ".mantine-Calendar-day": {
              width: 30,
              height: 30,
              lineHeight: "30px",
              margin: 2,
            },
          }}
          renderDay={(date) => {
            const day = date.getDate();
            return (
              <div
                onClick={() =>
                  addDay({
                    day: AppUtils.formatDate(date),
                    team: teamId,
                  })
                }
              >
                {day}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TeamCalendar;

const testFun = (thisDate: Date, data: { day: string }[]): any => {
  for (let oneDate of data) {
    if (
      new Date(oneDate.day).getDate() === thisDate.getDate() &&
      new Date(oneDate.day).getMonth() === thisDate.getMonth() &&
      new Date(oneDate.day).getFullYear() === thisDate.getFullYear()
    ) {
      return {
        border: "1px solid #00f",
        borderRadius: "50%",
      };
    }
  }
};
