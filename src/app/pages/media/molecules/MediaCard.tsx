import { Card, Text, Button, Group, Avatar } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useNavigate } from "react-router-dom";
import { TeamEvent } from "~/app/store/types/parent-types";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditEventForm from "../../SubPages/SingleTeam/Components/EditEventForm";
import { showNotification } from "@mantine/notifications";
import {
  useSuperDeleteEventMutation,
  useSuperTeamEventsQuery,
  useSuprtEventsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeleteEventMutation,
  useAdminTeamEventsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";

type props = {
  event: TeamEvent;
  teamId: number | string;
};

const MediaCard = ({ event, teamId }: props) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery({});

  const [superDeleteEvent] = useSuperDeleteEventMutation();
  const [adminDeleteEvent] = useAdminDeleteEventMutation();

  const { data: superEvents, refetch: superRefetch } = useSuprtEventsQuery(
    { team_id: +teamId },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );

  const { data: adminEvents, refetch: adminRefetch } = useAdminTeamEventsQuery(
    { team_id: teamId },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  const deleteEvent = async (eventId: number) => {
    let deleteFn: any = superDeleteEvent;
    if (user?.user_type === "Admin") {
      deleteFn = adminDeleteEvent;
    }

    try {
      const res = await deleteFn({ event_id: eventId });
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
    } catch (err) {
      // handle error
    }
  };

  return (
    <Card
      shadow="sm"
      className="rounded-b-md relative"
      p={0}
      radius="md"
      withBorder
    >
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
              if (superEvents) superRefetch();
              if (adminEvents) adminRefetch();
            }}
            event={event}
          />
        </div>
      </div>
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
