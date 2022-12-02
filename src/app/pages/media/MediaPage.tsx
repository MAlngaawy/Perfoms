import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useTeamCoachesQuery,
  useTeamEventsQuery,
} from "~/app/store/parent/parentApi";
import { selectedPlayerTeamFn } from "~/app/store/parent/parentSlice";
import MediaCard from "./molecules/MediaCard";
import TeamFilter from "~/@main/components/TeamFilter";
import MediaPageLoading from "./molecules/MediaPageLoading";

const dummyData = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    header: "Kickboxing -under 12",
    date: "Sunday, 15/SEP",
    place: "Al - ahly club",
  },
];

const MediaPage = () => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: teamEvents } = useTeamEventsQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const { data: playerCoaches, isLoading } = useTeamCoachesQuery(
    { teamId: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const [opened, setOpened] = useState(false);
  const [events, setEvents] = useState(dummyData);

  const handleClick = () => {
    setOpened(false);
    setEvents([
      ...events,
      {
        id: events.length,
        img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
        header: "Kickboxing -under 12",
        date: "Sunday, 15/SEP",
        place: "Al - ahly club",
      },
    ]);
  };

  return (
    <div>
      <div className="flex justify-end m-2">
        <TeamFilter />
      </div>
      {teamEvents ? (
        <div className="flex flex-col xs:flex-row xs:items-center flex-wrap gap-2 m-4">
          {teamEvents.results.map((data) => {
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
