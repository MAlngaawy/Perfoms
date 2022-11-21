import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Info from "~/@main/components/Info";

interface ParentInfoCardProps {
  id: number;
  icon_url: string;
  name: string;
  dob: string;
  players: string;
}

const ParentInfoCard = (parent: ParentInfoCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);

  return (
    <div className="p-4 m-1 md:m-3 md:h-76 bg-white rounded-3xl flex flex-col items-center md:items-start gap-1">
      <div>
        <div className="playerName">
          <h2>Parent's info</h2>
        </div>
        <div className="img my-2">
          <img
            onClick={() => {
              navigate(`parent`, { state: { id: location.state.id } });
            }}
            src={
              parent?.icon_url
                ? parent?.icon_url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="w-24 h-24 rounded-lg object-cover hover:cursor-pointer"
            alt="player_image"
          />
        </div>
      </div>
      <div className="infos">
        <Info label="Name" value={parent?.name} />
        <Info label="Age" value={parent?.dob} />
        <Info label="Players" value={parent?.players} />
      </div>
    </div>
  );
};

export default ParentInfoCard;
