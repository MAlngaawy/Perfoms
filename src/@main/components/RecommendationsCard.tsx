import NoReport from "~/app/pages/reports/components/NoReport";
import { useCoachPlayerRecommendationsQuery } from "~/app/store/coach/coachApi";
import { usePlayerRecommendationsQuery } from "~/app/store/parent/parentApi";
import { useEffect, useState } from "react";
import { PlayerRecommendations } from "~/app/store/types/parent-types";
import { Skeleton } from "@mantine/core";
import { useSuperPlayerRecommendationsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminPlayerRecommendationsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  player_id: number | string | undefined;
};

const RecommendationsCard = ({ player_id }: Props) => {
  const [recommendations, setRecommendations] =
    useState<PlayerRecommendations>();
  const { data: user } = useUserQuery({});

  const { data: parentPlayerRecommendations } = usePlayerRecommendationsQuery(
    { id: player_id },
    { skip: !player_id || user?.user_type !== "Parent" }
  );

  const { data: coachPlayerRecomendations } =
    useCoachPlayerRecommendationsQuery(
      { player_id: player_id },
      { skip: !player_id || user?.user_type !== "Coach" }
    );

  const { data: superPlayerRecomendations } =
    useSuperPlayerRecommendationsQuery(
      { player_id: player_id },
      { skip: !player_id || user?.user_type !== "Supervisor" }
    );

  const { data: adminPlayerRecomendations } =
    useAdminPlayerRecommendationsQuery(
      { player_id: player_id },
      { skip: !player_id || user?.user_type !== "Admin" }
    );

  useEffect(() => {
    if (parentPlayerRecommendations)
      setRecommendations(parentPlayerRecommendations);
    if (coachPlayerRecomendations)
      setRecommendations(coachPlayerRecomendations);
    if (superPlayerRecomendations)
      setRecommendations(superPlayerRecomendations);
    if (adminPlayerRecomendations)
      setRecommendations(adminPlayerRecomendations);
  }, [
    parentPlayerRecommendations,
    coachPlayerRecomendations,
    superPlayerRecomendations,
    adminPlayerRecomendations,
  ]);

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl ">
      <h2 className="pdf-print text-perfGray1 text-base font-semibold ">
        Recommendations
      </h2>
      <div className="flex flex-col gap-4 h-80 overflow-scroll">
        {recommendations ? (
          <>
            {recommendations.results.length < 1 ? (
              <NoReport />
            ) : (
              recommendations?.results.map((recommendation) => (
                <div key={recommendation.id}>
                  <p>{recommendation.metric.name}</p>
                  <p>{recommendation.name}</p>
                  <p className=" text-perfGray3 text-sm">
                    {recommendation.description}
                  </p>
                </div>
              ))
            )}
          </>
        ) : (
          <div className="w-full h-full">
            <Skeleton width={"100%"} height={"100%"} radius={"lg"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsCard;
