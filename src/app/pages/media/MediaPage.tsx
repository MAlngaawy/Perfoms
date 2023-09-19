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
import {
  useAdminTeamEventsQuery,
  useAdminSportsQuery,
  useAdminTeamsStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AddEventForm from "../SubPages/SingleTeam/Components/AddEventForm";
import { Select } from "@mantine/core";

const MediaPage = () => {
  const [events, setEvents] = useState<TeamEvents | undefined>();
  const { data: user } = useUserQuery(null);

  const [selectedSport, setSelectedSport] = useState<string>("0");
  const [selectedTeam, setSelectedTeam] = useState<string>("0");

  const [teamId, setTeamId] = useState<string>();

  const { data: adminSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { data: sportTeams } = useAdminTeamsStatisticsQuery(
    { sport_id: selectedSport },
    { skip: [null, "0"].includes(selectedSport) }
  );

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

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
    { team_id: selectedTeam },
    { skip: user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (user?.user_type === "Admin") {
      setTeamId(selectedTeam);
    } else {
      setTeamId(JSON.stringify(selectedPlayerTeam?.id));
    }

    if (superEvents) setEvents(superEvents);
    if (coachEvents) setEvents(coachEvents);
    if (parentEvents) setEvents(parentEvents);
    if (adminEvents) setEvents(adminEvents);
  }, [
    setEvents,
    superEvents,
    coachEvents,
    parentEvents,
    adminEvents,
    selectedTeam,
    selectedPlayerTeam,
  ]);

  return (
    <div className="container w-11/12 mx-auto">
      <div className=" text-xs sm:text-sm my-4 flex gap-2 justify-end items-center">
        {events &&
        events?.results.length > 0 &&
        //@ts-ignore
        ["Supervisor", "Admin"].includes(user?.user_type) ? (
          <AddEventForm
            teamID={JSON.stringify(selectedPlayerTeam && selectedPlayerTeam.id)}
            refetch={() => {
              if (superEvents) superRefetch();
              if (adminEvents) adminRefetch();
            }}
          >
            <button className=" px-4 py-2 bg-slate-300 text-perfGray3 rounded-full">
              + Add Event
            </button>
          </AddEventForm>
        ) : (
          ""
        )}

        {user?.user_type === "Admin" ? (
          <div className="flex gap-2">
            {/* Select Sport To Filter teams chooices */}
            <Select
              placeholder="Pick Sport"
              value={selectedSport}
              onChange={(v: string) => {
                setSelectedSport(v);
                setEvents(undefined);
                setSelectedTeam("0");
              }}
              data={
                adminSports
                  ? adminSports.results.map((sport) => {
                      return {
                        value: JSON.stringify(sport.id),
                        label: sport.name,
                      };
                    })
                  : ["No Sports"]
              }
            />

            {/* Select Team to filter events */}
            <Select
              placeholder="Pick Team"
              value={selectedTeam}
              //@ts-ignore
              onChange={setSelectedTeam}
              data={
                sportTeams
                  ? sportTeams.results.map((team) => {
                      return {
                        value: JSON.stringify(team.id),
                        label: team.name,
                      };
                    })
                  : ["No Teams"]
              }
            />
          </div>
        ) : (
          <TeamFilter />
        )}
      </div>
      <div className="relative">
        {events && events.results.length > 0 ? (
          events ? (
            <div className="flex flex-col xs:flex-row xs:items-center flex-wrap gap-2 my-4">
              {events.results.map((data) => {
                return (
                  <MediaCard
                    teamId={selectedTeam || selectedPlayerTeam.id}
                    key={data.id}
                    event={data}
                  />
                );
              })}
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
              postText={"here yet, come again later OR choose another team."}
            />
            {["Supervisor", "Admin"].includes(user?.user_type || "No User") ? (
              <AddEventForm
                teamID={teamId}
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
