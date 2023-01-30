import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTeamEventsQuery } from "~/app/store/parent/parentApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import MediaCard from "./molecules/MediaCard";
import TeamFilter from "~/@main/components/TeamFilter";
import MediaPageLoading from "./molecules/MediaPageLoading";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamEvents } from "~/app/store/types/parent-types";
import { useCoachTeamEventQuery } from "~/app/store/coach/coachApi";
import { useSuprtEventsQuery } from "~/app/store/supervisor/supervisorMainApi";
import NoEventsComp from "~/@main/components/NoEventsComp";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import Placeholders from "~/@main/components/Placeholders";
import { useAdminTeamEventsQuery } from "~/app/store/clubManager/clubManagerApi";

const MediaPage = () => {
  const [events, setEvents] = useState<TeamEvents | undefined>();

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: user } = useUserQuery(null);

  const { data: parentEvents } = useTeamEventsQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Parent" }
  );

  const { data: coachEvents } = useCoachTeamEventQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Coach" }
  );
  const { data: superEvents } = useSuprtEventsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
  );

  const { data: adminEvents } = useAdminTeamEventsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (superEvents) setEvents(superEvents);
    if (coachEvents) setEvents(coachEvents);
    if (parentEvents) setEvents(parentEvents);
    if (adminEvents) setEvents(adminEvents);
  }, [
    setEvents,
    superEvents,
    coachEvents,
    parentEvents,
    selectedPlayerTeam,
    adminEvents,
  ]);
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4 flex justify-end items-center">
        <TeamFilter />
      </div>
      <>
        {events && events.results.length > 0 ? (
          events ? (
            <div className="flex flex-col xs:flex-row xs:items-center flex-wrap gap-2 my-4">
              {events.results.map((data) => {
                return <MediaCard key={data.id} event={data} />;
              })}
            </div>
          ) : (
            <MediaPageLoading />
          )
        ) : (
          <Placeholders
            img="/assets/images/novideo.png"
            preText={"No"}
            pageName={"events"}
            postText={"here yet, come again later OR choose another team."}
          />
        )}
      </>
    </div>
  );
};

export default MediaPage;
