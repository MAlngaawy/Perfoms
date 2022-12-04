import { usePlayerRecommendationsQuery } from "~/app/store/parent/parentApi";

type Props = {
  player_id: number;
};

const RecommendationsCard = ({ player_id }: Props) => {
  const { data: recommendations } = usePlayerRecommendationsQuery(
    { id: player_id },
    { skip: !player_id }
  );

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl h-80 overflow-scroll">
      <h2 className="text-perfGray1 text-base font-semibold ">
        Recommendations
      </h2>
      <div className="flex flex-col gap-4">
        {recommendations?.results.map((recommendation) => (
          <div key={recommendation.id}>
            <p>{recommendation.metric.name}</p>
            <p>{recommendation.name}</p>
            <p className=" text-perfGray3 text-sm">
              {recommendation.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCard;
