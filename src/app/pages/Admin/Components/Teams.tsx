import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./SubComponents/DeleteButton";
import TeamCard from "./SubComponents/TeamCard";

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
        return <TeamCard key={index} team={team} />;
      })}
    </div>
  );
};

export default Teams;
