import React, { useState } from "react";
import MediaCard from "./molecules/MediaCard";

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
      <div className="flex flex-col xs:flex-row justify-center xs:items-center flex-wrap gap-2 m-1">
        {events.map((data) => {
          return <MediaCard key={data.id} {...data} />;
        })}
      </div>
    </div>
  );
};

export default MediaPage;
