import { Calendar } from "@mantine/dates";
import classNames from "classnames";
import { Player, PlayerAttendances } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { usePlayerCalendarQuery } from "~/app/store/parent/parentApi";
import { useEffect, useState } from "react";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerCalendarQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminPlayerCalendarQuery } from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useGetTeamInfoQuery, useUserQuery } from "~/app/store/user/userApi";

type Props = {
  pageName?: "reports";
  player_id?: number | string | undefined;
  hide?: boolean | undefined;
};

const CustomCalendar = ({ pageName, player_id, hide = false }: Props) => {
  const { data: user } = useUserQuery({});
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const [playerAttendance, setPlayerAttendance] = useState<PlayerAttendances>();
  const [month, onMonthChange] = useState(new Date());
  const [firstDay, setFirstDay] = useState<string>();
  const [lastDay, setLastDay] = useState<string>();

  const { data: teamInfo } = useGetTeamInfoQuery({
    team_id: selectedPlayerTeam.id,
  });

  useEffect(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    // Get the first day of the month
    const firstDayOfMonth = AppUtils.formatDate(new Date(year, monthIndex, 1));
    setFirstDay(firstDayOfMonth);

    // Get the last day of the month
    const lastDayOfMonth = AppUtils.formatDate(
      new Date(year, monthIndex + 1, 0)
    );
    setLastDay(lastDayOfMonth);

    console.log(firstDay, lastDay);
  }, [month]);

  const { data: parentPlayerAttendance } = usePlayerCalendarQuery(
    {
      id: selectedPlayer?.id,
      date_from: firstDay,
      date_to: lastDay,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !firstDay ||
        !lastDay ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );

  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: firstDay,
      date_to: lastDay,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !firstDay ||
        !lastDay ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Coach",
    }
  );

  const { data: superPlayerAttendance } = useSuperPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: firstDay,
      date_to: lastDay,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !firstDay ||
        !lastDay ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Supervisor",
    }
  );

  const { data: adminPlayerAttendance } = useAdminPlayerCalendarQuery(
    {
      player_id: player_id,
      date_from: firstDay,
      date_to: lastDay,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !player_id ||
        !firstDay ||
        !lastDay ||
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

  if (teamInfo?.attend_per === "SESSION") return <></>;

  return (
    <div className="bg-white rounded-3xl p-4 h-full">
      <h2 className="title text-lg text-perfGray1">Calendar.</h2>
      <div
        className={classNames(
          "calendar flex  w-full justify-center items-center xs:justify-around",
          {
            "flex-col xs:flex-row sm:flex-col":
              pageName && pageName === "reports",
          },
          {
            "flex-col xs:flex-row sm:flex-col md:flex-row":
              pageName !== "reports",
          }
        )}
      >
        <div
          className={classNames(
            "details flex my-4 flex-wrap  gap-4 justify-center items-start",
            {
              "xs:flex-col sm:flex-row": pageName && pageName === "reports",
            },
            { "xs:flex-col sm:flex-row md:flex-col": pageName !== "reports" }
          )}
        >
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
        <div className="datePicker overflow-auto">
          <Calendar
            month={month}
            onMonthChange={onMonthChange}
            initialMonth={new Date()}
            onChange={(e) => console.log(e)}
            // initialMonth={new Date()}
            sx={{
              ".mantine-Calendar-day": {
                borderRadius: "50%",
                color: "#000",
                width: 30,
                height: 30,
                lineHeight: "30px",
                margin: 2,
                cursor: "unset",
              },
            }}
            dayStyle={(date) => {
              if (playerAttendance) {
                return testFun(date, playerAttendance?.results);
              } else {
                return { background: "#fff" };
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;

const testFun = (
  thisDate: Date,
  data: { day: string; status: "ATTENDED" | "ABSENT" | "UPCOMING" }[]
): { background?: string; border?: string; color?: string } => {
  for (let oneDate of data) {
    if (
      new Date(oneDate.day).getDate() === thisDate.getDate() &&
      new Date(oneDate.day).getMonth() === thisDate.getMonth() &&
      new Date(oneDate.day).getFullYear() === thisDate.getFullYear()
    ) {
      if (oneDate.status === "ATTENDED") {
        return { background: "#1976D2", color: "#fff" };
      } else if (oneDate.status === "ABSENT") {
        return { background: "#C32B43", color: "#fff" };
      } else if (oneDate.status === "UPCOMING") {
        return { border: "1px solid #00f" };
      } else {
        return {};
      }
    }
  }
  return {};
};
