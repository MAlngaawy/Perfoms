import NoReport from "~/app/pages/reports/components/NoReport";
import { useCoachPlayerRecommendationsQuery } from "~/app/store/coach/coachApi";
import { usePlayerRecommendationsQuery } from "~/app/store/parent/parentApi";
import { useEffect, useState } from "react";
import { PlayerRecommendations } from "~/app/store/types/parent-types";

type Props = {
  player_id: number | string | undefined;
};

const RecommendationsCard = ({ player_id }: Props) => {
  const [recommendations, setRecommendations] =
    useState<PlayerRecommendations>();

  const { data: parentPlayerRecommendations } = usePlayerRecommendationsQuery(
    { id: player_id },
    { skip: !player_id }
  );

  const { data: coachPlayerRecomendations } =
    useCoachPlayerRecommendationsQuery(
      { player_id: player_id },
      { skip: !player_id }
    );

  useEffect(() => {
    if (parentPlayerRecommendations)
      setRecommendations(parentPlayerRecommendations);
    if (coachPlayerRecomendations)
      setRecommendations(coachPlayerRecomendations);
  }, [parentPlayerRecommendations, coachPlayerRecomendations]);

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl ">
      <h2 className="text-perfGray1 text-base font-semibold ">
        Recommendations
      </h2>
      <div className="flex flex-col gap-4 h-80 overflow-scroll">
        {recommendations?.results.map((recommendation) => (
          <div key={recommendation.id}>
            <p>{recommendation.metric.name}</p>
            <p>{recommendation.name}</p>
            <p className=" text-perfGray3 text-sm">
              {recommendation.description}
            </p>
          </div>
        ))}
        <>{!recommendations && <NoReport />}</>
      </div>
    </div>
  );
};

export default RecommendationsCard;
