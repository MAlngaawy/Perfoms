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
  selectedPlayerTeamFn,
  timeFilterFn,
} from "~/app/store/parent/parentSlice";
import {
  useUserGeneralPlayerKpiStatisticsQuery,
  useUserGeneralPlayersAttendStatisticsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import { axiosInstance } from "~/app/configs/dataService";

type Props = {
  reportType: string;
  playerInfo: CoachPlayerInfo | undefined;
};

const OverAll = ({ playerInfo, reportType }: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const [playerTeams, setPlayerTeams] = useState<any[]>([]);
  const { data: user } = useUserQuery({});
  const timefilter = useSelector(timeFilterFn);
  const { id } = useParams();
  const [attendanceData, setAttendanceData] =
    useState<PlayerMonthsAttendancesStatistics | null>(null);
  const [performanceData, setPerformanceData] =
    useState<TeamsStatistics | null>(null);

  const { data: userGeneralPerformanceData } =
    useUserGeneralPlayerKpiStatisticsQuery(
      {
        player_id: id,
        date_from: timefilter.from_date,
        date_to: timefilter.to_date,
        team_id: selectedPlayerTeam?.id,
      },
      {
        skip:
          !id ||
          !timefilter.from_date ||
          !timefilter.to_date ||
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
  }, [userGeneralPerformanceData, userGeneralAttendData]);

  const fetchData = async () => {
    axiosInstance
      .get(`/user-generals/player-info/${playerInfo?.id}`)
      .then((res) => {
        return res.data;
      })
      .then((data: any) => {
        setPlayerTeams([...data.team]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PrintComp>
      <div className="reports flex-row items-stretch justify-center flex flex-wrap gap-4 gap-x-8 my-6">
        {/* <TeamInfoCard /> */}
        <div>
          <div className="teamInfoCard shadow-lg bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
            <h2> {playerInfo?.name} </h2>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-6">
                <Avatar src={playerInfo?.icon} className="h-full" size="xl" />
                <div className="flex flex-col ">
                  <Info label="name" value={playerInfo?.name} />
                  <Info label="Age" value={playerInfo?.dob} />
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
          <>
            {performanceData?.results?.map((kpi) => {
              return (
                <div key={kpi.id}>
                  <ReportsChartCard
                    clickable={false}
                    name={kpi.name}
                    statistics={kpi.statistics}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            {attendanceData?.map((attend) => {
              return (
                <div key={attend.name}>
                  <AttendReportsChart
                    player_attendance={attend.statistics}
                    name={attend.name}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </PrintComp>
  );
};

export default OverAll;
