import { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import {
  useSuperAddTeamCalendarMutation,
  useSuperTeamAttendanceQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  SuperVisorTeamInfo,
  TeamAttendance,
} from "~/app/store/types/supervisor-types";
import {
  useAdminAddTeamCalendarMutation,
  useAdminTeamAttendanceQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useCoachTeamCalendarQuery } from "~/app/store/coach/coachApi";
import { Group, Menu } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import DaySessions from "./DaySessions";
import { useDisclosure } from "@mantine/hooks";
import { CoachTeamInfo } from "~/app/store/types/coach-types";

type Props = {
  teamId: string;
  teamInfo: SuperVisorTeamInfo | CoachTeamInfo | undefined;
};

const TeamCalendar = ({ teamId, teamInfo }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
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

  const addAndRemoveDayAttendance = (date: Date) => {
    if (user?.user_type === "Supervisor") {
      superAddDay({
        day: AppUtils.formatDate(date),
        team: +teamId,
      })
        .then((res) => {
          //@ts-ignore
          if (res.error.status === 409) {
            AppUtils.showNotificationFun(
              "Error",
              "Can't add",
              "Please add players first"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user?.user_type === "Admin") {
      adminAddDay({
        day: AppUtils.formatDate(date),
        team: +teamId,
      })
        .then((res) => {
          //@ts-ignore
          if (res.error.status === 409) {
            AppUtils.showNotificationFun(
              "Error",
              "Can't add",
              "Please add players first"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log("attDates", attDates);
    if (superAttDates) setAttDates(superAttDates);
    if (adminAttDates) setAttDates(adminAttDates);
    if (coachAttDates) setAttDates(coachAttDates);
  }, [superAttDates, adminAttDates, coachAttDates]);

  return (
    <div>
      <DaySessions
        attendanceDates={attDates}
        selectedDay={selectedDay}
        opened={opened}
        close={close}
      />
      <h2>Team Calendar</h2>
      <div className="w-full flex justify-center">
        <Calendar
          disableOutsideEvents
          month={month}
          onChange={(e) => console.log(e)}
          onMonthChange={onMonthChange}
          dayStyle={(date) => {
            if (attDates?.results) {
              return dateHighlighter(date, attDates?.results);
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

            if (teamInfo?.attend_per === "DAY") {
              return (
                <div
                  onClick={() => {
                    addAndRemoveDayAttendance(date);
                  }}
                >
                  {day}
                </div>
              );
            } else {
              return (
                <Menu withArrow shadow="md" width={120}>
                  <Menu.Target>
                    <div>{day}</div>
                  </Menu.Target>

                  <Menu.Dropdown
                    sx={{
                      zIndex: 10,
                    }}
                  >
                    {attDates &&
                    checkTheDaySelected(date, attDates?.results) ? (
                      <Menu.Item
                        onClick={() => {
                          open();
                          setSelectedDay(AppUtils.formatDate(date) || "NO Day");
                        }}
                        icon={
                          <AppIcons
                            icon={"AcademicCapIcon:outline"}
                            className="w-4 h-4"
                          />
                        }
                      >
                        <Group position="center">
                          <div>Sessions</div>
                        </Group>
                      </Menu.Item>
                    ) : (
                      ""
                    )}
                    <Menu.Item
                      icon={
                        <AppIcons
                          icon={
                            attDates &&
                            checkTheDaySelected(date, attDates?.results)
                              ? "XMarkIcon:outline"
                              : "CheckIcon:outline"
                          }
                          className="w-4 h-4"
                        />
                      }
                      onClick={() => addAndRemoveDayAttendance(date)}
                    >
                      {attDates?.results &&
                      checkTheDaySelected(date, attDates?.results) ? (
                        <span>Remove</span>
                      ) : (
                        <span>Add</span>
                      )}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default TeamCalendar;

const dateHighlighter = (selectedDate: Date, data: { day: string }[]): any => {
  for (let oneDate of data) {
    if (checkTheDay(selectedDate, oneDate.day)) {
      return {
        border: "1px solid #00f",
        borderRadius: "50%",
      };
    }
  }
};

const checkTheDaySelected = (
  selectedDate: Date,
  data: { day: string }[]
): boolean => {
  for (let oneDate of data) {
    if (checkTheDay(selectedDate, oneDate.day)) {
      return true;
    }
  }
  return false;
};

const checkTheDay = (selectedDate: Date, compareDay: string) => {
  if (
    new Date(compareDay).getDate() === selectedDate.getDate() &&
    new Date(compareDay).getMonth() === selectedDate.getMonth() &&
    new Date(compareDay).getFullYear() === selectedDate.getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
};

/**


 return (
            
            );


 */
