import React, { useEffect, memo, useState } from "react";
import { Table, Avatar, Skeleton } from "@mantine/core";
import cn from "classnames";
import {
  useGetTeamPerformancesQuery,
  useTeamPerformanceMetricsQuery,
  useUpdatePlayerPKMMutation,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import classNames from "classnames";
import NoAttendancesYet from "~/@main/components/NoAttendancesYet";
import NoTeamComp from "~/@main/components/NoTeamComp";
import {
  useSuperGetTeamPerformancesQuery,
  useSuperTeamPerformanceMetricsQuery,
  useSuperUpdatePlayerPKMMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  CoachTeamPerformance,
  TeamPerformanceMetrics,
} from "~/app/store/types/coach-types";

type Props = {};

const PerformanceTable = (props: Props) => {
  const { data: user } = useUserQuery({});
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const [teamPerformance, setTeamPerformance] =
    useState<CoachTeamPerformance>();
  const [teamPerformanceMetric, setTeamPerformanceMetric] =
    useState<TeamPerformanceMetrics>();

  const { data: coachTeamPerformance, refetch: refetchCoachTeamPerformances } =
    useGetTeamPerformancesQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
    );

  const { data: coachTeamPerformanceMetric, isLoading: coachIsLoading } =
    useTeamPerformanceMetricsQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
    );

  const { data: superTeamPerformance, refetch: refetchSuperTeamPerformances } =
    useSuperGetTeamPerformancesQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
    );

  const { data: superTeamPerformanceMetric, isLoading: superIsLoading } =
    useSuperTeamPerformanceMetricsQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
    );

  // Refetch data when `selectedPlayerTeam` changes
  useEffect(() => {
    if (selectedPlayerTeam?.id) {
      if (user?.user_type === "Coach") {
        refetchCoachTeamPerformances();
      }
      if (user?.user_type === "Supervisor") {
        refetchSuperTeamPerformances();
      }
    }
  }, [selectedPlayerTeam, user]);

  useEffect(() => {
    if (coachTeamPerformance) setTeamPerformance(coachTeamPerformance);
    if (superTeamPerformance) setTeamPerformance(superTeamPerformance);
    if (coachTeamPerformanceMetric)
      setTeamPerformanceMetric(coachTeamPerformanceMetric);
    if (superTeamPerformanceMetric)
      setTeamPerformanceMetric(superTeamPerformanceMetric);
  }, [
    coachTeamPerformance,
    coachTeamPerformanceMetric,
    superTeamPerformance,
    superTeamPerformanceMetric,
  ]);

  if (coachIsLoading || superIsLoading)
    return (
      <Skeleton
        height={200}
        width="80%"
        className="mx-auto my-20"
        radius="lg"
      />
    );

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <Table highlightOnHover>
            <thead>
              <tr className="">
                <th className="bg-white sticky left-0  top-0 z-50 text-center">
                  Technique
                </th>
                {teamPerformance?.results.map((player) => (
                  <th
                    key={player.id}
                    className="bg-white sticky top-0 z-20 text-center "
                  >
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar radius={"xl"} size="md" src={player.icon} />
                      <span>{player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {teamPerformanceMetric?.results &&
              teamPerformanceMetric?.results.length > 0 ? (
                <>
                  {teamPerformanceMetric?.results.map((oneKpi) => (
                    <>
                      <tr>
                        <td className="border-0 font-bold text-left text-sm sticky left-0 bg-white z-10 text-perfGray1">
                          {oneKpi.name}
                        </td>
                      </tr>
                      {oneKpi.kpi_metric.map((metric) => {
                        return (
                          <tr className="border-0" key={metric.id}>
                            <td className=" text-xs sm:text-sm sticky left-0  bg-white z-10 font-medium text-perfGray1">
                              <div className="w-20 xs:w-40 text-left">
                                {metric.name}
                              </div>
                            </td>
                            {teamPerformance?.results.map((player: any) => {
                              let theMetric = 0;
                              let theScore = 0;
                              for (let i of player.player_metric) {
                                if (
                                  i.metric === metric.name &&
                                  i.kpi === oneKpi.name
                                ) {
                                  theMetric = i.id || 0;
                                  theScore = i.last_score || 0;
                                }
                              }
                              return (
                                <TestComponent
                                  player={player}
                                  firstScore={theScore}
                                  theMetric={theMetric}
                                  selectedPlayerTeam={selectedPlayerTeam}
                                />
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </>
              ) : (
                <tr>
                  <td>
                    <NoAttendancesYet />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoTeamComp />
      )}
    </>
  );
};
export default PerformanceTable;

// we separate this component to change the score fastl based on the updated data
const TestComponent = ({
  player,
  firstScore,
  selectedPlayerTeam,
  theMetric,
}: any) => {
  const [UpdateCoachPlayerKpiMetric] = useUpdatePlayerPKMMutation();
  const [UpdateSuperPlayerKpiMetric] = useSuperUpdatePlayerPKMMutation();
  const { data: user } = useUserQuery({});
  const [theScore, setTheScore] = useState(firstScore);

  useEffect(() => {
    setTheScore(firstScore);
  }, [firstScore]);

  return (
    <td key={player.id}>
      <div
        className={classNames("flex gap-2 justify-center items-center mx-4", {
          "opacity-40": theScore > 0,
        })}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <span
            key={number}
            onClick={() => {
              if (user?.user_type === "Coach") {
                UpdateCoachPlayerKpiMetric({
                  id: theMetric,
                  score: theScore === number ? 0 : number,
                  team_id: selectedPlayerTeam?.id,
                  max_score: 5,
                }).then((res) => {
                  //@ts-ignore
                  setTheScore(res.data.data.score);
                });
              } else if (user?.user_type === "Supervisor") {
                UpdateSuperPlayerKpiMetric({
                  id: theMetric,
                  score: theScore === number ? 0 : number,
                  team_id: selectedPlayerTeam?.id,
                  max_score: 5,
                }).then((res) => {
                  //@ts-ignore
                  setTheScore(res.data.data.score);
                });
              }
            }}
            className={cn("px-2 p-1 rounded-md cursor-pointer font-bold", {
              "bg-scoreGreen text-white": theScore > 3 && theScore === number,
              "bg-scoreRed text-white": theScore < 3 && theScore === number,
              "bg-scoreYallow text-white":
                theScore === 3 && theScore === number,
              "bg-slate-100 text-perfGray1 ": theScore !== number,
            })}
          >
            {theScore} - {firstScore}
          </span>
        ))}
      </div>
    </td>
  );
};
