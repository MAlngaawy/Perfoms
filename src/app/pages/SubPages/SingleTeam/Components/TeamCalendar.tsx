import { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import {
  useSuperAddTeamCalendarMutation,
  useSuperTeamAttendanceQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamAttendance } from "~/app/store/types/supervisor-types";
import {
  useAdminAddTeamCalendarMutation,
  useAdminTeamAttendanceQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useCoachTeamCalendarQuery } from "~/app/store/coach/coachApi";

type Props = {
  teamId: string;
};

const TeamCalendar = ({ teamId }: Props) => {
  const { data: user } = useUserQuery({});
  const [attDates, setAttDates] = useState<TeamAttendance>();
  const [month, onMonthChange] = useState(new Date());
  const [requestYear, setRequestYear] = useState<string>("");
  const [requestMonth, setRequestMonth] = useState<string>("");

  useEffect(() => {
    setRequestMonth(JSON.stringify(month.getMonth() + 1));
    setRequestYear(JSON.stringify(month.getFullYear()));
  }, [month]);

  const { data: superAttDates } = useSuperTeamAttendanceQuery(
    { team_id: +teamId, year: requestYear, month: requestMonth },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );

  const { data: adminAttDates } = useAdminTeamAttendanceQuery(
    { team_id: +teamId, year: requestYear, month: requestMonth },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  const { data: coachAttDates } = useCoachTeamCalendarQuery(
    { team_id: +teamId, year: requestYear, month: requestMonth },
    { skip: !teamId || user?.user_type !== "Coach" }
  );

  //useGetTeamAttendanceQuery
  const [adminAddDay] = useAdminAddTeamCalendarMutation();
  const [superAddDay] = useSuperAddTeamCalendarMutation();

  useEffect(() => {
    if (superAttDates) setAttDates(superAttDates);
    if (adminAttDates) setAttDates(adminAttDates);
    if (coachAttDates) setAttDates(coachAttDates);
  }, [superAttDates, adminAttDates, coachAttDates]);

  return (
    <div>
      <h2>Team Calendar</h2>
      <div className="w-full flex justify-center">
        <Calendar
          disableOutsideEvents
          month={month}
          onChange={(e) => console.log(e)}
          onMonthChange={onMonthChange}
          dayStyle={(date) => {
            if (attDates?.results) {
              return testFun(date, attDates?.results);
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
                onClick={() => {
                  if (user?.user_type === "Supervisor") {
                    superAddDay({
                      day: AppUtils.formatDate(date),
                      team: +teamId,
                    });
                  } else if (user?.user_type === "Admin") {
                    adminAddDay({
                      day: AppUtils.formatDate(date),
                      team: +teamId,
                    });
                  }
                }}
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
