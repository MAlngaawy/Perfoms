import { memo, useEffect, useState } from "react";
import { Table, Checkbox, Avatar, Skeleton, Loader } from "@mantine/core";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamAttendanceQuery,
  useTeamAttendanceDaysQuery,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import NoTeamComp from "~/@main/components/NoTeamComp";
import NoAttendancesYet from "~/@main/components/NoAttendancesYet";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useSuperGetTeamAttendanceQuery,
  useSuperTeamAttendanceDaysQuery,
  useSuperUpdateAttendanceMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  CoachTeamAttendance,
  TeamAttendanceDays,
} from "~/app/store/types/coach-types";
import { useNavigate } from "react-router-dom";
import { Player } from "~/app/store/types/parent-types";

type Props = {};

const AttendanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  console.log("selectedPlayerTeam", selectedPlayerTeam);
  const { data: user } = useUserQuery({});
  const [teamAttendance, setTeamAttendance] = useState<CoachTeamAttendance>();
  const [teamAttendanceDays, setTeamAttendanceDays] =
    useState<TeamAttendanceDays>();

  const { data: coachTeamAttendance } = useGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    {
      skip: !selectedPlayerTeam,
    }
  );

  const { data: superTeamAttendance } = useSuperGetTeamAttendanceQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
  );

  const { data: coachTeamAttendanceDays, isLoading: isCoachLoading } =
    useTeamAttendanceDaysQuery(
      { team_id: selectedPlayerTeam?.id },
      {
        skip: !selectedPlayerTeam,
      }
    );

  const { data: superTeamAttendanceDays, isLoading: isSuperLoading } =
    useSuperTeamAttendanceDaysQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
    );

  useEffect(() => {
    console.log("superTeamAttendance", superTeamAttendance);
    console.log("superTeamAttendanceDays", superTeamAttendanceDays);
    if (coachTeamAttendance) setTeamAttendance(coachTeamAttendance);
    if (superTeamAttendance) setTeamAttendance(superTeamAttendance);
    if (coachTeamAttendanceDays) setTeamAttendanceDays(coachTeamAttendanceDays);
    if (superTeamAttendanceDays) setTeamAttendanceDays(superTeamAttendanceDays);
  }, [
    coachTeamAttendance,
    superTeamAttendance,
    coachTeamAttendanceDays,
    superTeamAttendanceDays,
  ]);

  // console.log("coahcTeamPlayers", coahcTeamPlayers);

  // if (isCoachLoading || isSuperLoading)
  //   return (
  //     <Skeleton
  //       height={200}
  //       width="80%"
  //       className="mx-auto my-20"
  //       radius="lg"
  //     />
  //   );

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <CreateContentTable
            teamAttendance={teamAttendance}
            teamAttendanceDays={teamAttendanceDays}
          />
        </div>
      ) : (
        <NoTeamComp />
      )}
    </>
  );
};
export default memo(AttendanceTable);

const TestCheckbox = memo(({ theDate, thisDate, theStatus, theID }: any) => {
  const { data: user } = useUserQuery({});
  const [updateAttend, { isLoading: isUpdating }] =
    useCoachUpdateAttendanceMutation();
  const [superUpdateAttend, { isLoading: superUpdating }] =
    useSuperUpdateAttendanceMutation();

  return (
    <>
      {isUpdating || superUpdating ? (
        <div className=" mx-auto flex items-center justify-center">
          <Loader size={"sm"} />
        </div>
      ) : (
        <Checkbox
          disabled={
            (theDate === thisDate && theStatus === "UPCOMING") || isUpdating
          }
          checked={theStatus === "ATTENDED"}
          onChange={(e) => {
            //@ts-ignore
            if (["Coach", "SubCoach"].includes(user?.user_type)) {
              updateAttend({
                id: theID,
                status: theStatus !== "ATTENDED" ? "ATTENDED" : "ABSENT",
              });
            } else if (user?.user_type === "Supervisor") {
              superUpdateAttend({
                id: theID,
                status: theStatus !== "ATTENDED" ? "ATTENDED" : "ABSENT",
              });
            }
          }}
        />
      )}
    </>
  );
});

// srparate the code for performance
const CreateContentTable = memo(
  ({ teamAttendance, teamAttendanceDays }: any) => {
    return (
      <Table
        withBorder
        highlightOnHover
        verticalSpacing={"sm"}
        horizontalSpacing={30}
      >
        <TableHead teamAttendance={teamAttendance} />
        <tbody className="overflow-scroll">
          {teamAttendanceDays?.results &&
          teamAttendanceDays?.results.length > 0 ? (
            <>
              {teamAttendanceDays?.results.map((item: any) => {
                const thisDate = item.day;
                return (
                  <tr key={item.day} className="">
                    <td className="text-xs font-medium text-center px-0 sticky left-0 bg-white z-10 text-perfGray1">
                      {thisDate}
                      {/* {thisDate.getDate() - 1}/ {thisDate.getMonth() + 1} /
                  {thisDate.getFullYear()} */}
                    </td>
                    {teamAttendance?.results.map((player: any) => {
                      let theDate = "";
                      let theStatus = "";
                      let theID = 0;
                      for (let i of player.player_attendance) {
                        if (i.day === thisDate) {
                          theDate = i.day;
                          theStatus = i.status;
                          theID = i.id;
                        }
                      }
                      return (
                        <td key={player.id}>
                          <TestCheckbox
                            theDate={theDate}
                            thisDate={thisDate}
                            theStatus={theStatus}
                            theID={theID}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td>
                <NoAttendancesYet type="Attendances" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
);

const TableHead = memo(({ teamAttendance }: any) => {
  const navigate = useNavigate();

  return (
    <thead>
      <tr className="">
        <th className="bg-white sticky  top-0 z-20 ">Day</th>
        {teamAttendance?.results.map((player: Player) => (
          <th
            key={player.id}
            className="bg-white sticky top-0 z-20 text-center "
          >
            <div className="flex  flex-col justify-center items-center">
              <Avatar
                onClick={() => navigate(`/players/${player.id}`)}
                radius={"xl"}
                size="md"
                className="cursor-pointer"
                src={player.icon}
              />
              <span>{player.name}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});
