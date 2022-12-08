import { Avatar } from "@mantine/core";
import React from "react";
import Info from "~/@main/components/Info";

type Props = {};

const TeamInfoCard = (props: Props) => {
  return (
    <div className="teamInfoCard bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
      <h2>Team Info</h2>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <Avatar
            src={"https://cdn-icons-png.flaticon.com/512/3903/3903982.png"}
            size="xl"
          />
          <div className="flex flex-col ">
            <Info label="name" value="Team 17th" />
            <Info label="Age" value="14 - 17 years" />
          </div>
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Sport" value="Taekwondo" />
          <Info label="Gender" value="Male" />
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Rating schedule" value="Every month" />
          <Info label="Players" value="24 player" />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
