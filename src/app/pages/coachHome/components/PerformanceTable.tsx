import React from "react";
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

type Props = {};
// Doesn't matters what the arrange
const kpiMetrics = [
  {
    kpiName: "Punish",
    metrics: [
      { name: "Right Leg", id: "1" },
      { name: "Left Leg", id: "2" },
    ],
    id: 2,
  },
  {
    kpiName: "right Leg",
    metrics: [
      { name: "Punching Technique", id: "3" },
      { name: "Behavior", id: "4" },
    ],
    id: 3,
  },
  {
    kpiName: "Pushing",
    metrics: [
      { name: "Stances Position In Court", id: "5" },
      { name: "360", id: "6" },
    ],
    id: 1,
  },
  {
    kpiName: "Punish",
    metrics: [
      { name: "Tifregi", id: "1" },
      { name: "Titchagi", id: "2" },
    ],
    id: 2,
  },
  {
    kpiName: "right Leg",
    metrics: [
      { name: "Endurance", id: "3" },
      { name: "Balance", id: "4" },
    ],
    id: 3,
  },
  {
    kpiName: "Pushing",
    metrics: [
      { name: "Flexibility", id: "5" },
      { name: "Attacking Position in court", id: "6" },
    ],
    id: 1,
  },
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
        <div className="tableWrapper overflow-scroll relative m-6 bg-white rounded-lg text-center">
          <Table highlightOnHover>
            <thead>
              <tr className="">
                <th className="bg-white sticky left-0  top-0 z-50 text-center">
                  Technic
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
                    <div key={oneKpi.id}>
                      <tr>
                        <td className="border-0 font-bold text-left px-4 text-sm sticky left-0 bg-white z-10 text-perfGray1">
                          {oneKpi.name}
                        </td>
                      </tr>
                      {oneKpi.kpi_metric.map((metric) => {
                        return (
                          <tr className="border-0" key={metric.id}>
                            <td className=" text-xs sm:text-sm sticky left-0  bg-white z-10 font-medium text-perfGray1">
                              <div className="w-20 xs:w-40 text-left pl-6">
                                {metric.name}
                              </div>
                            </td>
                            {teamPerformance?.results.map((player) => {
                              let theMetric = 0;
                              let theScore = 0;
                              for (let i of player.player_metric) {
                                if (i.metric === metric.name) {
                                  theMetric = i.id || 0;
                                  theScore = i.last_score || 0;
                                }
                              }
                              return (
                                <td key={player.id}>
                                  <div
                                    className={classNames(
                                      "flex gap-2 justify-center items-center mx-4"
                                      // { "opacity-40": theScore > 0 }
                                    )}
                                  >
                                    {[1, 2, 3, 4, 5].map((number) => (
                                      <span
                                        key={number}
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
                                          "px-2 p-1 rounded-md cursor-pointer text-perfGray1 font-bold",
                                          {
                                            "bg-scoreGreen text-white":
                                              theScore > 3 &&
                                              theScore === number,
                                            "bg-scoreRed text-white":
                                              theScore < 3 &&
                                              theScore === number,
                                            "bg-scoreYallow text-white":
                                              theScore === 3 &&
                                              theScore === number,
                                            "bg-slate-100": theScore !== number,
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
                    </div>
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
