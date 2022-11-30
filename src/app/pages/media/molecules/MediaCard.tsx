import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
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
    <Card
      shadow="sm"
      className="rounded-b-xl h-80"
      p={0}
      radius="md"
      withBorder
    >
      <Card.Section component="a">
        <Image src={event.icon_url} height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" className="mx-4" mt="md" mb="xs">
        <Text weight={500}>{event.name}</Text>
      </Group>

      <Text size="sm" className="mx-4" color="dimmed">
        <AppIcons className="w-5 inline mb-4" icon="CalendarIcon:outline" />{" "}
        {event.date}
      </Text>

      <Text size="sm" className="mx-4" color="dimmed">
        <AppIcons className="w-5 inline mb-4" icon="MapIcon:outline" />
        {event.club.name}
      </Text>

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
