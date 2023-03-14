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

  // Fetch data for Parent
  const { data: moderate } = usePlayerModerateQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        user?.user_type !== "Parent",
    }
  );
  const { data: strength } = usePlayerStrengthQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        user?.user_type !== "Parent",
    }
  );
  const { data: weakness } = usePlayerWeaknessQuery(
    {
      player_id: player_id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    {
      skip:
        !player_id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date ||
        user?.user_type !== "Parent",
    }
  );

  // Fetch data for coach
  const { data: coachPlayerModerate } =
    useCoachPlayerKpisMetricsModerateScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Coach" }
    );
  const { data: coachPlayerStrength } =
    useCoachPlayerKpisMetricsStrengthScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Coach" }
    );
  const { data: coachPlayerWeakness } =
    useCoachPlayerKpisMetricsWeaknessScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Coach" }
    );

  // Fetch Supervisor Data
  const { data: superPlayerModerate } =
    useSuperPlayerKpisMetricsModerateScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Supervisor" }
    );
  const { data: superPlayerStrength } =
    useSuperPlayerKpisMetricsStrengthScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Supervisor" }
    );
  const { data: superPlayerWeakness } =
    useSuperPlayerKpisMetricsWeaknessScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Supervisor" }
    );

  // Fetch Supervisor Data
  const { data: adminPlayerModerate } =
    useAdminPlayerKpisMetricsModerateScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Admin" }
    );
  const { data: adminPlayerStrength } =
    useAdminPlayerKpisMetricsStrengthScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Admin" }
    );
  const { data: adminPlayerWeakness } =
    useAdminPlayerKpisMetricsWeaknessScoreQuery(
      {
        player_id: player_id,
        date_from: timeFilter?.from_date,
        date_to: timeFilter?.to_date,
      },
      { skip: !player_id || user?.user_type !== "Admin" }
    );

  useEffect(() => {
    if (powerType === "Moderate") {
      if (moderate) setData(moderate);
      if (coachPlayerModerate) setData(coachPlayerModerate);
      if (superPlayerModerate) setData(superPlayerModerate);
      if (adminPlayerModerate) setData(adminPlayerModerate);
    } else if (powerType === "Strengths") {
      if (strength) setData(strength);
      if (coachPlayerStrength) setData(coachPlayerStrength);
      if (superPlayerStrength) setData(superPlayerStrength);
      if (adminPlayerStrength) setData(adminPlayerStrength);
    } else if (powerType === "Weaknesses") {
      if (weakness) setData(weakness);
      if (coachPlayerWeakness) setData(coachPlayerWeakness);
      if (superPlayerWeakness) setData(superPlayerWeakness);
      if (adminPlayerWeakness) setData(adminPlayerWeakness);
    }
  }, [
    moderate,
    strength,
    weakness,
    coachPlayerModerate,
    coachPlayerStrength,
    coachPlayerWeakness,
    superPlayerModerate,
    superPlayerStrength,
    superPlayerWeakness,
    adminPlayerModerate,
    adminPlayerStrength,
    adminPlayerWeakness,
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
          data?.results
            .filter((power) => power.avg_score > 0)
            .map((power) => {
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
        {data &&
          data?.results.filter((power) => power.avg_score > 0)?.length < 1 && (
            <NoReport />
          )}
      </div>
    </div>
  );
};

export default Card;
