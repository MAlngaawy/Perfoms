import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./SubComponents/DeleteButton";

type Props = {
  data: {
    id: number;
    icon: string;
    name: string;
    sport: string;
    age: { from: number; to: number };
    players: number;
  }[];
};

const Teams = ({ data }: Props) => {
  return (
    <div className="admin-teams flex items-center gap-6 m-6 p-6">
      {data.map((team, index) => {
        return (
          <div
            key={index}
            className="team-card relative w-72 bg-white p-8 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <Link
              to={`teams/${team.id}`}
              className="bg-pagesBg rounded-full w-32 h-32 flex justify-center items-center"
            >
              <img className="w-4/5" src={team.icon} alt="icon" />
            </Link>

            <h2 className="text-xl font-semibold text-perfGray1">
              {team.name}
            </h2>
            <h3 className="text-xl text-perfBlue">{team.sport}</h3>

            <div className="flex justify-around items-center w-full">
              <div className="age flex flex-col">
                <span className=" text-sm text-perfGray3">Age</span>
                <span className="text-xl text-perfGray1">
                  {team.age.from} - {team.age.to}
                </span>
              </div>
              <div className="players flex flex-col">
                <span className=" text-sm text-perfGray3">Players</span>
                <span className="text-xl text-perfGray1">{team.players}</span>
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex absolute right-5 top-5">
              <DeleteButton teamName={team.name} teamId={team.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;
