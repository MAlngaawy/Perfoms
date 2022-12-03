import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useTeamCoachesQuery,
  useTeamEventsQuery,
} from "~/app/store/parent/parentApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import MediaCard from "./molecules/MediaCard";
import TeamFilter from "~/@main/components/TeamFilter";
import MediaPageLoading from "./molecules/MediaPageLoading";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamEvents } from "~/app/store/types/parent-types";
import { useCoachTeamEventQuery } from "~/app/store/coach/coachApi";
import { useSuprtEventsQuery } from "~/app/store/supervisor/supervisorMainApi";

const MediaPage = () => {
  const [events, setEvents] = useState<TeamEvents | undefined>();

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: user } = useUserQuery(null);
  console.log(user);

  const { data: parentEvents } = useTeamEventsQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam && user?.user_type !== "Parent" }
  );

  const { data: coachEvents } = useCoachTeamEventQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam && user?.user_type !== "Coach" }
  );
  const { data: superEvents } = useSuprtEventsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam && user?.user_type !== "Supervisor" }
  );

  useEffect(() => {
    if (superEvents) setEvents(superEvents);
    if (coachEvents) setEvents(coachEvents);
    if (parentEvents) setEvents(parentEvents);
  }, [setEvents, superEvents, coachEvents, parentEvents]);

  return (
    <div>
      <div className="flex justify-end m-2">
        <TeamFilter />
      </div>
      {events ? (
        <div className="flex flex-col xs:flex-row xs:items-center flex-wrap gap-2 m-4">
          {events.results.map((data) => {
            return <MediaCard key={data.id} event={data} />;
          })}
        </div>
      ) : (
        <MediaPageLoading />
      )}
    </div>
  );
};

export default MediaPage;
