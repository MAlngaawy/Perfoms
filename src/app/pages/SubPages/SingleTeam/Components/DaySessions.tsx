import { ActionIcon, Divider, Modal } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "~/@main/components/SubmitButton";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import {
  daySession,
  daySessions,
  TeamAttendance,
} from "~/app/store/types/supervisor-types";
import AppUtils from "~/@main/utils/AppUtils";
import {
  useSuperAddTeamAttendanceSessionMutation,
  useSuperDeleteTeamAttendanceSessionMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminAddTeamAttendanceSessionMutation,
  useAdminDeleteTeamAttendanceSessionMutation,
} from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";

type Props = {
  close: () => void;
  opened: boolean;
  selectedDay: string;
  attendanceDates?: TeamAttendance;
};

const DaySessions = ({
  opened,
  close,
  selectedDay,
  attendanceDates,
}: Props) => {
  const { data: user } = useUserQuery({});
  const { team_id } = useParams();
  const [selectedDaySessions, setSelectedDaySessions] = useState<daySessions>();
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [error, setError] = useState<boolean | string>(false);
  const [superAddSession, { isLoading: superAddLoading }] =
    useSuperAddTeamAttendanceSessionMutation();
  const [adminAddSession, { isLoading: adminAddLoading }] =
    useAdminAddTeamAttendanceSessionMutation();

  useEffect(() => {
    const selectedDayData = attendanceDates?.results.find(
      (value) => value.day === selectedDay
    );

    setSelectedDaySessions(selectedDayData?.attendance_sessions);
  }, [attendanceDates, selectedDay]);

  const addSession = (e: any) => {
    e.preventDefault();
    if (from && to) {
      const data = {
        from_hour: AppUtils.convertDateToString(from),
        to_hour: AppUtils.convertDateToString(to),
        day: selectedDay,
      };
      setError(false);
      if (user?.user_type === "Admin") {
        adminAddSession({ team_id, ...data })
          .then((res: any) => {
            if (res.error) {
              setError(res.error.data.non_field_errors[0]);
            } else {
              setFrom(null);
              setTo(null);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        superAddSession({ team_id, ...data })
          .then((res: any) => {
            if (typeof res.error.data === "string") {
              setError(
                "there is a Session with the same hours and attendance day already exists"
              );
            }
            if (res.error) {
              setError("to hour must be greater than from hour");
            } else {
              setFrom(null);
              setTo(null);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setError("Please add from and to correct times");
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setFrom(null);
          setTo(null);
          setError(false);
        }}
        title={"Add sessions for " + selectedDay}
      >
        <div className="flex flex-col gap-2">
          {selectedDaySessions?.map((session) => {
            return <OneSession selectedDay={selectedDay} session={session} />;
          })}
        </div>
        <Divider my="sm" />
        <p className="text-red text-sm">{error}</p>
        <form onSubmit={(e) => addSession(e)}>
          <TimeInput
            value={from}
            onChange={setFrom}
            label="From"
            radius="md"
            size="sm"
            withAsterisk
            format="12"
          />

          <TimeInput
            value={to}
            onChange={setTo}
            label="To"
            radius="md"
            size="sm"
            withAsterisk
            format="12"
          />
          <SubmitButton
            isLoading={superAddLoading || adminAddLoading}
            text="Add session"
          />
        </form>
      </Modal>
    </>
  );
};

export default DaySessions;

type OneSessionProps = {
  session: daySession;
  selectedDay: string;
};

const OneSession = ({ session, selectedDay }: OneSessionProps) => {
  const { data: user } = useUserQuery({});
  const { team_id } = useParams();
  const [superDelete] = useSuperDeleteTeamAttendanceSessionMutation();
  const [adminDelete] = useAdminDeleteTeamAttendanceSessionMutation();
  const deleteFunction = () => {
    const data = {
      from_hour: session.from_hour,
      to_hour: session.to_hour,
      day: selectedDay,
    };
    if (user?.user_type === "Admin") {
      adminDelete({
        team_id,
        ...data,
      })
        .then((res) =>
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "session deleted successfully"
          )
        )
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Something went wrong while deleting session"
          );
        });
    } else {
      superDelete({
        team_id,
        ...data,
      })
        .then((res) =>
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "session deleted successfully"
          )
        )
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Something went wrong while deleting session"
          );
        });
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <h3>{AppUtils.formatTime(session.from_hour)}</h3> -
        <h3>{AppUtils.formatTime(session.to_hour)}</h3>
      </div>
      <div>
        <DeleteButton
          deleteFun={() => {
            deleteFunction();
          }}
          name="this"
          type="session"
        />
      </div>
    </div>
  );
};
