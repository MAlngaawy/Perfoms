import React from "react";
import { Table, Checkbox, Avatar, Box } from "@mantine/core";
import cn from "classnames";
import {
  useCoachUpdateAttendanceMutation,
  useGetTeamPerformancesQuery,
  useTeamPerformanceMetricsQuery,
  useUpdatePlayerPKMMutation,
} from "~/app/store/coach/coachApi";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import { UpdatePlaerKpiMetric } from "~/app/store/types/coach-types";

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

  const { data: teamPerformanceMetric } = useTeamPerformanceMetricsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const [UpdatePlaerKpiMetric, { isLoading: isUpdating }] =
    useUpdatePlayerPKMMutation();

  console.log("teamPerformance", teamPerformance);

  return (
    <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
      <Table highlightOnHover horizontalSpacing="xl">
        <thead>
          <tr className="">
            <th className="bg-white sticky  top-0 z-20 ">Day</th>
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
          {teamPerformanceMetric?.player_metric.map((metric) => {
            return (
              <tr className="" key={metric.metric}>
                <td className="text-sm w-48 sticky left-0 bg-white z-10 font-medium text-perfGray1">
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
                      <div className="flex gap-2 justify-center items-center">
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
        </tbody>
      </Table>
    </div>
  );
};
export default PerformanceTable;
