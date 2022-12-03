import React from "react";
import { Table, Checkbox, Avatar, Box, Loader, Skeleton } from "@mantine/core";
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

type Props = {};
// Doesn't matters what the arrange
const metrics = [
  { name: "Right Leg", id: 2 },
  { name: "Left Leg", id: 1 },
  { name: "Pushing Technique", id: 3 },
];

const PerformanceTable = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: teamPerformance } = useGetTeamPerformancesQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const { data: teamPerformanceMetric, isLoading } =
    useTeamPerformanceMetricsQuery(
      { team_id: selectedPlayerTeam?.id },
      { skip: !selectedPlayerTeam }
    );

  const [UpdatePlaerKpiMetric] = useUpdatePlayerPKMMutation();

  if (isLoading)
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
        <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
          <Table highlightOnHover horizontalSpacing={20}>
            <thead>
              <tr className="">
                <th className="bg-white sticky  top-0 z-20 ">Metric</th>
                {teamPerformance?.results.map((player) => (
                  <th className="bg-white sticky top-0 z-20 text-center ">
                    <div className="flex  flex-col justify-center items-center">
                      <Avatar radius={"xl"} size="md" src={player.icon} />
                      <span>{player.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-scroll">
              {teamPerformanceMetric?.player_metric &&
              teamPerformanceMetric?.player_metric.length > 0 ? (
                <>
                  {teamPerformanceMetric?.player_metric.map((metric) => {
                    return (
                      <tr className="" key={metric.metric}>
                        <td className="text-sm sticky left-0 text-left bg-white z-10 font-medium text-perfGray1">
                          {metric.metric}
                        </td>
                        {teamPerformance?.results.map((player) => {
                          let theMetric = 0;
                          let theScore = 0;
                          for (let i of player.player_metric) {
                            if (i.metric === metric.metric) {
                              theMetric = i.id || 0;
                              theScore = i.last_score || 0;
                            }
                          }
                          return (
                            <td key={metric.metric}>
                              <div
                                className={classNames(
                                  "flex gap-2 justify-center items-center m-6 sm:m-10",
                                  { "opacity-40": theScore > 0 }
                                )}
                              >
                                {[1, 2, 3, 4, 5].map((number) => (
                                  <span
                                    onClick={() => {
                                      UpdatePlaerKpiMetric({
                                        id: theMetric,
                                        score: number,
                                        team_id: selectedPlayerTeam.id,
                                        max_score: 5,
                                      });
                                      console.log({
                                        metricID: theMetric,
                                      });
                                    }}
                                    className={cn(
                                      "px-3 p-1   rounded-md cursor-pointer text-perfGray1 font-bold",
                                      {
                                        "bg-scoreGreen text-white":
                                          theScore > 3 && theScore === number,
                                        "bg-scoreRed text-white":
                                          theScore < 3 && theScore === number,
                                        "bg-scoreYallow text-white":
                                          theScore === 3 && theScore === number,
                                        "bg-scoreGray": theScore !== number,
                                      }
                                    )}
                                  >
                                    {number}
                                  </span>
                                ))}
                              </div>
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
