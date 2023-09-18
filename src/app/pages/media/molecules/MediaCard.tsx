import { Card, Text, Button, Group, Avatar } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useNavigate } from "react-router-dom";
import { TeamEvent } from "~/app/store/types/parent-types";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditEventForm from "../../SubPages/SingleTeam/Components/EditEventForm";
import { showNotification } from "@mantine/notifications";
import {
  useDeleteEventMutation,
  useUserGetTeamEventsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";

type props = {
  event: TeamEvent;
  teamId: number | string;
};

const MediaCard = ({ event, teamId }: props) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery({});

  const [userDeleteEvent] = useDeleteEventMutation();

  const { data: userGetTeamEvents, refetch: refetchUserGetTeamEvents } =
    useUserGetTeamEventsQuery({
      team_id: teamId,
    });

  const deleteEvent = (eventId: number) => {
    userDeleteEvent({ event_id: eventId })
      .then((res) => {
        showNotification({
          message: "Successfully Deleted",
          color: "green",
          title: "Done",
          styles: {
            root: {
              backgroundColor: "#27AE60",
              borderColor: "#27AE60",
              "&::before": { backgroundColor: "#fff" },
            },
            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: { color: "#fff" },
          },
        });
      })
      .catch((err) => {
        showNotification({
          message: "An error occurred while deleting the event.",
          color: "red",
          title: "Error",
          styles: {
            root: {
              backgroundColor: "#FF4136",
              borderColor: "#FF4136",
              "&::before": { backgroundColor: "#fff" },
            },
            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: { color: "#fff" },
          },
        });
      });
  };

  return (
    <Card
      shadow="sm"
      className="rounded-b-md relative"
      p={0}
      radius="md"
      withBorder
    >
      {/* @ts-ignore */}
      {!["Parent"].includes(user?.user_type) && (
        <div className="options absolute flex justify-around gap-2  top-2 right-2 z-10">
          <div className="p-1 bg-white rounded-full">
            <DeleteButton
              deleteFun={() => deleteEvent(event.id)}
              name={event.name}
              type="event"
            />
          </div>
          <div className="p-1 bg-white rounded-full">
            <EditEventForm
              team_id={JSON.stringify(teamId)}
              refetch={() => {
                refetchUserGetTeamEvents();
              }}
              event={event}
            />
          </div>
        </div>
      )}
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
          <span>{event.location}</span>
        </Text>
      </div>

      <Button
        onClick={() => navigate(`/media/${event.id}`)}
        variant="light"
        className="bg-perfBlue text-white rounded-none rounded-b-md"
        fullWidth
      >
        View Event Media
      </Button>
    </Card>
  );
};

export default MediaCard;
