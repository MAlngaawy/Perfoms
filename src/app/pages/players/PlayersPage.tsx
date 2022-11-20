import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "~/@main/components/Dropdown";
import PlayerCard from "./PlayerCard/PlayerCard";

const dummyData = [
  {
    id: 0,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 1,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 2,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 3,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 4,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 5,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 6,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 7,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 8,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 9,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
  {
    id: 10,
    name: "Mohamed abo Tricka",
    icon_url:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR3pVm0zEgzlEf93D08MDmKXmn660zXVXNX3Wj79F6wNfY_CpLQz9hoTliQZHXwdAo8",
  },
];

interface PlayersProps {
  id: number;
  name: string;
  icon_url: string;
}

const PlayersPage = () => {
  const [selected, setSelected] = useState("1st team");
  return (
    <>
      <div className="m-5">
        <p className="text-sm">Home</p>
        <div className="flex flex-row justify-between">
          <p className="text-lg font-medium">Players</p>
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            values={["1st team", "2nd team", "3rd team"]}
          />
        </div>
      </div>
      <div className="players-page bg-white p-5 rounded-3xl m-5">
        <p className="pb-2">Players</p>
        <div className="flex flex-col md:flex-row gap-5 flex-wrap">
          {dummyData.map((card) => {
            return <PlayerCard {...card} />;
          })}
        </div>
      </div>
    </>
  );
};

export default PlayersPage;
