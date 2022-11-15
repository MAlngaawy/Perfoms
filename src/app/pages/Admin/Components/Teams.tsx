import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./SubComponents/DeleteButton";
import TeamCard from "./SubComponents/TeamCard";
import AddTeamCardForm from "../Components/SubComponents/AddTeamCardForm";

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
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-6 sm:m-6 p-2 sm:p-6">
      {data.map((team, index) => {
        return <TeamCard key={index} team={team} />;
      })}
      <AddTeamCardForm />
    </div>
  );
};

export default Teams;
