import { useEffect, useState } from "react";
import { Table, Avatar, Skeleton, HoverCard } from "@mantine/core";
import cn from "classnames";
import {
  useGetTeamPerformancesQuery,
  useTeamPerformanceMetricsQuery,
  useUpdatePlayerPKMMutation,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import {
  selectedPlayerTeamFn,
  timeFilterFn,
} from "~/app/store/parent/parentSlice";
import classNames from "classnames";
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
import { useNavigate } from "react-router-dom";

type Props = {};

const PerformanceTable = (props: Props) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery({});
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const [teamPerformance, setTeamPerformance] =
    useState<CoachTeamPerformance>();
  const [teamPerformanceMetric, setTeamPerformanceMetric] =
    useState<TeamPerformanceMetrics>();

  const {
    data: coachTeamPerformance,
    refetch: refetchCoachTeamPerformances,
    isFetching: coachIsFetching,
  } = useGetTeamPerformancesQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
  );

  const { data: coachTeamPerformanceMetric } = useTeamPerformanceMetricsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
  );

  const {
    data: superTeamPerformance,
    refetch: refetchSuperTeamPerformances,
    isFetching: superIsFetching,
  } = useSuperGetTeamPerformancesQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
  );

  const { data: superTeamPerformanceMetric } =
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

  if (coachIsFetching || superIsFetching) {
    console.log("Loading");

    return <PerformanceTableSkelaton />;
  } else {
    console.log("Not Loading");
  }

  return (
    <>
      {selectedPlayerTeam ? (
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <Table highlightOnHover>
            <thead>
              <tr className="">
                {teamPerformance?.results.length == 0 ? (
                  <th
                    className="w-full font-normal flex justify-center items-center p-4 text-center"
                    colSpan={100}
                  >
                    No Players in this Team, <br />
                    You can add players on the team info page first, and then
                    score them from here.
                  </th>
                ) : (
                  <th className="bg-white sticky left-0  top-0 z-50 text-center">
                    Technique
                  </th>
                )}
                {teamPerformance?.results.map((player) => (
                  <th
                    key={player.id}
                    className="bg-white sticky top-0 z-20 text-center "
                  >
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar
                        onClick={() => navigate(`/players/${player.id}`)}
                        className="cursor-pointer"
                        radius={"xl"}
                        size="md"
                        src={player.icon}
                      />
                      <span>{player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {teamPerformanceMetric?.results &&
            teamPerformanceMetric?.results.length > 0 ? (
              <tbody className="overflow-scroll">
                {teamPerformanceMetric?.results.map((oneKpi) => (
                  <>
                    <tr>
                      <HoverCard width={200} position="top" shadow="md">
                        <HoverCard.Target>
                          <td className="border-0 font-bold text-left text-sm sticky left-0 bg-white z-10 text-perfGray1">
                            <p>{oneKpi.name}</p>
                          </td>
                        </HoverCard.Target>
                        <HoverCard.Dropdown className="bg-gray-100 p-2">
                          <p className="text-xs">{oneKpi.description}</p>
                        </HoverCard.Dropdown>
                      </HoverCard>
                    </tr>
                    {oneKpi.kpi_metric.map((metric) => {
                      return (
                        <tr className="border-0" key={metric.id}>
                          <td className=" text-xs sm:text-sm sticky left-0  bg-white z-10 font-medium text-perfGray1">
                            <div className="w-20 xs:w-40 text-left">
                              <HoverCard width={200} position="top" shadow="md">
                                <HoverCard.Target>
                                  <p>{metric.name}</p>
                                </HoverCard.Target>
                                <HoverCard.Dropdown className="bg-gray-100 p-2">
                                  <p className="text-xs">
                                    {metric.description}
                                  </p>
                                </HoverCard.Dropdown>
                              </HoverCard>
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
              </tbody>
            ) : (
              <tr className="w-full p-4 m-10 bg-white">
                <td colSpan={100} className="bg-pagesBg p-10 w-full">
                  No kpis added for the this team sport yet, <br />
                  if you want to add kpis you can go to the admin home page
                  <br />
                  and add kpis and metrics under this team sport
                </td>
              </tr>
            )}
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
            {number}
          </span>
        ))}
      </div>
    </td>
  );
};

const PerformanceTableSkelaton = () => {
  return (
    <>
      <Skeleton height={100} width="95%" className="mx-auto mb-2" radius="lg" />
      <Skeleton height={"70vh"} width="95%" className="mx-auto" radius="lg" />
    </>
  );
};
