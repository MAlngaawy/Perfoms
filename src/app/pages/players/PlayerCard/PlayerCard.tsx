import React from "react";
import { Link } from "react-router-dom";

interface PlayersProps {
  id: number;
  name: string;
  icon_url: string;
}

const PlayerCard = (card: PlayersProps) => {
  return (
    <Link to={`${card.id}`}>
      <div className="md:w-28 shadow-xl rounded-md" key={card.id}>
        <img
          className="md:w-28 md:h-28 object-cover rounded-md"
          src={card.icon_url}
          alt={card.name}
        />
        <p className="text-center p-2 font-medium text-sm">{card.name}</p>
      </div>
    </Link>
  );
};

export default PlayerCard;
