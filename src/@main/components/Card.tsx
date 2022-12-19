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

const Card = ({ powerType, scores, bg, color, player_id }: CardProps) => {
  const [data, setData] = useState<PlayerMetricScores | undefined>();

  // Fetch data for Parent
  const { data: moderate } = usePlayerModerateQuery(
    { player_id: player_id },
    { skip: !player_id }
  );
  const { data: strength } = usePlayerStrengthQuery(
    { player_id: player_id },
    { skip: !player_id }
  );
  const { data: weakness } = usePlayerWeaknessQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  // Fetch data for coach
  const { data: coachPlayerModerate } =
    useCoachPlayerKpisMetricsModerateScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );
  const { data: coachPlayerStrength } =
    useCoachPlayerKpisMetricsStrengthScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );
  const { data: coachPlayerWeakness } =
    useCoachPlayerKpisMetricsWeaknessScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );

  // Fetch Supervisor Data
  const { data: superPlayerModerate } =
    useSuperPlayerKpisMetricsModerateScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );
  const { data: superPlayerStrength } =
    useSuperPlayerKpisMetricsStrengthScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );
  const { data: superPlayerWeakness } =
    useSuperPlayerKpisMetricsWeaknessScoreQuery(
      { player_id: player_id },
      { skip: !player_id }
    );

  useEffect(() => {
    if (powerType === "Moderate") {
      if (moderate) setData(moderate);
      if (coachPlayerModerate) setData(coachPlayerModerate);
      if (superPlayerModerate) setData(superPlayerModerate);
    } else if (powerType === "Strengths") {
      if (strength) setData(strength);
      if (coachPlayerStrength) setData(coachPlayerStrength);
      if (superPlayerStrength) setData(superPlayerStrength);
    } else if (powerType === "Weaknesses") {
      if (weakness) setData(weakness);
      if (coachPlayerWeakness) setData(coachPlayerWeakness);
      if (superPlayerWeakness) setData(superPlayerWeakness);
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
  ]);

  return (
    <div className="flex flex-col pdf-print bg-white py-2 min-h-fit overflow-scroll rounded-3xl">
      <div className="power_type px-5 py-2 flex flex-row justify-between items-center">
        <span className={` text-lg ${color}`}>{powerType}</span>
        <p className="text-sm text-perfGray3">
          Score is out of {data?.results?.length}
        </p>
      </div>
      <div
        className={`power_header ${bg}  px-5 py-2 bg-white flex flex-row justify-between`}
      >
        <h3 className="text-sm">Name</h3>
        <h3 className="text-sm">Score</h3>
      </div>
      <div className="h-64 overflow-scroll">
        {data ? (
          data?.results.map((power) => {
            return (
              <div
                key={power.id}
                className={`power_score px-5 py-2 flex flex-row justify-between`}
              >
                <h3 className="text-sm">{power.metric}</h3>
                <h3 className={`font-semibold ${color} text-sm`}>
                  {power.last_score}
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
