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

  return (
    <div
      className="md:w-28 shadow-xl rounded-md hover:cursor-pointer"
      key={card.id}
      onClick={() => navigate(`${card.id}`, { state: { id: card.id } })}
    >
      <Avatar
        className="md:w-28 md:h-28 object-cover rounded-md"
        src={card.icon_url}
        alt={card.name}
      />
      <p className="text-center p-2 font-medium text-sm">{card.name}</p>
    </div>
  );
};

export default PlayerCard;
