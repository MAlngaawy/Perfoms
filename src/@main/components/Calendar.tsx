import { Calendar } from "@mantine/dates";
import classNames from "classnames";
import { Player, PlayerAttendances } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { usePlayerCalenderQuery } from "~/app/store/parent/parentApi";
import { useEffect, useState } from "react";
import { useCoachPlayerCalendarQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerCalendarQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  pageName?: "reports";
  player_id?: number | string | undefined;
};

const CustomCalendar = ({ pageName, player_id }: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const [playerAttendance, setPlayerAttendance] = useState<PlayerAttendances>();

  const { data: parentPlayerAttendance } = usePlayerCalenderQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer?.id }
  );

  const { data: coachPlayerAttendance } = useCoachPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const { data: superPlayerAttendance } = useSuperPlayerCalendarQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  useEffect(() => {
    if (parentPlayerAttendance) setPlayerAttendance(parentPlayerAttendance);
    if (coachPlayerAttendance) setPlayerAttendance(coachPlayerAttendance);
    if (superPlayerAttendance) setPlayerAttendance(superPlayerAttendance);
  }, [parentPlayerAttendance, coachPlayerAttendance, superPlayerAttendance]);

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
            initialMonth={new Date()}
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
