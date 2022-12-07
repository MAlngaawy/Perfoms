import AppIcons from "../../../../../@main/core/AppIcons";
import DeleteButton from "../../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";
import { useSuperTeamEventsQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  teamId: string;
};

const TeamUpcomingEvents = ({ teamId }: Props) => {
  const { data: events } = useSuperTeamEventsQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  return (
    <div>
      <h2>Team Events</h2>
      <div className="flex flex-col mt-4 gap-2 h-72 overflow-scroll">
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
                <DeleteButton id={event.id} name={event.name} type="event" />
                <EditEventForm event={event} />
              </div>
            </div>
          ))}
      </div>
      <AddEventForm />
    </div>
  );
};

export default TeamUpcomingEvents;
