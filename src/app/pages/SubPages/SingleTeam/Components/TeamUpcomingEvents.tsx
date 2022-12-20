import AppIcons from "../../../../../@main/core/AppIcons";
import DeleteButton from "../../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";
import {
  useSuperDeleteEventMutation,
  useSuperTeamEventsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { TeamEvents } from "~/app/store/types/parent-types";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useAdminDeleteEventMutation,
  useAdminTeamEventsQuery,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {
  teamId: string;
};

const TeamUpcomingEvents = ({ teamId }: Props) => {
  const [events, setEvents] = useState<TeamEvents>();
  const { data: user } = useUserQuery({});

  const { data: superEvents, refetch: superRefetch } = useSuperTeamEventsQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  const { data: adminEvents, refetch: adminRefetch } = useAdminTeamEventsQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  useEffect(() => {
    if (superEvents) setEvents(superEvents);
    if (adminEvents) setEvents(adminEvents);
  }, [superEvents, adminEvents]);

  const [superDeleteEvent] = useSuperDeleteEventMutation();
  const [adminDeleteEvent] = useAdminDeleteEventMutation();

  const deleteEvent = (eventId: number) => {
    if (user?.user_type === "Supervisor") {
      superDeleteEvent({ event_id: eventId }).then((res) => {
        showNotification({
          message: "Successfly Deleted",
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
            closeButton: {
              color: "#fff",
            },
          },
        });
      });
    } else if (user?.user_type === "Admin") {
      adminDeleteEvent({ event_id: eventId }).then((res) => {
        showNotification({
          message: "Successfly Deleted",
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
            closeButton: {
              color: "#fff",
            },
          },
        });
      });
    }
  };

  return (
    <div>
      <h2>Team Events</h2>
      <div className="flex flex-col mt-4 gap-2 max-h-72 overflow-scroll">
        {events &&
          events.results.map((event) => (
            <div className="flex justify-between p-1 rounded-lg hover:bg-pagesBg">
              <div className="oneEvent flex items-center gap-2">
                <div className="image w-16 h-16">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={
                      event.icon ||
                      "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?b=1&s=170667a&w=0&k=20&c=sIYGXpHmosAYKg8B2NqkRWcQOBP-CdqJDE36zZv7I94="
                    }
                    alt="eventImage"
                  />
                </div>
                <div className="info flex flex-col gap-1">
                  <h2 className="text-sm text-perfGray1">{event.name}</h2>
                  <h3 className="flex items-center text-sm text-perfGray3">
                    <>
                      <span>
                        <AppIcons
                          className="w-4 h-4 text-perfGray3"
                          icon="CalendarIcon:outline"
                        />
                      </span>
                      <span>{event.date}</span>
                    </>
                  </h3>
                  <h3 className="text-sm text-perfGray3">{event.club.name}</h3>
                </div>
              </div>

              <div className="options flex flex-col justify-around">
                <DeleteButton
                  deleteFun={() => deleteEvent(event.id)}
                  name={event.name}
                  type="event"
                />
                <EditEventForm
                  refetch={() => {
                    if (superEvents) superRefetch();
                    if (adminEvents) adminRefetch();
                  }}
                  event={event}
                />
              </div>
            </div>
          ))}
      </div>
      <AddEventForm
        refetch={() => {
          if (superEvents) superRefetch();
          if (adminEvents) adminRefetch();
        }}
      />
    </div>
  );
};

export default TeamUpcomingEvents;
