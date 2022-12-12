import React from "react";
import AppIcons from "~/@main/core/AppIcons";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "../../app/store/parent/parentSlice";
import { useUpcomingEventsQuery } from "~/app/store/parent/parentApi";
import NoData from "./NoData";

type Props = {};

const UpcomingEventsCard = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: upcomingEvents } = useUpcomingEventsQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam?.id }
  );

  const events = upcomingEvents?.results;

  if (!events?.length) {
    return (
      <div className="bg-white rounded-3xl h-full flex justify-center items-center">
        <NoData className="flex-col items-center" />
      </div>
    );
  }

  return (
    <div className="bg-white  p-4 rounded-3xl h-full">
      <h2 className="title text-lg text-perfGray1">Upcoming Events.</h2>
      <div className="flex flex-col gap-4 mt-4">
        {events ? (
          events.map((event) => (
            <div key={event.id} className="oneEvent flex items-center gap-2">
              <div className="image w-16 h-16">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={event.icon}
                  alt="eventImage"
                />
              </div>
              <div className="info flex flex-col gap-1">
                <h2 className="text-sm text-perfGray1">{event.name}</h2>
                <h3 className="flex items-center text-sm text-perfGray3">
                  <>
                    <span>
                      <AppIcons icon="CalculatorIcon:outline" />
                    </span>
                    {event.date}
                  </>
                </h3>
                <h3 className="text-sm text-perfGray3">{event.club.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <span className="py-10">No Events Yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
