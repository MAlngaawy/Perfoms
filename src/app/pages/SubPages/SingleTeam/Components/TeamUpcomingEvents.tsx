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
import AppUtils from "~/@main/utils/AppUtils";
import { useParams } from "react-router-dom";
import { useCoachTeamEventQuery } from "~/app/store/coach/coachApi";

type Props = {};

const TeamUpcomingEvents = () => {
  const { team_id } = useParams();
  const [events, setEvents] = useState<TeamEvents>();
  const { data: user } = useUserQuery({});

  const { data: superEvents, refetch: superRefetch } = useSuperTeamEventsQuery(
    { team_id },
    { skip: !team_id }
  );

  const { data: adminEvents, refetch: adminRefetch } = useAdminTeamEventsQuery(
    { team_id },
    { skip: !team_id }
  );

  const { data: coachEvents, refetch: caochRefecth } = useCoachTeamEventQuery(
    { team_id },
    { skip: !team_id }
  );

  useEffect(() => {
    if (superEvents) setEvents(superEvents);
    if (adminEvents) setEvents(adminEvents);
  }, [superEvents, adminEvents]);

  const [superDeleteEvent] = useSuperDeleteEventMutation();
  const [adminDeleteEvent] = useAdminDeleteEventMutation();
  const deleteEvent = async (eventId: number) => {
    let deleteFn: any = superDeleteEvent;
    if (user?.user_type === "Admin") {
      deleteFn = adminDeleteEvent;
    }

    try {
      const res = await deleteFn({ event_id: eventId });
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Successfully Deleted Experience"
      );
    } catch (err) {
      // handle error
    }
  };

  return (
    <div>
      <h2>Team Events</h2>
      <div className="flex flex-col mt-4 gap-2 max-h-72 overflow-scroll">
        {events &&
          events.results.map((event) => (
            <div
              key={event.id}
              className="flex justify-between p-1 rounded-lg hover:bg-pagesBg"
            >
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
                  <h3 className="text-sm text-perfGray3">
                    {event.location || "No Location"}
                  </h3>
                </div>
              </div>

              <div className="options flex flex-col justify-around">
                <DeleteButton
                  deleteFun={() => deleteEvent(event.id)}
                  name={event.name}
                  type="event"
                />
                <EditEventForm
                  team_id={team_id}
                  refetch={() => {
                    switch (user?.user_type) {
                      case "Coach":
                        return caochRefecth();
                      case "Admin":
                        return adminRefetch();
                      case "Supervisor":
                        return superRefetch();
                    }
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
      >
        <button className="px-6 py-2 my-2 bg-slate-300 text-perfGray3 rounded-3xl">
          + Add Event
        </button>
      </AddEventForm>
    </div>
  );
};

export default TeamUpcomingEvents;
