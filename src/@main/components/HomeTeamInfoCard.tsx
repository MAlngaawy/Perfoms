import React from "react";
import { selectedPlayerTeamFn } from "../../app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { useTeamInfoQuery } from "~/app/store/parent/parentApi";
import { Avatar } from "@mantine/core";
import NoData from "./NoData";

type Props = {};

const HomeTeamInfoCard = (props: Props) => {
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: teamInfoData } = useTeamInfoQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  if (!teamInfoData) {
    return (
      <div className="p-6 h-full bg-white rounded-3xl flex justify-center items-center ">
        <NoData className="flex-col text-center" />
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-3xl h-full">
      <h2 className="title text-lg text-perfGray1">Team Info.</h2>
      <div className="flex justify-between mt-4 px-2">
        <div className="left flex flex-col gap-3 text-perfGray1 flex-wrap">
          <div className="team flex flex-col gap-1">
            <h2 className="text-base font-semibold">{teamInfoData?.name}</h2>
            <h3 className=" text-perfBlue font-semibold text-sm">
              {teamInfoData?.sport ? teamInfoData?.sport : "Sport"}
            </h3>
          </div>
          <div className="age flex flex-col">
            <p className=" text-perfGray3 text-sm font-normal">Age</p>
            <h2 className=" text-perfGray1 text-base font-normal">
              {teamInfoData?.from_age + "-" + teamInfoData?.to_age}
            </h2>
          </div>
          <div className="geder flex flex-col">
            <p className=" text-perfGray3 text-sm font-normal">Gender</p>
            <h2 className=" text-perfGray1 text-base font-normal">
              {teamInfoData?.gender
                ? teamInfoData.gender === "M"
                  ? "Male"
                  : "Female"
                : "Gender"}
              {}
            </h2>
          </div>
          <div className="geder flex flex-col">
            <p className=" text-perfGray3 text-sm font-normal">Players</p>
            <h2 className=" text-perfGray1 text-base font-normal">
              {teamInfoData?.players_count}
            </h2>
          </div>
          <div className="geder flex flex-col">
            <p className=" text-perfGray3 text-sm font-normal">
              Rating schedule
            </p>
            <h2 className=" text-perfGray1 text-base font-normal">
              Every {teamInfoData?.rate_per ? teamInfoData?.rate_per : "(N/A)"}
            </h2>
          </div>
        </div>
        <div className="right flex flex-col gap-5">
          <h2 className="mb-2">Coaches</h2>
          {teamInfoData?.coaches.map((coach) => (
            <div key={coach.id} className="coach flex items-center gap-2">
              <Avatar
                size={"sm"}
                radius="xl"
                src={coach.avatar}
                alt="coach_Avatar"
              />
              <h2 className="name text-base">
                {coach.first_name + " " + coach.last_name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTeamInfoCard;
