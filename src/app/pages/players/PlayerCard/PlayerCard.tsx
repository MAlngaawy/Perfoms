import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mantine/core";

interface PlayersProps {
  id: number;
  name: string;
  icon_url: string;
}

const PlayerCard = (card: PlayersProps) => {
  const navigate = useNavigate();

  console.log("card", card);

  return (
    <div
      className="shadow-xl flex flex-col justify-center items-center rounded-md hover:cursor-pointer"
      key={card.id}
      onClick={() => navigate(`${card.id}`)}
    >
      <Avatar
        className="object-cover rounded-md"
        src={card.icon_url}
        alt={card.name}
        size="xl"
      />
      <p className="text-center p-2 font-medium text-sm">{card.name}</p>
    </div>
  );
};

export default PlayerCard;
