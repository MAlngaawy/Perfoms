import { useEffect, useState } from "react";
import NoReport from "~/app/pages/reports/components/NoReport";
import {
  useCoachPlayerKpisMetricsModerateScoreQuery,
  useCoachPlayerKpisMetricsStrengthScoreQuery,
  useCoachPlayerKpisMetricsWeaknessScoreQuery,
} from "~/app/store/coach/coachApi";
import {
  usePlayerModerateQuery,
  usePlayerStrengthQuery,
  usePlayerWeaknessQuery,
} from "~/app/store/parent/parentApi";
import {
  useSuperPlayerKpisMetricsModerateScoreQuery,
  useSuperPlayerKpisMetricsStrengthScoreQuery,
  useSuperPlayerKpisMetricsWeaknessScoreQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { PlayerKpis, PlayerMetricScores } from "~/app/store/types/parent-types";
import { CardProps } from "~/app/store/types/user-types";
import { Skeleton } from "@mantine/core";
import {
  useAdminPlayerKpisMetricsModerateScoreQuery,
  useAdminPlayerKpisMetricsStrengthScoreQuery,
  useAdminPlayerKpisMetricsWeaknessScoreQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";

const Card = ({ powerType, scores, bg, color, player_id }: CardProps) => {
  const [data, setData] = useState<PlayerMetricScores | undefined>();
  const { data: user } = useUserQuery({});
  const timeFilter = useSelector(timeFilterFn);
  const getUserData = (queryFn: any, userTypes: string[]) => {
    if (!userTypes.includes(user?.user_type || "")) {
      return null;
    }

    const { data } = queryFn({
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    });

    return data;
  };

  const moderateData = getUserData(usePlayerModerateQuery, ["Parent"]);
  const strengthData = getUserData(usePlayerStrengthQuery, ["Parent"]);
  const weaknessData = getUserData(usePlayerWeaknessQuery, ["Parent"]);

  const coachModerateData = getUserData(
    useCoachPlayerKpisMetricsModerateScoreQuery,
    ["Coach"]
  );
  const coachStrengthData = getUserData(
    useCoachPlayerKpisMetricsStrengthScoreQuery,
    ["Coach"]
  );
  const coachWeaknessData = getUserData(
    useCoachPlayerKpisMetricsWeaknessScoreQuery,
    ["Coach"]
  );

  const superModerateData = getUserData(
    useSuperPlayerKpisMetricsModerateScoreQuery,
    ["Supervisor"]
  );
  const superStrengthData = getUserData(
    useSuperPlayerKpisMetricsStrengthScoreQuery,
    ["Supervisor"]
  );
  const superWeaknessData = getUserData(
    useSuperPlayerKpisMetricsWeaknessScoreQuery,
    ["Supervisor"]
  );

  const adminModerateData = getUserData(
    useAdminPlayerKpisMetricsModerateScoreQuery,
    ["Admin"]
  );
  const adminStrengthData = getUserData(
    useAdminPlayerKpisMetricsStrengthScoreQuery,
    ["Admin"]
  );
  const adminWeaknessData = getUserData(
    useAdminPlayerKpisMetricsWeaknessScoreQuery,
    ["Admin"]
  );

  useEffect(() => {
    switch (powerType) {
      case "Moderate":
        setData(
          moderateData ??
            coachModerateData ??
            superModerateData ??
            adminModerateData
        );
        break;
      case "Strengths":
        setData(
          strengthData ??
            coachStrengthData ??
            superStrengthData ??
            adminStrengthData
        );
        break;
      case "Weaknesses":
        setData(
          weaknessData ??
            coachWeaknessData ??
            superWeaknessData ??
            adminWeaknessData
        );
        break;
      default:
        setData(undefined);
    }
  }, [
    moderateData,
    strengthData,
    weaknessData,
    coachModerateData,
    coachStrengthData,
    coachWeaknessData,
    superModerateData,
    superStrengthData,
    superWeaknessData,
    adminModerateData,
    adminStrengthData,
    adminWeaknessData,
    powerType,
  ]);

  return (
    <div className="flex flex-col pdf-print bg-white py-2 min-h-fit overflow-hidden rounded-3xl">
      <div className="power_type px-5 py-2 flex flex-row justify-between items-center">
        <span className={` text-lg ${color}`}>{powerType}</span>
        {/* <p className="text-sm text-perfGray3">
          Score is out of {data?.results?.length}
        </p> */}
      </div>
      <div
        className={`power_header ${bg}  px-5 py-2 bg-white flex flex-row justify-between`}
      >
        <h3 className="text-sm">
          <span className=" italic"> Kpi </span> -
          <span className=" font-medium"> Metric </span>
        </h3>
        <h3 className="text-sm">Score</h3>
      </div>
      <div className="h-64 overflow-y-auto">
        {data ? (
          data?.results.map((power) => {
            return (
              <div
                key={power.id}
                className={`power_score px-5 py-2 flex flex-row justify-between`}
              >
                <h3 className="text-sm">
                  <span className=" italic"> {power.kpi} </span> -
                  <span className=" font-medium">{power.metric}</span>
                </h3>
                <h3 className={`font-semibold ${color} text-sm`}>
                  {power.avg_score}
                </h3>
              </div>
            );
          })
        ) : (
          <div className="p-2 w-full h-full">
            <Skeleton width={"100%"} height={"100%"} radius="lg" />
          </div>
        )}
        {data && data?.results?.length < 1 && <NoReport />}
      </div>
    </div>
  );
};

export default Card;
