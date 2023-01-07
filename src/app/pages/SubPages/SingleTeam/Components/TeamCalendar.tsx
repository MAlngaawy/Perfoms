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
import { useGetTeamAttendanceQuery } from "~/app/store/coach/coachApi";

type Props = {
  teamId: string;
};

const TeamCalendar = ({ teamId }: Props) => {
  const { data: user } = useUserQuery({});
  const [attDates, setAttDates] = useState<TeamAttendance>();
  const [page, setPage] = useState<number>(1);

  // !-- and what about the 188 results ?? how to send page number to filter ?
  // !-- you can send just the last 100 result ? -- we need to handle pagination
  // !-- it doesn't arrange in the array !

  //! The same calendar shows different results in super and admin .. it should be the same ??
  const { data: superAttDates } = useSuperTeamAttendanceQuery(
    { team_id: +teamId },
    { skip: !teamId }
  );

  const { data: adminAttDates } = useAdminTeamAttendanceQuery(
    { team_id: +teamId, page: page },
    { skip: !teamId }
  );

  // !--There is no End point for coach thet bring the asked data types {day: string} ??

  // const { data: coachAttDates } = useGetTeamAttendanceQuery(
  //   { team_id: +teamId },
  //   { skip: !teamId }
  // );

  //useGetTeamAttendanceQuery
  //!  This add day when i reclick on a selected day .. it should be unselect
  // ! but it doesn't work ! it doesn't remove from the dayes __ it works in some dayes
  const [adminAddDay] = useAdminAddTeamCalendarMutation();
  const [superAddDay] = useSuperAddTeamCalendarMutation();

  useEffect(() => {
    // console.log("attDates", attDates);
    // if (attDates && attDates?.count > 100) setPage(2);
    if (superAttDates) setAttDates(superAttDates);
    if (adminAttDates) setAttDates(adminAttDates);
    // if (coachAttDates) setAttDates(coachAttDates);
  }, [superAttDates, adminAttDates]);

  return (
    <div>
      <h2>Team Calendar</h2>
      <div className="w-full flex justify-center">
        <Calendar
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
