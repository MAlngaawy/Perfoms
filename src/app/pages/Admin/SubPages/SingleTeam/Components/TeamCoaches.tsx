import { Avatar } from "@mantine/core";
import React from "react";
import { Url } from "url";
import DeleteButton from "../../../Components/SubComponents/DeleteButton";

type Props = {
  coaches: {
    image: string;
    name: string;
    id: number;
  }[];
};

const TeamCoaches = ({ coaches }: Props) => {
  return (
    <div>
      <h2>Team Choaches</h2>
      <div className="flex flex-col gap-2 mt-6">
        {coaches.map((coach) => (
          <div className="flex justify-between items-center p-1">
            <div className="coach-data flex gap-2 cursor-pointer">
              <Avatar src={coach.image} size="sm" radius={"xl"} />
              <h3 className="text-base text-perfGray2">{coach.name}</h3>
            </div>
            <DeleteButton type="Coach" name={coach.name} id={coach.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCoaches;
