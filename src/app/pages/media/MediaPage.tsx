import React, { useState } from "react";
import FirstNav from "~/@main/components/FirstNav";
import SecondNav from "../home/organisms/SecondNav";
import MediaCard from "./molecules/MediaCard";
import { players } from "../home/HomePage";
import AppIcons from "~/@main/core/AppIcons";
import { Modal } from "@mantine/core";
import { Dropdown } from "~/@main/components/Dropdown";
import { Button } from "~/@main/components/Button";

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

const user_type = "Parent";

const MediaPage = () => {
  const [opened, setOpened] = useState(false);
  const [select, setSeleced] = useState("Event Name");
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
        {user_type === "Parent" && (
          <button
            onClick={() => setOpened(true)}
            className="rounded-xl flex justify-center items-center flex-col bg-perfLightGray hover:shadow-xl shadow self-stretch xs:w-52 px-1 box-content h-80"
          >
            <AppIcons className="w-12 text-perfGray3" icon="PlusIcon:outline" />{" "}
            <span className="text-lg font-medium text-perfGray3">
              Add event
            </span>
          </button>
        )}
      </div>
      <Modal
        sx={{
          ".mantine-Modal-modal": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        withCloseButton={false}
        radius="xl"
        padding="xl"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Dropdown
          selected={select}
          setSelected={setSeleced}
          values={["Event1", "Event2"]}
          className="w-96 text-lg font-medium flex-row justify-between"
        />
        <div className="border w-80 mx-auto mt-5" />
        <Button
          label="Add Media"
          onClick={handleClick}
          style="primary"
          className="w-full h-12 mt-10 rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default MediaPage;
