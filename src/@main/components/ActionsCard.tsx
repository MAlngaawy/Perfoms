import NoReport from "~/app/pages/reports/components/NoReport";
import { usePlayerActionsQuery } from "~/app/store/parent/parentApi";
import { useState } from "react";
import { PlayerActions } from "~/app/store/types/parent-types";
import { useCoachPlayerActionsQuery } from "~/app/store/coach/coachApi";
import { useEffect } from "react";
import { useSuperPlayerActionsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { Skeleton } from "@mantine/core";
import { useAdminPlayerActionsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { timeFilterFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";

type Props = {
  player_id: number | string | undefined;
};

const ActionsCard = ({ player_id }: Props) => {
  const timeFilter = useSelector(timeFilterFn);
  const [actions, setActions] = useState<PlayerActions>();
  const { data: user } = useUserQuery({});

  const { data: parentPlayerActions } = usePlayerActionsQuery(
    {
      id: player_id,
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

  const { data: coachPlayerActions } = useCoachPlayerActionsQuery(
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
        user?.user_type !== "Coach",
    }
  );

  const { data: superPlayerActions } = useSuperPlayerActionsQuery(
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
        user?.user_type !== "Supervisor",
    }
  );

  const { data: adminPlayerActions } = useAdminPlayerActionsQuery(
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
        user?.user_type !== "Admin",
    }
  );

  useEffect(() => {
    if (parentPlayerActions) setActions(parentPlayerActions);
    if (coachPlayerActions) setActions(coachPlayerActions);
    if (superPlayerActions) setActions(superPlayerActions);
    if (adminPlayerActions) setActions(adminPlayerActions);
  }, [
    parentPlayerActions,
    coachPlayerActions,
    superPlayerActions,
    adminPlayerActions,
  ]);

  return (
    <div className="flex flex-col p-6 bg-white gap-1 rounded-3xl ">
      <h2 className="text-perfGray1 text-base font-semibold">Actions</h2>
      <div className="pdf-print flex flex-col gap-4 h-80 overflow-scroll">
        {actions ? (
          <>
            {actions.results.length < 1 ? (
              <NoReport />
            ) : (
              actions?.results.map((action) => (
                <div key={action.id}>
                  <p title="Kpi name" className="font-bold">
                    &#x2022;
                    {action.metric.name}
                  </p>
                  <p title="Action title" className="text-perfGray3">
                    {action.name}
                  </p>
                  <p title="Action description" className="text-sm">
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
