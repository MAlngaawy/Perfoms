import { Avatar } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  image: string;
  name: string;
  sport: string;
  education: string;
  teams: string[];
  id: number;
  notSelected: boolean;
};

const ConnectedUserInfo = ({
  image,
  name,
  sport,
  education,
  teams,
  id,
  notSelected,
}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {notSelected ? (
        <div className="bg-white text-center p-4 flex justify-center items-center rounded-xl h-full">
          <h2>Choose User</h2>
        </div>
      ) : (
        <div className="bg-white text-center p-4 flex flex-col justify-center items-center gap-6 rounded-xl h-full">
          <Avatar src={image} size={100} />
          <div className="">
            <h2 className="text-xl text-perfGray1">{name}</h2>
            <h4 className="text-xs text-perfBlue font-bold">{sport} Coach</h4>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-base">Education</h2>
            <p className="text-xs text-perfGray3">{education}</p>
          </div>
          <div>
            <h2>Teams</h2>
            {teams.map((team) => (
              <p className="text-xs text-perfGray3">{team}</p>
            ))}
          </div>
          <button
            className="text-perfBlue border border-perfBlue rounded-xl bg-transparent px-4 py-2 text-sm"
            onClick={() => navigate(`coaches/${id}`)}
          >
            View full profile
          </button>
        </div>
      )}
    </>
  );
};

export default ConnectedUserInfo;
