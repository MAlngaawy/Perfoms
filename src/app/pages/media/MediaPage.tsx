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
import Placeholders from "~/@main/components/Placeholders";
import { useAdminTeamEventsQuery } from "~/app/store/clubManager/clubManagerApi";
import AddEventForm from "../SubPages/SingleTeam/Components/AddEventForm";

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
  const { data: superEvents, refetch: superRefetch } = useSuprtEventsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam || user?.user_type !== "Supervisor" }
  );

  const { data: adminEvents, refetch: adminRefetch } = useAdminTeamEventsQuery(
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
      <div className="relative">
        {events && events.results.length > 0 ? (
          events ? (
            <div className="flex flex-col xs:flex-row xs:items-center flex-wrap gap-2 my-4">
              {events.results.map((data) => {
                return <MediaCard key={data.id} event={data} />;
              })}
              {user?.user_type === "Supervisor" ||
              user?.user_type === "Admin" ? (
                <AddEventForm
                  teamID={JSON.stringify(
                    selectedPlayerTeam && selectedPlayerTeam.id
                  )}
                  refetch={() => {
                    if (superEvents) superRefetch();
                    if (adminEvents) adminRefetch();
                  }}
                >
                  <button className=" w-60 h-full bg-slate-300 text-perfGray3 rounded-xl p-4">
                    + Add Event
                  </button>
                </AddEventForm>
              ) : (
                ""
              )}
            </div>
          ) : (
            <MediaPageLoading />
          )
        ) : (
          <div className="flex justify-center flex-col items-center gap-4 my-4">
            <Placeholders
              img="/assets/images/novideo.png"
              preText={"No"}
              pageName={"events"}
              postText={
                "here yet, come again later OR choose another team or click the button below to add event in this team."
              }
            />
            {user?.user_type === "Supervisor" || user?.user_type === "Admin" ? (
              <AddEventForm
                teamID={JSON.stringify(
                  selectedPlayerTeam && selectedPlayerTeam.id
                )}
                refetch={() => {
                  if (superEvents) superRefetch();
                  if (adminEvents) adminRefetch();
                }}
              >
                <button className=" w-60 h-full bg-slate-300 text-perfGray3 rounded-xl p-4">
                  + Add Event
                </button>
              </AddEventForm>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
