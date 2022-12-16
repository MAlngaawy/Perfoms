import NoReport from "~/app/pages/reports/components/NoReport";
import { usePlayerActionsQuery } from "~/app/store/parent/parentApi";
import { useState } from "react";
import { PlayerActions } from "~/app/store/types/parent-types";
import { useCoachPlayerActionsQuery } from "~/app/store/coach/coachApi";
import { useEffect } from "react";
import { useSuperPlayerActionsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { Skeleton } from "@mantine/core";

type Props = {
  player_id: number | string | undefined;
};

const ActionsCard = ({ player_id }: Props) => {
  const [actions, setActions] = useState<PlayerActions>();

  const { data: parentPlayerActions } = usePlayerActionsQuery(
    { id: player_id },
    { skip: !player_id }
  );

  const { data: coachPlayerActions } = useCoachPlayerActionsQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  const { data: superPlayerActions } = useSuperPlayerActionsQuery(
    { player_id: player_id },
    { skip: !player_id }
  );

  useEffect(() => {
    if (parentPlayerActions) setActions(parentPlayerActions);
    if (coachPlayerActions) setActions(coachPlayerActions);
    if (superPlayerActions) setActions(superPlayerActions);
  }, [parentPlayerActions, coachPlayerActions, superPlayerActions]);

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl ">
      <h2 className="text-perfGray1 text-base font-semibold">Actions</h2>
      <div className="flex flex-col gap-4 h-80 overflow-scroll">
        {actions ? (
          <>
            {actions.results.length < 1 ? (
              <NoReport />
            ) : (
              actions?.results.map((action) => (
                <div key={action.id}>
                  <p>{action.metric.name}</p>
                  <p>{action.name}</p>
                  <p className=" text-perfGray3 text-sm">
                    {action.description}
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

export default ActionsCard;
