import { Avatar } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import Info from "~/@main/components/Info";
import PrintComp from "~/@main/PrintComp";
import AttendReportsChart from "~/@main/components/MainReports/AttendReportsChart";
import {
  CoachPlayerInfo,
  PlayerMonthsAttendancesStatistics,
  TeamsStatistics,
} from "~/app/store/types/coach-types";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  timeFilterFn,
} from "~/app/store/parent/parentSlice";
import {
  useUserGeneralPlayerKpiStatisticsQuery,
  useUserGeneralPlayersAttendStatisticsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import { axiosInstance } from "~/app/configs/dataService";
import AppUtils from "~/@main/utils/AppUtils";
import CardsWrapper from "~/@main/components/MainReports/CardsWrapper";

type Props = {
  reportType: string;
  playerInfo: CoachPlayerInfo | undefined;
};

const OverAll = ({ playerInfo, reportType }: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const [playerTeams, setPlayerTeams] = useState<any[]>([]);
  const { data: user } = useUserQuery({});
  const timefilter = useSelector(timeFilterFn);
  const { id: player_id } = useParams();
  const id = player_id || playerInfo?.id;
  const [attendanceData, setAttendanceData] =
    useState<PlayerMonthsAttendancesStatistics | null>(null);
  const [performanceData, setPerformanceData] =
    useState<TeamsStatistics | null>(null);

  const { data: userGeneralPerformanceData } =
    useUserGeneralPlayerKpiStatisticsQuery(
      {
        player_id: id,
        month: timefilter.month,
        year: timefilter.year,
        team_id: selectedPlayerTeam?.id,
      },
      {
        skip:
          !id ||
          !timefilter.month ||
          !timefilter.year ||
          !selectedPlayerTeam?.id,
      }
    );

  const { data: userGeneralAttendData } =
    useUserGeneralPlayersAttendStatisticsQuery(
      { player_id: id, team_id: selectedPlayerTeam?.id },
      { skip: !id || !selectedPlayerTeam?.id }
    );

  useEffect(() => {
    if (userGeneralPerformanceData)
      setPerformanceData(userGeneralPerformanceData);
    if (userGeneralAttendData) setAttendanceData(userGeneralAttendData);

    console.log("OVERALL performanceData", userGeneralPerformanceData);
    console.log("OVERALL attendanceData", userGeneralAttendData);
  }, [userGeneralPerformanceData, userGeneralAttendData]);

  return (
    <PrintComp documentTitle={playerInfo?.name || "No Name"}>
      <CardsWrapper>
        {/* <TeamInfoCard /> */}
        <div>
          <div className="teamInfoCard shadow-lg bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-full">
            <h2> {playerInfo?.name} </h2>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-6">
                <Avatar src={playerInfo?.icon} className="h-full" size="xl" />
                <div className="flex flex-col ">
                  <Info label="name" value={playerInfo?.name} />
                  <Info
                    label="Age"
                    value={AppUtils.calculateAge(playerInfo?.dob)}
                  />
                </div>
              </div>
              {playerInfo?.sport.toLocaleLowerCase() === "taekwondo" ? (
                <div className="flex justify-between gap-2 flex-wrap">
                  {playerInfo?.world_weight && (
                    <Info
                      label="World Weight"
                      value={playerInfo?.world_weight}
                    />
                  )}
                  {playerInfo?.olympic_weight && (
                    <Info
                      label="Olympic Weight"
                      value={playerInfo?.olympic_weight}
                    />
                  )}
                  {playerInfo?.height && (
                    <Info label="Height" value={playerInfo?.height} />
                  )}

                  {playerInfo?.front_leg !== "NONE" && (
                    <Info
                      label="Preferred Front Leg"
                      value={playerInfo?.front_leg}
                    />
                  )}
                </div>
              ) : (
                <>
                  {playerInfo?.weight && (
                    <Info label="Weight" value={playerInfo?.weight} />
                  )}
                  {playerInfo?.height && (
                    <Info label="Height" value={playerInfo?.height} />
                  )}
                </>
              )}
              <div className="flex flex-row justify-between">
                <div className="flex  gap-6 justify-between">
                  <Info label="Sport" value={playerInfo?.sport} />
                </div>
                <div>
                  <Info label="Teams" />
                  {playerTeams &&
                    playerTeams.map((team) => {
                      return (
                        <p className="text-sm" key={team.id}>
                          {team.name}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {reportType === "Performances" ? (
          performanceData?.results?.map((kpi) => {
            return (
              <div key={kpi.id}>
                <ReportsChartCard
                  clickable={false}
                  name={kpi.name}
                  statistics={kpi.statistics}
                />
              </div>
            );
          })
        ) : (
          <>
            {attendanceData?.map((attend) => {
              return (
                <div className="w-full" key={attend.name}>
                  <AttendReportsChart
                    player_attendance={attend.statistics}
                    name={attend.name}
                  />
                </div>
              );
            })}
          </>
        )}
      </CardsWrapper>
    </PrintComp>
  );
};

export default OverAll;
