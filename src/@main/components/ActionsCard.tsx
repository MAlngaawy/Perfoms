import { usePlayerActionsQuery } from "~/app/store/parent/parentApi";

type Props = {
  player_id: number;
};

const ActionsCard = ({ player_id }: Props) => {
  const { data: actions } = usePlayerActionsQuery(
    { id: player_id },
    { skip: !player_id }
  );

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl h-80 overflow-scroll">
      <h2 className="text-perfGray1 text-base font-semibold">Actions</h2>
      <div className="flex flex-col gap-4">
        {actions?.results.map((action) => (
          <div key={action.id}>
            <p>{action.metric.name}</p>
            <p>{action.name}</p>
            <p className=" text-perfGray3 text-sm">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionsCard;
