import React from "react";
import { Card, Image, Text, Badge, Button, Group, Avatar } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TeamEvent } from "~/app/store/types/parent-types";

type props = {
  event: TeamEvent;
};

const MediaCard = ({ event }: props) => {
  const navigate = useNavigate();

  return (
    <Card shadow="sm" className="rounded-b-xl" p={0} radius="md" withBorder>
      <Card.Section component="a">
        <Avatar
          src={event.icon_url}
          className="w-64 h-56 min-w-full object-cover"
          alt="Norway"
        />
      </Card.Section>
      <div className="flex flex-col gap-2 my-2">
        <Group position="apart" className="mx-4">
          <Text weight={500} className="text-perfLightBlack">
            {event.name}
          </Text>
        </Group>

        <Text
          size="sm"
          className="mx-4 flex items-center gap-2 "
          color="dimmed"
        >
          <AppIcons
            className="w-5 text-perfGray2"
            icon="CalendarIcon:outline"
          />{" "}
          <span>{event.date}</span>
        </Text>

        <Text size="sm" className="mx-4 flex items-center gap-2" color="dimmed">
          <AppIcons className="w-5 text-perfGray2" icon="MapIcon:outline" />
          <span>{event.club.name}</span>
        </Text>
      </div>

      <Button
        onClick={() => navigate(`/media/${event.id}`)}
        variant="light"
        className="bg-perfBlue text-white rounded-b-xl"
        fullWidth
      >
        View full Profile
      </Button>
    </Card>
  );
};

export default MediaCard;
