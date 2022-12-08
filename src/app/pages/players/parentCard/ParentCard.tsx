import React from "react";
import Info from "~/@main/components/Info";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerData } from "~/app/store/types/user-types";
import { useUserQuery } from "~/app/store/user/userApi";

const playerData: PlayerData = {
  name: "Ahmed Saleh Mostafa",
  dob: "15/12/2006",
  weight: 50,
  height: 150,
  icon_url:
    "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  sport: {
    name: "kickboxing",
  },
  team: {
    name: "14Th team",
    description: "12-14 years",
    coaches: [
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
    ],
  },
  gender: "M",
};

export const parentDummyData = {
  parentName: "Ahmed Salah Mustafa",
  icon_url:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  dob: "15/12/2006",
  job: "Engineer",
  players: "2",
  subscription: "Golden",
  playersDetails: [
    {
      id: 1,
      name: "Ahmed Salah",
      icon_url:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      id: 2,
      name: "Ahmed Salah",
      icon_url:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  ],
};

const ParentCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);

  return (
    <div className="parent-page">
      <div className="flex flex-row justify-end p-5">
        <button
          onClick={() =>
            navigate(`/players/${location.state.id}/notify-parent`)
          }
          className="bg-perfBlue text-white text-sm py-1 px-5 shadow-lg md:self-end rounded-sm flex flex-row"
        >
          Notify parent
        </button>
      </div>

      <div className="p-3 md:p-6 m-1 md:m-3 md:w-1/2  bg-white rounded-3xl flex flex-col md:flex-row items-center md:items-end gap-10">
        <div className="self-start flex flex-col w-full">
          <div className="playerName">
            <h2>Parent's info</h2>
          </div>
          <div className="img my-2 self-center md:self-start">
            <img
              src={
                playerData?.icon_url
                  ? playerData?.icon_url
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className="w-40 h-32 md:h-48 rounded-lg object-cover"
              alt="player_image"
            />
          </div>
        </div>
        <div className="flex flex-row md:w-76 gap-3 md:gap-10">
          <div className=" flex flex-col gap-1">
            <Info label="Name" value={parentDummyData.parentName} />
            <Info label="Age" value={parentDummyData.dob} />
            <Info label="Job" value={parentDummyData.job} />
            <Info label="Players" value={parentDummyData.players} />
          </div>
          <div className=" flex flex-col gap-1">
            <Info label="Subscription" value={`${playerData?.height} cm`} />
            <Info label="Players" />
            {parentDummyData.playersDetails.map((player) => {
              return (
                <SubPlayers
                  img={player.icon_url}
                  name={player.name}
                  key={player.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubPlayers = ({ img, name }: { img: string; name: string }) => {
  return (
    <div className="flex flex-row gap-1 w-32">
      <img className="w-6 h-6 rounded-full" src={img} alt={name} />
      <p className="text-xs">{name}</p>
    </div>
  );
};

export default ParentCard;
